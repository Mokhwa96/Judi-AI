from function_similar_final import get_similar_sentences
from ChatGPT_test import chatbot 
from extract_last_paragraph import extract_last_paragraph
from extract_user import extract_user

api_key='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'
data_path = "C:/Users/gjaischool/Desktop/My_coding/final_projects/Judi-AI/total_embedding_done.csv"

def model(api_key, data_path):
  message = chatbot(api_key)
  input_sentence = extract_user(message)
  similar_sentences = get_similar_sentences(api_key, data_path, input_sentence)
  print(similar_sentences)
  similar_sentences.to_csv("result.csv", encoding = "utf-8")
  
model(api_key, data_path)
