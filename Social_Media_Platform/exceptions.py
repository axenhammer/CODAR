#!/usr/bin/python3
class UserError(Exception):
    pass

class UsernameTakenError(UserError):
    pass

class InvalidLoginError(UserError):
    pass
