<h1 align="center">
  <img src="https://imgur.com/4v9ghOJ.png">
</h1>
<p align="center">
<a href=""><img title="Python3" src="https://img.shields.io/badge/Python-3-yellow?style=for-the-badge&logo=python"></a>
<a href=""><img title="License" src="https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge&logo="></a>
</p>



## Problem Statement
- Cyber bullying involves **posting, sharing wrong, private, negative, harmful information** about victim. In today's digital world we see many such instances where a particular person is targeted. We are looking for the software solution to curb such bullying/harassment in cyber space. Such solution is expected to 
  1. Work on **social media** such as twitter, facebook,etc.;. 
  2. Should provide **alarm to authority** 
  3. Facility to **report such incidents** to authority.


## Getting Started
The Software solution that we propose is **Cyber Offense Detecting and Reporting (CODAR) Framework**.

### What did we use?
<img height="32" width="32" src="https://cdn.thekrishna.in/img/icon/python.svg" />&nbsp;
<img height="32" width="32" src="https://cdn.thekrishna.in/img/icon/pytorch.svg" />&nbsp;
<img height="32" width="32" src="https://unpkg.com/simple-icons@v3/icons/flask.svg" />&nbsp;
<img height="32" width="32" src="https://cdn.thekrishna.in/img/icon/opencv.svg" />&nbsp; 
<img height="32" width="32" src="https://cdn.thekrishna.in/img/icon/docker.svg" />&nbsp; 
<img height="32" width="32" src="https://cdn.thekrishna.in/img/icon/grafana.svg" />&nbsp; 
<img height="32" width="32" src="https://cdn.thekrishna.in/img/icon/mongodb.svg" />&nbsp; 
<img height="32" width="32" src="https://cdn.thekrishna.in/img/icon/mysql.svg" />&nbsp; 
<img height="32" width="32" src="https://cdn.thekrishna.in/img/icon/javascript.svg" />&nbsp; 
<img height="32" width="32" src="https://cdn.thekrishna.in/img/icon/html5.svg" />&nbsp; 
<img height="32" width="32" src="https://cdn.thekrishna.in/img/icon/css3.svg" />&nbsp; 

### Prerequisites
- Python Compiler (3.7 Recommended)
  - ```bash
    sudo apt update
    sudo apt install -y software-properties-common
    sudo apt install -y python3 python3-pip
    ```
- Necessary Python3 Libraries for CODAR can be installed by running the following command:
  - ```bash
    sudo apt install -y python3-opencv
    pip install -r Social_Media_Platform/requirements.txt
    pip install -r Content_Moderation/requirements.txt
    pip install -r Reporting_Platform/requirements.txt
    ```
  - For installation of [PyTorch](https://pytorch.org/), refer their official website. 
 - A MongoDB Server, Grafana Sever, MySQL Server, and [access to Twitter API](https://developer.twitter.com/en/apps) 
  - If you have Docker, you can use the below commands to quickly start a clean MySQL, Grafana and MongoDB Server
    - ```bash
      docker run -d -t -p 27017:27017 --name mongodb mongo
      docker run --name grafana -d -p 3000:3000 grafana/grafana
      # Runs MySQL server with port 3306 exposed and root password '0000' 
      docker run --name mysql -e MYSQL_ROOT_PASSWORD="0000" -p 3306:3306 -d mysq
      ```
- A clone of this repository :P
- Add credentails for your MySQL, Twitter API and MongoDB into the Flask Apps. Also, Import our Dashboard JSON into your Grafana Server and configure your data sources accordingly. 


### Image Classification
:star::star::star: We have made our **[NSFW Image Classification Dataset](https://www.kaggle.com/krishnaalagiri/nsfw-image-classification)** public and we have used the same. Our classification model for Content Moderation in Social Media Platforms are trained over 330,000 images on a pretrained RESNET50 in five “loosely defined” categories:
1. **`pornography`** - Nudes and pornography images
2. **`hentai`** - Hentai images, but also includes pornographic drawings
3. **`sexually_provocative`** - Sexually explicit images, but not pornography. Think semi-nude photos, playboy, bikini, beach volleyball, etc. Considered acceptable by most public social media platforms.
4. **`neutral`** - Safe for work neutral images of everyday things and people
5. **`drawing`** - Safe for work drawings (including anime)


### Text Toxicity Prediction
Our text classification model is built to predict the toxicity of texts to pre-emptively prevent any occurrence of cyberbullying and harassment before they tend to occur. We're using **BERT to overcome the current challenges including understanding the context of text so as to detect sarcasm and cultural references, as it uses Stacked Transformer Encoders and Attention Mechanism to understand the relationship between words and sentences, the context from a given sentence**.  

```
Text_Input: I want to drug and rape her 
======================
Toxic: 0.987 
Severe_Toxic: 0.053 
Obscene: 0.100 
Threat 0.745 
Insult: 0.124 
Identity_Hate: 0.019 
======================
Result: Extremely Toxic as classified as Threat, Toxic 
Action: Text has been blocked. 

```

## Screenshots 

| Confusion Matrix (91% Overall Accuracy) | Finding the NSFW composition of a YouTube video |
|------|-----|
| ![f](https://imgur.com/zppAC3S.jpg) | ![f](https://imgur.com/Mm3m4H3.gif) |
| **Tested on more than 23,000 unseen images.** | **Downloads the video, Find the NSFW composition by classifing it's Keyframes** |

| Realtime Tweet Toxicity prediction | Testing the models by integerating with own Social Media Platform |
|------------------------------------|-------------------------------------------------------------------|
| ![f](https://imgur.com/iQWxioB.gif) | ![f](https://imgur.com/Sv9koRs.gif) |
| **We love Grafana** | **Automatically hides NSFW content while showing a disclaimer for the same** |

| Reporting Portal for the public to report content | Chrome Extension to automatically block offensive content |
|------------------------------------|-------------------------------------------------------------------|
| ![f](https://imgur.com/0mWzEp6.gif) | ![f](https://imgur.com/jEM67si.gif) |
| **The reporting portal is attached to a dashboard that automates the moderation process** ||


## Contributors

| Krishnakanth Alagiri | Mahalakshumi V | Vignesh S | Nivetha MK |
|----------------------|----------------|-----------|------------|
| [![f](https://avatars1.githubusercontent.com/u/39209037?s=86)](https://github.com/K-Kraken) | [![f](https://avatars2.githubusercontent.com/u/40058339?s=86)](https://github.com/mahavisvanathan) | [![f](https://avatars3.githubusercontent.com/u/42212364?s=86)](https://github.com/Vignesh0404) | [![f](https://avatars2.githubusercontent.com/u/43270349?s=86)](https://github.com/nivethaakm99) | 
| [@K-Kraken](https://github.com/K-Kraken) | [@mahavisvanathan](https://github.com/mahavisvanathan) | [@Vignesh0404](https://github.com/Vignesh0404) | [@nivethaakm99](https://github.com/nivethaakm99) |



## License
MIT © [Axenhammer](/LICENSE)


<br><br>
<p align="center">
  Made with ❤️ by <a href="https://github.com/axenhammer"> Axemhammer</a>
</p>

![wave](http://cdn.thekrishna.in/img/common/border.png)
