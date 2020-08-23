#!/usr/bin/python3
"""
All functions related to WhatsApp go here
"""

# Convert WhatsApp Exports to CSV
def convert_whatsapp_chat_csv(file_name):
    import csv,re,os
    whatsapp_texts = open(file_name, 'r')
    csv_file = "timestamp,user,message\n"
    for text in whatsapp_texts:
        time_stamp = re.search(r"^[0-9/, :apm]+", text)
        user = re.search(r" - [a-zA-Z ]+", text)
        text_message = re.search(
            r": [a-zA-Z0-9+-=!~`<>,./?:;\"'{} \"\[\]]+", text)
        if(time_stamp != None and user != None and text_message != None):
            print(time_stamp.group(), user.group()[
                  3:], text_message.group()[2:], text_message.group()[-1])
            csv_file = csv_file+time_stamp.group().replace(",", "")+","+"\"" + \
                user.group()[3:]+"\""+","+"\""+text_message.group()[2:]+"\""
            csv_file += "\n"
        if(time_stamp == None and user == None):
            detected_text = re.search(
                r"[a-zA-Z0-9+-=!~`<>,./?:;\"'{} \"\[\]/]+", text)
            csv_file = csv_file[:-2]
            if(detected_text != None):
                csv_file += detected_text.group()+"\""
                csv_file += "\n"

    print(csv_file)
    file = open(file_name.split(".")[0]+".csv", 'w')
    file.write(csv_file)
    file.close()
    return file_name.split(".")[0]+".csv"

# Push Data for whatsapp into the database
def get_data_whatsapp(username, whatsapp_backup, path):
    """ Push Data for whatsapp into the database
    """
    import os
    file_name = whatsapp_backup.filename
    directory = "static/"+path+username.lower()
    if not os.path.exists(directory):
        os.mkdir(directory)
    file_path = directory+"/"+file_name
    whatsapp_backup.save(file_path)
    csv_file_path = convert_whatsapp_chat_csv(file_path)
    os.remove(file_path)
    chat_data = {
        'uploaded_chat': csv_file_path
    }
    return chat_data
