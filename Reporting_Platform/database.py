#!/usr/bin/python3
# All Database connectors are here. Just call and run.
import pymongo
from datetime import datetime
import bcrypt
from exceptions import InvalidLoginError, UsernameTakenError


class Connection:
    """A connection to the database."""

    def __init__(self, app, host, port):
        self.app = app
        self.client = pymongo.MongoClient(host, port)
        self.db = self.client['reportingapp']
        self.db_viraly = self.client['chat-app']
        self.complaints = self.db['complaints']
        self.posts = self.db_viraly['posts']
        self.messages = self.db_viraly['messages']

    def create_complaint(self,complaint):
        self.complaints.insert_one(complaint)

    def get_viraly_post(self,viraly_post_id):
        post = self.posts.find_one({'id':int(viraly_post_id)})
        return post
    
    def get_viraly_chat(self,viraly_chat_id):
        chat = self.messages.find({'room':viraly_chat_id},{'author':1,'date':1,'content':1})
        return chat
