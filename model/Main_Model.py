from function_similar_final import get_similar_sentences
from ChatGPT_transform import chatbot 
from result_export import result


api_key='api-key'
data_path = "C:/Users/gjaischool/Desktop/My_coding/final_projects/Judi-AI/total_embedding_done.csv"

sentences = []

def model(api_key, data_path):

  message = chatbot(api_key)
  similar_sentences = get_similar_sentences(api_key, data_path, message)
  global data_sentences
  data_sentences = similar_sentences
  sentences.append([line for line in similar_sentences['ruling']])

model(api_key, data_path)
result(sentences[0])



