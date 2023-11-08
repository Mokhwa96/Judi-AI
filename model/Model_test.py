from function_similar_final import get_similar_sentences
from ChatGPT_transform import chatbot

api_key='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'
data_path = "C:/Users/gjaischool/Desktop/My_coding/final_projects/Judi-AI/total_embedding_done.csv"

def model(api_key, data_path):
  message = chatbot(api_key)
  similar_sentences = get_similar_sentences(api_key, data_path, message)
  print(similar_sentences)
  similar_sentences.to_csv("result.csv", encoding = "utf-8")
  
model(api_key, data_path)
