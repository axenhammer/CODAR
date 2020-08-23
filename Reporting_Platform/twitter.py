#!/usr/bin/python3
"""
All functions related to twiiter go here
"""


def get_data_twitter(tweet_link,twapi):
    """ Push Data for twitter into the database
    """
    tweet_id = tweet_link.split("/")[-1]
    full_tweet = twapi.get_status(
        tweet_id, include_entities=True, tweet_mode='extended')
    tweet = full_tweet._json
    tweet_type = "text"
    media_url = ''
    tweet_text = tweet.get("full_text")
    if(tweet.get('entities').get('media', "None") == "None"):
        pass
    else:
        tweet_type = "image"
        media_url = tweet.get('entities').get('media')[0].get('media_url')
        if(tweet.get('extended_entities').get('media')[0].get("type") == 'video'):
            tweet_type = "video"
            media_url = tweet.get('extended_entities').get('media')[0].get('video_info').get('variants')[0].get('url')
    post_data = {
        'link': tweet_link,
        'tweet_type': tweet_type,
        'post_text': tweet_text,
        'post_media': media_url
    }
    return post_data
