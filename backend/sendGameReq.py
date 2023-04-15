import os
from twilio.rest import Client

def sendGameReq(number, url):
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)

    message = client.messages.create(
                                body=url,
                                from_='+18336856713',
                                to=number
                            )