#!/usr/bin/python3
from database import Connection  # db = Connection("", 'localhost', 27017)
import hashlib
from flask import Flask, render_template, redirect, url_for, request, session, make_response, flash
from werkzeug.utils import secure_filename
from opengraph import OpenGraph
import json
import prediction_models
import torch
from BERT import BERT
# import user as User

# toUser = "Rose" # Runtime variables for development, remove before production
# fromUser = "KK" # Runtime variables for development, remove before production
app = Flask(__name__)
app.secret_key='somerandomvalue'
app.config['UPLOAD_FOLDER'] = 'user-content/'

db = Connection(app, '192.168.12.209', 27017) 

#Importing all models
image_model = torch.load("models/model_nsfw.pt",map_location=torch.device('cpu'))

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')  
text_model = BERT().to(device)

def load_checkpoint(load_path, model):
    
    if load_path==None:
        return
    
    state_dict = torch.load(load_path, map_location=device)
    print(f'Model loaded from <== {load_path}')
    
    model.load_state_dict(state_dict['model_state_dict'])
    return state_dict['valid_loss']

load_checkpoint('models/model_initial_text.pt', text_model)

# Generate color for a username
def string_to_color(string):
    colors = ['#FF007F', '#9BC63B', '#0D8ABC',
              '#BF360C', '#330E62', '#124116', 
              '#00695c', '#121858', '#5d4030']
    return colors[(abs(hash(string.lower())) % 9)].replace("#", "")


# Generate colors for usernames using string_to_color()
def get_sideusers_hex(sideUsers):
    sideUsers_Hex = []
    for users in sideUsers:
        sideUsers_Hex.append(string_to_color(users[0]))
    return sideUsers_Hex


# Create new Help Bot
def help_bot():
    try:
        db.create_user("Viraly Support", "Support", "helpmeplis")
        print("Support: User Created")
    except: pass


# Return Chatroom ID using both usernames
def return_chat_ID(toUser, fromUser):
    string=''
    toUser = toUser.lower()
    fromUser = fromUser.lower()
    if(toUser>fromUser):
        string = toUser + fromUser
    else:
        string = fromUser + toUser
    return (hashlib.sha1((string).encode())).hexdigest()


# Get all users as a list
def get_all_users():
    users = db.users.find({})
    sideUsers = []
    for user in users:
        if(user['username'].lower()!=session['username'].lower()):
            sideUsers.append([user['username'].lower(), user['fullname']])
    return sideUsers


# Route for the chat page
@app.route('/messages', methods=['GET', 'POST'])
def message():
    if(session.get('exists') == True):
        fromUser = session.get('username').lower()
        sideUsers = get_all_users()
        sideUsers_Hex = get_sideusers_hex(sideUsers)

        # FallBack Mode #1
        if request.method == 'GET':
            toUser1 = (str(request.args.get('toUser')))
            chatID  = (str(request.args.get('chatID')))
            if (toUser1 != "None") and (chatID == "None"):
                toUser = toUser1
                chatID = return_chat_ID(toUser, fromUser)
                return redirect(url_for('message', chatID=chatID, toUser=toUser))
        chatID = str(request.args.get('chatID'))
        toUser = (str(request.args.get('toUser'))).lower()
        # FallBack Mode #2
        if(request.args.get('chatID') == None) or (db.room_exists(chatID) == False):
            db.create_room(chatID)
            return redirect(url_for('message', chatID=chatID, toUser=toUser))

        # Sending Message
        if request.method == 'POST':
            content = request.values.get('message_to_send')
            db.add_message(chatID, fromUser, content)

        return render_template('messages-chat.html', toUser_color=string_to_color(toUser), fullname=db.get_fullname(toUser), toUser=toUser, fromUser=fromUser, sideUsers_Hex=sideUsers_Hex, sideUsers=sideUsers, lenSideUsers=len(sideUsers), chatID=str(chatID))
    else:
        return redirect(url_for('login'))
    

# Route for the chat-iframe page
@app.route('/chat', methods=['GET', 'POST'])
def message_chat():
    # GET Parameter chatID to determine the chatroom ID
    fromUser = session.get('username').lower()
    toUser = (str(request.args.get('toUser')))
    chatID = return_chat_ID(toUser, fromUser)

    # FallBack Mode
    if(db.room_exists(chatID) == False) or (request.args.get('chatID') == None):
        db.create_room(chatID)
        return redirect(url_for('message_chat', chatID=chatID, toUser=toUser))
        
    messages = db.get_messages(chatID)
    return render_template('blocks/messages.html', messages=messages, toUser_color=string_to_color(toUser), fromUser_color=string_to_color(fromUser), toUser=toUser, fromUser=fromUser, chatID=str(chatID))


