#!/usr/bin/python3
"""
All functions related to facebook go here
"""
#!/usr/bin/python3
from bs4 import BeautifulSoup
import time
import urllib.request
import requests
import urllib.parse
import imageio


def parse_urls(urlencode):
    url_prefix = 'https://www.facebook.com/plugins/post.php?href='
    url_suffix = '&show_text=1'
    full_url = url_prefix + urlencode + url_suffix
    response = requests.get(full_url)
    soup = BeautifulSoup(response.text, "html.parser")
    imgs_ret = []
    content_ret = []
    images = soup.findAll('img')
    content = soup.findAll('p')
    for img in images:
        height, width, channels = imageio.imread(img['src']).shape
        if(height > 50 and width > 50):
            imgs_ret.append(img['src'])
    for p in content:
        content_ret.append(p.contents[0])

    return imgs_ret, content_ret


def get_data_facebook(fb_link,link):
    """ Push Data for Facebook into the database
    """
    images, text = parse_urls(fb_link)
    if(len(images)!=0):
        post_type = "image"
    else:
        post_type = "text"

    post_data = {
        'link':link,
        'post_type': post_type,
        'post_text': text[0],
        'post_media': images[0]
    }
    return post_data
