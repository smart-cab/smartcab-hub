# Clients not specified in this list will be forbidden to proceed with requests
from flask import abort, request


CLIENT_WHITELIST = {"127.0.0.1"}


def apply(func):
    def injected(*args, **kwargs):
        if request.remote_addr not in CLIENT_WHITELIST:
            abort(403)
        return func(*args, **kwargs)

    return injected
