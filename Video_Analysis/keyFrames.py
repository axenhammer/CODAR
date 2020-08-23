#!/usr/bin/python3
import sys

def videotoimages(imgname):
    import cv2
    import numpy as np
    prev_frame = None
    k = 0
    file_path = 'C:/Users/humai/OneDrive/Desktop/SIH 2020/imagesummary'
    video = cv2.VideoCapture(imgname)
    length = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
    # print(length)

    def mse(imageA, imageB):
        err = np.sum((imageA.astype("float") - imageB.astype("float")) ** 2)
        err /= float(imageA.shape[0] * imageA.shape[1])
        return err
    
    while True:
        check,frame = video.read()
        if check== False:
            break
        # frame = cv2.fastNlMeansDenoisingColored(frame,None,10,10,7,21)
        current_frame = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        current_frame = cv2.GaussianBlur(current_frame,(21,21),0) #to remove noise
        if prev_frame is None:
            prev_frame = current_frame
            continue
        prev_frame = cv2.dilate(prev_frame,None,iterations =0)
        current_frame = cv2.dilate(current_frame,None,iterations =0)
        error = mse(current_frame,prev_frame)
        if(error > 800 ): #and similarity < 0.5
            k = k+1
            file_name = file_path +'/'+ str(k) +'.jpg'
            cv2.imwrite(file_name,prev_frame) #Assuming the current frame will be checked with something else
        prev_frame = current_frame
    video.release()
    cv2.destroyAllWindows()

if __name__ == "__main__": 
    videotoimages(sys.argv[1]) 
