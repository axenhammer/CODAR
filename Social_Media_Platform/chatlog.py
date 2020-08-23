#!/usr/bin/python3
# Logs chats messages
from datetime import datetime

class Logger:
    """Logs messages."""

    def __init__(self, log_path):
        self.log = open(log_path, "a+")

    def message(self, room, author, message):
        entry = "[{}] {} - {}: {}".format(str(datetime.now()), room, author, message)
        print(entry)
        self.log.write(entry + "\n")

    def __del__(self):
        self.log.close()
