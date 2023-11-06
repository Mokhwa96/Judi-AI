import openai
from openai.embeddings_utils import get_embedding
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np

def get_similar_sentences(api_key, data_path, input_sentence, engine='text-embedding-ada-002'):
    # API 키 설정
    openai.api_key = api_key

    # 데이터 불러오기
    data = pd.read_csv(data_path)

    # 샘플만 사용하고 복사본을 만듭니다.
    data_sample = data.copy()

    # 'embedding' 열의 문자열을 NumPy 배열로 변환
    data_sample['embedding'] = data_sample['embedding'].apply(lambda x: np.array(eval(x)))

    # 유사도 계산
    input_sentence_embed = get_embedding(input_sentence, engine=engine)

    input_fin = np.array(input_sentence_embed)  # 임베딩을 NumPy 배열로 변환

    query_2d = input_fin.reshape(1, -1)

    data['similarity'] = data['embedding'].apply(lambda x: cosine_similarity(x.reshape(1, -1), query_2d)[0][0])
    
    top_similar_sentence = data.sort_values("similarity", ascending=False).head(3)['facts']

    # 유사한 문장 찾기
    return top_similar_sentence

# 사용 예시
api_key = "sk-aZvJg3cjNo2AbDwTEGf1T3BlbkFJzixDEKBWPLKCaiWNYRdUL"
data_path = "C:/Users/gjaischool/Desktop/My_coding/final_projects/Judi-AI/Judi-AI/total_embedding_done.csv"
input_sentence = "피고인은 피해자 B(여, 26세)의 직장 상사이다. 1. 피고인은 2018. 6. 24. 00:00경 강원 태백시 C에 있는 ‘D' 노래방 앞 노상에서 갑자기 피해자의 허리를 감싸안고, 피해자의 얼굴에 피고인의 얼굴을 들이대며 입술을 내밀어 키스를 하려고 하는 등 강제로 피해자를 추행하였다."

similar_sentences = get_similar_sentences(api_key, data_path, input_sentence)
print(similar_sentences)