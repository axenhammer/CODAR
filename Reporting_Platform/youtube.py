#!/usr/bin/python3
from torchvision import transforms  # To perform all the transforms on our data
from torchvision import datasets  # Used to load the data from the folders
from torch.utils.data import DataLoader
from torchvision import models
import torch
import torch.nn as nn
import torch.optim as optim
import time
from PIL import Image
import cv2
import numpy as np
import os
import shutil
from tqdm import tqdm


class Youtube:
    def download(self, yt_url):
        try:
            os.mkdir(".temp")
        except FileExistsError:
            shutil.rmtree(".temp")
            os.mkdir(".temp")        
        os.chdir(".temp")
        command = " youtube-dl -f 134 --recode-video mp4 " + yt_url
        os.system(command)
        os.chdir("..")


    def videotoimages(self):
        prev_frame = None
        k = 0
        os.chdir(".temp")
        file_path = os.getcwd()
        self.filename = os.listdir()[0]
        imgname = self.filename
        try:
            os.mkdir("data")
        except:
            pass
        try:
            print("Folder Created")
            os.mkdir("data/"+imgname)
        except FileExistsError:
            print("Deleting contents as Folder Already Exist")
            shutil.rmtree("data/"+imgname)
            os.mkdir("data/"+imgname)
        video = cv2.VideoCapture(imgname)
        length = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
        print("Length of the Video:", length)

        def mse(imageA, imageB):
            err = np.sum((imageA.astype("float") - imageB.astype("float")) ** 2)
            err /= float(imageA.shape[0] * imageA.shape[1])
            return err

        for i in tqdm(range(length)):
            check, current_frame = video.read()
            if check == False:
                break
            if prev_frame is None:
                prev_frame = current_frame
                continue
            prev_frame = cv2.dilate(prev_frame, None, iterations=0)
            current_frame = cv2.dilate(current_frame, None, iterations=0)
            error = mse(current_frame, prev_frame)
            if(error > 2500):  # and similarity
                k = k+1
                file_name = file_path + '/data/' + \
                    str(imgname)+"/" + str(k) + '.jpg'
                # resized = cv2.resize(prev_frame, (224,224), interpolation = cv2.INTER_AREA)
                # Assuming the current frame will be checked with something else
                cv2.imwrite(file_name, prev_frame)
            prev_frame = current_frame
        video.release()
        cv2.destroyAllWindows()
        print("Total Key Frames Extracted:", k)
        os.chdir("..")
        return k

    # Predict fucnction that returns the appopirate class index
    def predict(self, model, test_image_name):
        image_transforms = {
            'test': transforms.Compose([
                transforms.Resize(size=256),
                transforms.CenterCrop(size=224),
                transforms.ToTensor(),
                transforms.Normalize([0.485, 0.456, 0.406],
                                     [0.229, 0.224, 0.225])
            ])
        }
        transform = image_transforms['test']
        test_image = Image.open(test_image_name)
        # plt.imshow(test_image)
        test_image_tensor = transform(test_image)
        test_image_tensor = test_image_tensor.view(1, 3, 224, 224)
        with torch.no_grad():
            model.eval()
            # Model outputs log probabilities
            out = model(test_image_tensor)
            ps = torch.exp(out)
            topk, topclass = ps.topk(1, dim=1)
            index = topclass.cpu().numpy()[0][0]
            # print("Output class :  ", classes[index])
            return index
        
        
    # Predict All keyframes
    def predict_all(self, model, max_file):
        # Predict every keyframe extracted
        os.chdir(".temp")
        temp = []
        print("Predicting using Keyframes")
        for i in tqdm(range(1, max_file)):
            temp.append(self.predict(model, "data/"+self.filename+"/"+str(i)+".jpg"))
        os.chdir("..")
        shutil.rmtree(".temp")
        return temp


    def auto_yt(self, yt_link, image_model, pretty=False):
        image_classes = ['Drawing', 'Hentai', 'Neutral',
                         'Pornography', 'Sexually Provocative']
        self.download(yt_link)
        k=self.videotoimages()
        temp = self.predict_all(image_model,k)
        if pretty==True:
            from collections import Counter
            import math
            temp1 = []  
            total_occurance = Counter(temp).items()
            print ("\n{:<21} {:<1} {:<15} {:<1} {:<15}".format("Class Name","|", "Occurance","|", "Percentage"))
            print("---------------------------------------------------------")
            for key in total_occurance:
                b=(key[1]/k)*100
                print ("{:<21} {:<1} {:<15} {:<1} {:<15}".format(image_classes[key[0]],"|",key[1],"|", str(round(b,2))+" %"))
                temp1.append(
                    [
                        image_classes[key[0]],
                        key[1],
                        (str(round(b, 2))+" %")
                    ]
                )
            return temp1
        return temp
