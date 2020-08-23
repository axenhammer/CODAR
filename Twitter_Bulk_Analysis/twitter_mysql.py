#!/usr/bin/python3
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import json
import pymysql.cursors
import geocoder
import prediction_models
import torch
from BERT import BERT
import text_predict
from datetime import datetime

ckey=""
csecret=""
atoken=""
asecret=""

connection = pymysql.connect(host='192.168.12.207',
                             port=3306,
                             user='root',
                             password='0000',
                             db='tweet_monitoring',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

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


class listener(StreamListener):

    def on_data(self, data):
        all_data = json.loads(data)
        if not all_data['retweeted'] and 'RT @' not in all_data['text']:
            if(all_data.get('lang')=='en' and len(all_data['entities']['hashtags'])>0):
                #print(json.dumps(all_data,indent=2,sort_keys=True))
                tweet_type = "text"
                tweet_timestamp = all_data.get("timestamp_ms")
                tweet_created = all_data.get("created_at")
                username = all_data.get('user').get('name')
                profile_picture = all_data.get('user').get('profile_image_url')
                media_url = ''
                tweet_text = all_data.get("text")
                if(all_data.get('extended_tweet',"None")!="None"):
                    tweet_text = all_data.get("extended_tweet").get("full_text")
                    if(all_data.get("extended_tweet").get('entities').get('media', "None") == "None"):
                        pass
                    else:
                        tweet_type = "image"
                        media_url = all_data.get("extended_tweet").get('entities').get('media')[0].get('media_url')
                        if(all_data.get("extended_tweet").get('entities').get('media')[0].get("type") == 'video'):
                            tweet_type = "video"
                            media_url = all_data.get("extended_tweet").get('entities').get('media')[0].get('video_info').get('variants')[0].get('url')
                hashtags = []
                raw_hashtags = all_data['entities']['hashtags']
                location = all_data.get('user').get('location')
                id_tweet = all_data.get('id')
                latitude = ""
                longitude = ""
                if(location!=None):

                    result = geocoder.arcgis(location)
                    if(result.x!=None and result.y!=None):
                        latitude = str(result.y)
                        longitude = str(result.x)
                else:
                    location = ''

                #Predicting toxicity for a post with image and text
                post_content_prediction = text_predict.predict_string(tweet_text)
                post_content_prediction = max(post_content_prediction)
                image_prediction = ''
                if(tweet_type=="image"):
                    image_prediction = prediction_models.predict_image(image_model,media_url)
                text_toxicity = post_content_prediction
                image_class = image_prediction
                try:
                    with connection.cursor() as cursor:
                        sql = "INSERT INTO `tweets` VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
                        dt_object = datetime.fromtimestamp(int(tweet_timestamp)/1000)
                        cursor.execute(sql,(id_tweet,dt_object,tweet_created,username,profile_picture,tweet_type,tweet_text,media_url,location,latitude,longitude,text_toxicity,image_class))
                        # if(location!=None and latitude!=None and longitude!=None):
                        #     sql = "INSERT INTO `tweets_location` VALUES (%
                        # s,%s,%s,%s)"
                        #     cursor.execute(sql, (id_tweet,location,latitude,longitude))
                        for i in raw_hashtags:
                            hashtags.append(i['text'])
                            sql = "INSERT INTO `hashtags` VALUES (%s)"
                            cursor.execute(sql, (i['text']))
                            # if(location!=None and latitude!=None and longitude!=None):
                            #     sql = "INSERT INTO `hashtags_location` VALUES (%s,%s,%s,%s)"
                            #     cursor.execute(sql,(i['text'],location,latitude,longitude))
                        connection.commit()
                finally:
                    pass
                print("Post ID:",id_tweet,"inserted!")
        return True

    def on_error(self, status):
        print (status)


auth = OAuthHandler(ckey, csecret)
auth.set_access_token(atoken, asecret)

twitterStream = Stream(auth, listener(),tweet_mode='extended')
twitterStream.filter(track=["covid-19"])
