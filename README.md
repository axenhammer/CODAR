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
  2. Facility to **flag and report such incidents** to authority.


## Getting Started
The Software solution that we propose is **Cyber Offense Detecting and Reporting (CODAR) Framework**, A system that semi-automates the Internet Moderation Process.

### What did we use?
<a href="https://github.com/axenhammer/CODAR/network/dependencies"><img height="42" src="https://i.imgur.com/4bUNd79.png" /></a>
----
### Key Features :star:
- [X] Finds the **NSFW composition** of a given **YouTube video**
- [X] Perform **Text Toxicity Prediction** on public **Facebook Posts/Comments** using BeautifulSoup and Facebook API.
- [X] Structures and Perform **Text Toxicity Prediction** on **WhatsApp Chat Export Documents**.
- [X] **Visualise Realtime Toxicity Scored on Tweets** using Grafana.
- [X] **Chrome Extension** to automatically **block offensive content**
- [X] **Reporting Portal** for the public to report content.
- [X] A **custom Social Media Platform** to test the capablities of this system.

-----
### Obscene Image Classification 📷
:star::star::star: We have made our **[NSFW Image Classification Dataset](https://www.kaggle.com/krishnaalagiri/nsfw-image-classification)** public and we have used the same. Our classification model for Content Moderation in Social Media Platforms are trained over 330,000 images on a pretrained RESNET50 in five “loosely defined” categories:
1. **`pornography`** - Nudes and pornography images
2. **`hentai`** - Hentai images, but also includes pornographic drawings
3. **`sexually_provocative`** - Sexually explicit images, but not pornography. Think semi-nude photos, playboy, bikini, beach volleyball, etc. Considered acceptable by most public social media platforms.
4. **`neutral`** - Safe for work neutral images of everyday things and people.
5. **`drawing`** - Safe for work drawings (including anime, safe-manga)

-----
### Text Toxicity Prediction 💬
Our text classification BERT model is trained on the **[Jigsaw Toxic Comment Classification Dataset](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge/data)** to predict the toxicity of texts to pre-emptively prevent any occurrence of cyberbullying and harassment before they tend to occur. We're chose **BERT as to overcome challenges including understanding the context of text so as to detect sarcasm and cultural references, as it uses Stacked Transformer Encoders and Attention Mechanism to understand the relationship between words and sentences, the context from a given sentence**.  

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
-----
## Screenshots (Click images for Full Resolution 🎯)

| Confusion Matrix (91% Overall Accuracy) | Finding the NSFW composition of a YouTube video (📷) |
|------|-----|
| ![f](https://imgur.com/zppAC3S.jpg) | [![f](https://imgur.com/Mm3m4H3.gif)](https://i.imgur.com/8r8Zw0w.gif) |
| **Tested on more than 23,000 unseen images.** | **Downloads the video, Find the NSFW composition using it's Keyframes** |

| Realtime Tweet Toxicity prediction (💬) | Testing the models by integerating with own Social Media Platform (📷+💬) |
|------------------------------------|-------------------------------------------------------------------|
| [![f](https://imgur.com/iQWxioB.gif)](https://i.imgur.com/gINYc5i.jpg) | [![f](https://imgur.com/Sv9koRs.gif)](https://i.imgur.com/ivy2HRs.gif) |
| **We love Grafana** | **Automatically hides NSFW content also shows a disclaimer** |

| Reporting Portal for the public to report content (📷+💬) | Chrome Extension to automatically block offensive content (📷+💬) |
|------------------------------------|-------------------------------------------------------------------|
| [![f](https://imgur.com/0mWzEp6.gif)](https://i.imgur.com/bscylSA.gif) | [![f](https://imgur.com/jEM67si.gif)](https://i.imgur.com/IeBvtGs.gif) |
| **The reporting portal with a dashboard to semi-automate the moderation process** ||

-----
### Prerequisites

<ul><li><details>
<summary>Expand for running CODAR on <b>Raspberry Pi</b> or other <b>SBCs</b></summary>
<ul><li>We&#39;d recommend <strong>Raspberry Pi 4 (4GB)</strong> running <a href="https://www.raspberrypi.org/downloads/raspberry-pi-os/">Raspberry Pi OS Lite</a> and <strong>increase the swap size</strong></li>
<li>Follow this to install <strong><a href="https://gist.github.com/akaanirban/621e63237e63bb169126b537d7a1d979">PyTorch on RPi 4</a></strong></li>
</ul></li></ul></details></li></ul>
  
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
      docker run --name mysql -e MYSQL_ROOT_PASSWORD="0000" -p 3306:3306 -d mysql
      ```
- Add credentails for your MySQL, Twitter API and MongoDB into the Flask Apps. Also, Import our Dashboard JSON into your Grafana Server and configure your data sources accordingly. 



## Contributors

| Krishnakanth Alagiri | Mahalakshumi V | Vignesh S | Nivetha MK |
|----------------------|----------------|-----------|------------|
| [![f](https://avatars1.githubusercontent.com/u/39209037?s=86)](https://github.com/bearlike) | [![f](https://avatars2.githubusercontent.com/u/40058339?s=86)](https://github.com/mahavisvanathan) | [![f](https://avatars3.githubusercontent.com/u/42212364?s=86)](https://github.com/Vignesh0404) | [![f](https://avatars2.githubusercontent.com/u/43270349?s=86)](https://github.com/nivethaakm99) | 
| [@bearlike](https://github.com/bearlike) | [@mahavisvanathan](https://github.com/mahavisvanathan) | [@Vignesh0404](https://github.com/Vignesh0404) | [@nivethaakm99](https://github.com/nivethaakm99) |


## Acknowledgments
- Our **[NSFW Image Classification Dataset](https://www.kaggle.com/krishnaalagiri/nsfw-image-classification)** for **Obscene Image Classification**.
- **[Jigsaw Toxic Comment Classification Dataset](https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge/data)** for the dataset on **Text Toxicity Classification** 
- Hat tip to anyone whose code was used.


## License
MIT © [Axenhammer](/LICENSE)


<br><br>
<p align="center">
  Made with ❤️ by <a href="https://github.com/axenhammer"> Axemhammer</a>
</p>

![wave](http://cdn.thekrishna.in/img/common/border.png)
