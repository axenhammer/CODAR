#!/usr/bin/python3
import whatsapp
import twitter
import facebook as fb
import viraly
import sms
from database import Connection
from werkzeug.utils import secure_filename
from flask import Flask, render_template, redirect, url_for, request, session, make_response, flash
import hashlib
import json
import tweepy
import re
import csv
import os

app = Flask(__name__)
app.secret_key = 'somerandomvalue'
app.config['UPLOAD_FOLDER'] = 'user-content/'
auth = tweepy.OAuthHandler(consumer_token, consumer_secret)
auth.set_access_token(key, secret)

twapi = tweepy.API(auth, wait_on_rate_limit=True)
db = Connection(app, 'remote.thekrishna.in', 27017)

# Push to Database Functions


def db_push_commons(username, email, full_name, date_of_birth, address,
                    state, city, pincode, crime_type, platform, post_content):
    """ Push Common Data for all platforms database
    """
    complaint = {
        'username': username,
        'email': email,
        'full_name': full_name,
        'date_of_birth': date_of_birth,
        'address': address,
        'state': state,
        'city': city,
        'pincode': pincode,
        'crime_type': crime_type,
        'platform': platform,
        'post_content': post_content
    }
    print(complaint)
    db.create_complaint(complaint)


# 404: Page not found handler
@app.errorhandler(404)
def not_found(e):
    return render_template("errorpages/404.html")


@app.route('/push', methods=['POST'])
def form_entry():
    if request.method == 'POST':
        platform = request.form['platform']

        # Form data retrieval from POST
        username = request.form['username']
        email = request.form['email']
        full_name = request.form['full_name']
        date_of_birth = request.form['dob']
        address = request.form['address']
        state = request.form['state']
        city = request.form['city']
        pincode = request.form['pincode']
        crime_type = request.form['crime_type']    # Common in specific cards

        if(platform == "twitter"):
            post_content = twitter.get_data_twitter(
                request.form['tweet_link'], twapi)
        elif(platform == "facebook"):
            post_content = fb.get_data_facebook(request.form['fb_link'])
        elif(platform == "viraly"):
            post_content = viraly.get_data_viraly(
                db, request.form['viraly_content-type'], request.form['viraly_post_id'])
        elif(platform == "whatsapp"):
            post_content = whatsapp.get_data_whatsapp(
                username, request.files['whatsapp_backup'], app.config['UPLOAD_FOLDER'])
        elif(platform == "sms"):
            post_content = sms.get_data_sms(request.form['sender_number'])
        else:
            return redirect(url_for('index_main'))
        db_push_commons(username, email, full_name, date_of_birth,
                        address, state, city, pincode, crime_type, platform, post_content)
        return redirect(url_for('index_main'))
    else:
        return redirect(url_for('index_main'))


@app.route('/', methods=['GET'])
def index_main():
    if request.method == 'GET':
        platform = request.args.get('platform')
        print(platform)
        # Render the right template
        if platform == None or platform == "twitter":
            return render_template("twitter.html", platform="twitter")
        #elif platform=="sms":                       return render_template("phone-message.html", platform=platform)
        elif platform == "viraly":
            return render_template("viraly.html", platform=platform)
        elif platform == "facebook":
            return render_template("facebook.html", platform=platform)
        elif platform == "whatsapp":
            return render_template("whatsapp.html", platform=platform)
        # elif platform=="youtube":                   return render_template("youtube.html", platform=platform)
        else:
            return render_template("under-construction.html", platform=platform)
    else:
        return render_template("twitter.html", platform=platform)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3003, use_reloader=True, debug=True)
