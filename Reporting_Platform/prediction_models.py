#!/usr/bin/python3
def predict_image(model,test_image_name):
    from torchvision import transforms
    from PIL import Image
    import torch
    from imageio import imread

    image_transforms = {
    'test':transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize(size=256),
        transforms.CenterCrop(size=224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])

        ])
    }
    idx_to_class = {0: 'drawing', 1: 'hentai', 2: 'neutral', 3: 'porn', 4: 'sexy'}
    transform = image_transforms['test']
    
    test_image = imread(test_image_name)
    test_image_tensor = transform(test_image)
 
    if torch.cuda.is_available():
        test_image_tensor = test_image_tensor.view(1, 3, 224, 224).cuda()
    else:
        test_image_tensor = test_image_tensor.view(1, 3, 224, 224)
     
    with torch.no_grad():
        model.eval()
        # Model outputs log probabilities
        out = model(test_image_tensor)
        ps = torch.exp(out)
        # topk, topclass = ps.topk(1, dim=1)
        return ps.tolist()[0]


# Models
def predict_text(model,sentence,device):  
  from transformers import BertTokenizer
  import torch
  import torch.nn as nn

  tokenizer = BertTokenizer.from_pretrained('bert-base-multilingual-uncased')

  # Model parameter
  MAX_SEQ_LEN = 256
  PAD_INDEX = tokenizer.convert_tokens_to_ids(tokenizer.pad_token)
  UNK_INDEX = tokenizer.convert_tokens_to_ids(tokenizer.unk_token)
  tokenized = tokenizer.tokenize(sentence)
  tokenized = tokenizer.convert_tokens_to_ids(tokenized)
  tensor = torch.LongTensor(tokenized).to(device)
  tensor = tensor.unsqueeze(1).T
  length_tensor = torch.LongTensor([MAX_SEQ_LEN])
  prediction = model(tensor,torch.LongTensor([1]).to(device).unsqueeze(1).T)
  _, output = prediction
  category = torch.argmax(output,1)
  return nn.functional.softmax(prediction[1][0],dim=0).tolist()[1]

def predict_chat_toxicity(model,chat_file,device):
  import csv
  total = 0
  toxic = 0
  with open(chat_file, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
      message = row['message']
      score = predict_text(model,message,device)
      if(score>0.9):
        toxic+=1
      total+=1

  print((toxic/total)*100)
  return (toxic/total)*100
