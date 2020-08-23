#!/usr/bin/python3
import sys
import torch
from pybert.configs.basic_config import config
import torch.nn as nn
from transformers.modeling_bert import BertPreTrainedModel, BertModel
import numpy as np
from torch.utils.data import TensorDataset
from transformers import BertTokenizer


class BertProcessor(object):
    """Base class for data converters for sequence classification data sets."""

    def __init__(self,vocab_path,do_lower_case):
        self.tokenizer = BertTokenizer(vocab_path,do_lower_case)

    def get_labels(self):
        """Gets the list of labels for this data set."""
        return ["toxic","severe_toxic","obscene","threat","insult","identity_hate"]

    @classmethod
    def read_data(cls, input_file,quotechar = None):
        """Reads a tab separated value file."""
        if 'pkl' in str(input_file):
            lines = load_pickle(input_file)
        else:
            lines = input_file
        return lines

    def truncate_seq_pair(self,tokens_a,tokens_b,max_length):
        # This is a simple heuristic which will always truncate the longer sequence
        # one token at a time. This makes more sense than truncating an equal percent
        # of tokens from each, since if one sequence is very short then each token
        # that's truncated likely contains more information than a longer sequence.
        while True:
            total_length = len(tokens_a) + len(tokens_b)
            if total_length <= max_length:
                break
            if len(tokens_a) > len(tokens_b):
                tokens_a.pop()
            else:
                tokens_b.pop()

  

class BertForMultiLable(BertPreTrainedModel):
    def __init__(self, config):
        super(BertForMultiLable, self).__init__(config)
        self.bert = BertModel(config)
        self.dropout = nn.Dropout(config.hidden_dropout_prob)
        self.classifier = nn.Linear(config.hidden_size, config.num_labels)
        self.init_weights()

    def forward(self, input_ids, token_type_ids=None, attention_mask=None,head_mask=None):
        outputs = self.bert(input_ids, token_type_ids=token_type_ids,attention_mask=attention_mask, head_mask=head_mask)
        pooled_output = outputs[1]
        pooled_output = self.dropout(pooled_output)
        logits = self.classifier(pooled_output)
        return logits

    

def main(text,arch,max_seq_length,do_lower_case):
    processor = BertProcessor(vocab_path=config['bert_vocab_path'], do_lower_case=do_lower_case)
    label_list = processor.get_labels()
    id2label = {i: label for i, label in enumerate(label_list)}
    model = BertForMultiLable.from_pretrained(config['checkpoint_dir'] /f'{arch}', num_labels=len(label_list))
    tokens = processor.tokenizer.tokenize(text)
    if len(tokens) > max_seq_length - 2:
        tokens = tokens[:max_seq_length - 2]
    tokens = ['[CLS]'] + tokens + ['[SEP]']
    input_ids = processor.tokenizer.convert_tokens_to_ids(tokens)
    input_ids = torch.tensor(input_ids).unsqueeze(0)  # Batch size 1, 2 choices
    logits = model(input_ids)
    probs = logits.sigmoid()
    print(probs.cpu().detach().numpy()[0])
    return probs.cpu().detach().tolist()[0]

def evaluate(vd):
  d = 0
  if vd['toxic']>0.5:
    if vd['severe_toxic']>0.7:
      print('Extremely toxic. Text has been blocked - Toxic, Severe Toxic')
      d = 1
  if vd['identity_hate']>0.5 and d==0:
    print('Extremely toxic. Text has been blocked - Identity Hate')
    d = 1
  if vd['threat']>0.6 and vd['toxic']>0.9 and d==0:
    print('Extremely toxic.- Threat, Toxic')
    print("Action: Text has been blocked.")
    d = 1

  if vd['toxic']>0.9 and vd['insult']>0.94 and vd['obscene']>0.9 and d == 0:
    print('Extremely toxic. Text has been blocked. - Toxic, Insult, Obscene')
    d = 1 
  if d==0:
    print("Non-Toxic Text")
    print("Action: Text will not be blocked.")

def predict_string(input_string):
    text = input_string
    max_seq_length = 256
    do_loer_case = True
    arch = 'bert'
    probs = main(text,arch,max_seq_length,do_loer_case)
    return probs
    # classes = ["toxic","severe_toxic","obscene","threat","insult","identity_hate"]
    # print("Text:",text)
    # v_dict = {classes[i]: probs[i] for i in range(len(probs))}
    # for i in range(len(classes)):
    #   print(classes[i],"{:.3f}".format(probs[i]))
    # evaluate(v_dict) 
    
'''
  #output
  [0.98304486 0.40958735 0.9851305  0.04566246 0.8630512  0.07316463]
'''
