import sys
sys.path.append('C:/Users/gjaischool1/mococo_project/Judi-AI-main/model')
from ChatGPT_transform import chatbot
from result_export import result
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from openai import OpenAI
import numpy as np



api_key='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'
data_path = "C:/Users/gjaischool1/mococo_project/Judi-AI-main/hh/total_embedding_done.csv"


def MODEL_1(input_data_embedding):

  from keras.models import load_model
  model_1 = load_model('C:/Users/gjaischool1/mococo_project/my/model1_test1.h5')
  import pickle
  with open('C:/Users/gjaischool1/mococo_project/my/label_encoder.pkl', 'rb') as file:
    loaded_e = pickle.load(file)
  result = loaded_e.inverse_transform([model_1.predict(input_data_embedding).argmax()])
  casename = result[0]
  return casename




sentences = []

def get_similar_sentences(api_key, data_path, input_sentence, engine='text-embedding-ada-002'):
  # API 키 설정
  client = OpenAI(api_key=api_key, )

  # 데이터 불러오기
  data = pd.read_csv(data_path)

  # 샘플만 사용하고 복사본을 만듭니다.
  data_sample = data.copy()

  # 'embedding' 열의 문자열을 NumPy 배열로 변환
  data_sample['embedding'] = data_sample['embedding'].apply(lambda x: np.array(eval(x)))

  # 유사도 계산
  input_sentence_embed = client.embeddings.create(input=input_sentence, model=engine).data[0].embedding

  input_fin = np.array(input_sentence_embed)  # 임베딩을 NumPy 배열로 변환

  query_2d = input_fin.reshape(1, -1)

  data_sample = data_sample[data_sample['casename'] == MODEL_1(query_2d)]  # casename test

  data_sample['similarity'] = data_sample['embedding'].apply(
    lambda x: cosine_similarity(x.reshape(1, -1), query_2d)[0][0])

  top_similar_sentence = data_sample.sort_values("similarity", ascending=False).head(10)[["casename", "facts", "ruling"]]

  # 유사한 문장 찾기
  return top_similar_sentence




def model(api_key, data_path):

  message = chatbot(api_key)
  similar_sentences = get_similar_sentences(api_key, data_path, message)
  global data_sentences
  data_sentences = similar_sentences
  sentences.append([line for line in similar_sentences['ruling']])

model(api_key, data_path)
result(sentences[0])



