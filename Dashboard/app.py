#!/usr/bin/python3
from flask import Flask, render_template, url_for, request, session, redirect, jsonify
import json
from bson import ObjectId
from database import Connection
from flask_pymongo import PyMongo   
from flask_cors import CORS
app = Flask(__name__,) 
app.config["MONGO_URI"] = "mongodb://192.168.12.209:27017/reportingapp"
mongo = PyMongo(app)
CORS(app)
db = mongo.db

@app.route('/whatsapp-table',methods=["GET","POST"])
def getWhatsapp():
    wapObj = []
    for i in db.complaints.find({"type":"Whatsapp"}):
        wapObj.append({
            "timestamp": i["timestamp"],
            "victimName": i["victimName"],
            "harasserName": i['harasserName'],
            "victimDob": i['victimDob'],
            "link": i['link'],
            "type": i['type'],
            "reason": i["reason"],
            "status": i["status"],
            "hscore": i["hscore"]
        })
    #return jsonify(wapObj)
    return render_template("whatsapp-table.html", data = wapObj)
    #return render_template("whatsapp-table.html")


@app.route('/fb-table', methods=["GET", "POST"])
def getFb():
    fbobj = []
    for i in db.complaints.find({"type":"facebook"}):
        fbobj.append({
            "id": i["id"],
            "timestamp": i["timestamp"],
            "victimName": i["victimName"],
            "harasserName": i['harasserName'],
            "victimDob": i['victimDob'],
            "link": i['link'],
            "type": i['type'],
            "reason": i["reason"],
            "status": i["status"],
            "hscore": i["hscore"]
        })
    #return jsonify(fbobj)   
    return render_template("fb-table.html", data = fbobj) 


@app.route('/login', methods=["GET", "POST"])
def login():
    return render_template("login.html")


@app.route('/viralry-table', methods=["GET", "POST"])
def getViraly():
    viralyObj = []
    for i in db.complaints.find({"type":"Viraly"}):
        viralyObj.append({
            "id": i["id"],
            "victimName": i["victimName"],
            "harasserName": i['harasserName'],
            "victimDob": i['victimDob'],
            "link": i['link'],
            "type": i['type'],
            "reason": i["reason"],
            "status": i["status"],
            "hscore": i["hscore"]
        })
    #return jsonify(viralyObj)
    return render_template("viralry-table.html",data = viralyObj)


@app.route('/sms-table', methods=["GET", "POST"])
def getSms():
    smsObj = []
    for i in db.complaints.find({"type":"Sms"}):
        smsObj.append({
            "id": i["id"],
            "victimName": i["victimName"],
            "harasserName": i['harasserName'],
            "victimDob": i['victimDob'],
            "link": i['link'],
            "type": i['type'],
            "reason": i["reason"],
            "status": i["status"],
            "hscore": i["hscore"]
        })
    return render_template("sms-table.html",data = smsObj)


@app.route('/index', methods=["GET", "POST"])
def Index():
    c = {
        "uname": "Ford",
    }
    complaint_type = "Harrasment"
    return render_template("index.html", c=c, complaint_type=complaint_type)


@app.route('/twitter-table', methods=["GET", "POST"])
def getTwitter():
    twitterobj = []
    for i in db.complaints.find({"type":"twitter"}):
        twitterobj.append({
            "timestamp": i["timestamp"],
            "victimName": i["victimName"],
            "harasserName": i['harasserName'],
            "victimDob": i['victimDob'],
            "link": i['link'],
            "type": i['type'],
            "reason": i["reason"],
            "status": i["status"],
            "hscore": i["hscore"]
        })
    #return jsonify(twitterobj)
    return render_template("twitter-table.html", data = twitterobj)


@app.route('/',methods=["GET","POST"])
def getIndex():
    c = {
        "uname": "Ford",
    }
    complaint_type = "Harrasment"
    return render_template("index.html", c=c, complaint_type=complaint_type)

@app.route('/facebookReport', methods=["GET","POST"])
def preview():
    fbReport = []
    for i in db.complaints.find({"id": str(request.args.get('id'))}):
        fbReport.append({
            "victimFullName": i["victimFullName"],
            "victimName" : i["victimName"],
            "link" : i["link"],
            "harasserName" : i["harasserName"],
            "type": i["type"],
            "victimDob": i["victimDob"],
            "text": i["post_content"]["post_text"],
            "timestamp": i["timestamp"],
            "victimAddress": i["victimAddress"],
            "victimState": i["victimState"],
            "victimCity": i["victimCity"],
            "victimPincode": i["victimPincode"],
            "reason": i["reason"],
            "status": i["status"],
            "hscore":i["hscore"],
            "post_type": i["post_content"]["post_type"], 
            "text_toxicity": i["post_content"]["text_toxicity"],
            "image_prediction": i["post_content"]["image_prediction"],
            "image_link": i["post_content"]["link"],
            "victimEmail": i["victimEmail"]
            
        })
    #return jsonify(fbReport)
    return render_template("facebookReport.html", data = fbReport)



if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(host='0.0.0.0',debug=True,port=3007)