# Route for the login page
@app.route('/', methods=['GET', 'POST'])
def login():
    error = None 
    session.pop('exists',None)
    if request.method == 'POST':
        verified, error = db.validate_login(
            request.form['username'].lower(), request.form['password'])
        print(verified)
        if(verified==True):
            session['exists'] = True
            session['username'] = request.form['username'].lower()
            # fromUser = session['username'].lower()
            return redirect(url_for('feed_home'))
    return render_template("login.html", error=error)


# Function to get the post data and make a new post
@app.route('/makePost', methods=['GET', 'POST'])
def make_post():
    if(session.get('exists') == True):
        if request.method == 'POST':
            media = request.files['media_post']
            file_name = media.filename
            content_post = request.form['content_post']
            location_post = request.form['location_post']
            link_post = request.form['link_post']
            post_type = None
            image_prediction = None
            
            if(file_name!=''):
                post_type = "media"
                if(file_name.split(".")[1]=="mp4"):
                    post_type = "video"
            # If the post contains image as well as a link, it is a media post with a link in the body
            if(file_name!='' and link_post!=''):
                post_type="media"
                content_post += '<br><a href=#>'+link_post+'</a>'
                if(file_name.split(".")[1]=="mp4"):
                    post_type = "video"
            # A pure link body
            if(file_name=='' and link_post!=''):
                post_type='link'
            if(file_name=="" and link_post==""):
                post_type="text"

            # Save the media if file type is media
            file_path=''
            if(post_type=="media" or post_type=="video"):
                directory = "static/"+app.config['UPLOAD_FOLDER']+session.get('username').lower()
                if not os.path.exists(directory):
                    os.mkdir(directory)
                file_path = directory+"/"+file_name
                media.save(file_path)
                image_prediction = prediction_models.predict_image(image_model,file_path)

            description = ''
            title = ''
            image = ''
            if(post_type=="link"):
                og=OpenGraph(url=link_post)
                description = og.description
                title = og.title
                image = og.image

            post_content_prediction = prediction_models.predict_text(text_model,content_post,device)

            content = {
                'posttype': post_type,
                'medialink': file_path,
                'postcontent': content_post,
                'postlocation': location_post,
                'postlink': link_post,
                'image_prediction':image_prediction,
                'text_prediction':post_content_prediction,
                'link_details':
                {
                    'description':description,
                    'image':image,
                    'title':title,
                }
            }
            inserted = db.create_post(session.get('username').lower(),content)
            print("Post ID:"+str(inserted)+" inserted")
            return redirect(url_for('feed_home'))
    else:
        return redirect(url_for('login'))


# Function to get the post data and make a new post
@app.route('/makeComment', methods=['GET', 'POST'])
def make_comment():
    if(session.get('exists') == True):
        if request.method == 'POST':
            content_comment = request.form['content_comment']
            post_id = int(request.form['post_id'])
            username = session.get('username').lower()
            db.create_comment(username, post_id, content_comment)
            return redirect(url_for('feed_home'))
    else:
        return redirect(url_for('login'))


# Function to get the post data and make a new post
@app.route('/likePost', methods=['GET', 'POST'])
def like_post():
    if(session.get('exists') == True):
        if request.method == 'GET':
            post_id = int(request.args.get('post_id'))
            print(post_id,"Added")
            db.like_post(post_id)
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    else:
        return redirect(url_for('login'))


# Route for the main home page
@app.route('/home', methods=['GET', 'POST'])
def feed_home():
    # print(session.get('username') )
    if(session.get('exists') == True):
        fromUser = session.get('username').lower()
        sideUsers = get_all_users()
        sideUsers_Hex = get_sideusers_hex(sideUsers)
        return render_template(
            'feed.html', sideUsers=sideUsers, sideUsers_Hex=sideUsers_Hex, 
            lenSideUsers=len(sideUsers), fromUser_color=string_to_color(fromUser), fromUser=fromUser, 
            fullname=db.get_fullname(fromUser), posts=db.get_posts(), comments=db.get_comments(), comment_len=db.comments.count_documents({}),
        )
    else:
        return redirect(url_for('login'))


# Driver Code
if __name__ == '__main__':
    import os
    help_bot()
    try:
        os.mkdir("static/user-content")
        print("Folder created.")
    except FileExistsError:
        print("Folder already exist.")
    app.run(host='0.0.0.0', port=3000, use_reloader=True, debug=True)  # use_reloader=True, debug=True
    os.system("clear")
