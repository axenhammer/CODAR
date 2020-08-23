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
        self.db = self.client['chat-app']
        self.messages = self.db['messages']
        self.rooms = self.db['rooms']
        self.users = self.db['users']
        self.posts = self.db['posts']
        self.comments = self.db['comments']

    # Message functions
    def get_messages(self, room, max=50):
        """Retrieves the messages from a chatroom."""
        results = self.messages.find(
            {'room': room}, limit=max)  # Get the messages
        # Sort by date in ascending order so later messages are at the bottom
        results = results.sort('date', pymongo.ASCENDING)
        return results

    def add_message(self, room, author, content):
        """Adds a message to the database."""
        if self.room_exists(room):
            message = {
                'room': room,
                'author': author,
                'date': datetime.now(),
                'content': content
            }
            self.messages.insert_one(message)
            return True  # Insertion was successful
        else:
            self.app.logger.warning(
                'A message was attempted to be sent to the invalid room: %s', room)
            return False  # Insertion was unsuccessful

    # Room functions
    def room_exists(self, name):
        """Checks if a room exists."""
        if self.rooms.count_documents({'name': name}) > 0:
            return True
        return False

    def get_rooms(self, max=50):
        """Gets all the existing rooms."""
        results = self.rooms.find(limit=max)
        return results

    def create_room(self, name):
        """Creates a room."""
        if not self.room_exists(name):
            self.rooms.insert_one({'name': name})

    # User functions
    def validate_login(self, username, password):
        """Checks if the login credentials are valid."""
        # Get user object from db
        username = username.lower()
        user = self.users.find_one({'username': username})
        # Check if user exists
        if user is not None:
            # Check password
            hashed_pw = user['password']
            if bcrypt.hashpw(password.encode('utf-8'), hashed_pw) == hashed_pw:
                return True, ""
            else:
                return False, "Password is incorrect"
        else:
            return False, "User does not exist"

    def create_user(self, name, username, password):
        username = username.lower()
        """Creates a user. Takes in the user's name and plaintext (unhashed) password."""
        # Check if the username is taken
        if self.users.count_documents({'username': username}) == 0:
            # Create the user
            hashed_pw = bcrypt.hashpw(
                password.encode('utf-8'), bcrypt.gensalt())
            user = {
                'fullname': name,
                'username': username.lower(),
                'password': hashed_pw,
                'verified': 'false'
            }
            self.users.insert_one(user)
        else:
            raise UsernameTakenError("The username is taken.")

    def get_fullname(self, username):
        username = username.lower()
        """Returns fullaname for a user. Takes in the username."""
        users = self.users.find({'username': username})
        for user in users:
            return user['fullname']

    # Post Functions
    def posts_exists(self, id):
        if self.posts.count_documents({'id': id}) > 0:
            return True
        return False

    def create_post(self, username, content):
        username = username.lower()
        from random import randint
        # 5 digit post ID, increase if you want more
        id = randint(10000, 99999)
        if not self.posts_exists(id):
            post = {
                'id': id,
                'username': username.lower(),
                'fullname': self.get_fullname(username),
                'date': datetime.now(),
                'likes': 0,
                'content': content
            }
            self.posts.insert_one(post)
            return id

    def get_posts(self, max=20):
        """Gets all the existing posts."""
        results = self.posts.find(limit=max)
        results = results.sort('date', pymongo.DESCENDING)
        return results

    # Comments Functions

    def comments_exists(self, id):
        if self.comments.count_documents({'id': id}) > 0:
            return True
        return False

    def like_post(self, post_id):
        main_post_id = self.posts.find({'id': post_id})[0]["_id"]
        self.posts.update_one(
            {'_id': main_post_id},
            {'$inc': {'likes': 1}}
        )

    def create_comment(self, username, post_id, content):
        username = username.lower()
        from random import randint
        # 5 digit comment ID, increase if you want more
        id = randint(10000, 99999)
        if not self.comments_exists(id):
            post = {
                'id': id,
                'post_id': post_id,
                'username': username.lower(),
                'fullname': self.get_fullname(username),
                'date': datetime.now(),
                'content': content
            }
            self.comments.insert_one(post)
            main_post_id = self.posts.find({'id': post_id})[0]["_id"]
            # existing = self.posts.find({'id': post_id})[0]["comments"]
            self.posts.update_one(
                {'_id': main_post_id},
                {'$inc': {'comments': 1}}
            )
            return id

    def get_comments(self, max=20):
        """Gets all the existing posts."""
        results = self.comments.find(limit=max)
        results = results.sort('date', pymongo.DESCENDING)
        return results
