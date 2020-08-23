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
        self.db = self.client['reporting-app']
        self.filed_report = self.db['filed_report']
        self.admin_users = self.db['admin_users']
        self.reports = self.db['reports']

    # Filed Reports functions
    def get_filed_report(self, filed_report, max=50):
        """Retrieves the filed_report from a chatroom."""
        results = self.filed_report.find(
            {'id': id}, limit=max)  # Get the messages
        results = results.sort('date', pymongo.ASCENDING) # Sort by date in ascending order so later messages are at the bottom
        return results

    def add_filed_report(self, id):
        """Adds a filed_report to the database."""
        filed_report = {
            'id': id
        }
        self.filed_report.insert_one(filed_report)
        return True # Insertion was successful

    def filed_report_exists(self, id):
        """Checks if a room exists."""
        if self.filed_report.count_documents({'id': id}) > 0:
            return True
        return False

    # Admin Users functions
    def validate_login(self, username, password):
        """Checks if the login credentials are valid."""
        # Get user object from db
        username = username.lower()
        user = self.admin_users.find_one({'username': username})
        # Check if user exists
        if user is not None:
            # Check password
            hashed_pw = user['password']
            if bcrypt.hashpw(password.encode('utf-8'), hashed_pw) == hashed_pw:
                return True,""
            else:
                return False,"Password is incorrect"
        else:
            return False,"User does not exist"

    def create_user(self, name, username, password):
        username = username.lower()
        """Creates a user. Takes in the user's name and plaintext (unhashed) password."""
        # Check if the username is taken
        if self.admin_users.count_documents({'username': username}) == 0:
            # Create the user
            hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            user = {
                'fullname': name, 
                'username': username.lower(),
                'password': hashed_pw,
                'verified': 'false'
            }
            self.admin_users.insert_one(user)
        else:
            raise UsernameTakenError("The username is taken.")

    def insert_indexData(self, id, name,):
        obj = {
            "id": id,
            "name": name
        }
        self.reports.insert_one(obj)
        return True 
    
    def get_indexData(self,id,name):
        results = self.reports.find(
            {'id': id, 'name': name}, limit=max)  
        
        results = results.sort('', pymongo.ASCENDING)
        return results
