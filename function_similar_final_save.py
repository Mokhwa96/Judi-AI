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

    data_sample['similarity'] = data_sample['embedding'].apply(lambda x: cosine_similarity(x.reshape(1, -1), query_2d)[0][0])

    top_similar_sentence = data_sample.sort_values("similarity", ascending=False).head(10)
    top_similar_sentence.to_csv("top_similar_sentence0.csv",encoding="utf-8-sig")
    down_similar_sentence = data_sample.sort_values("similarity", ascending=True).head(10)
    down_similar_sentence.to_csv("down_similar_sentence0.csv",encoding="utf-8-sig")
    # 유사한 문장 찾기
    return top_similar_sentence

# 사용 예시
api_key = "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"
data_path = "C:/Users/gjaischool/Desktop/My_coding/final_projects/Judi-AI/total_embedding_done.csv"
input_sentence = "피고인은 피해자 A(님, 남, 나이를 명시해주시면 좋을 것 같아요)과 알고 있는 사이가 아니였다. 피고인은 2020. (어제 날짜를 작성해주세요 ex. 9.15) 24:00경 광주 동구 '달밤'이라는 술집에서 피해자와 마주쳤다. 피고인은 소주를 피해자에게 쏟는 사고를 냈고, 피해자에게 제대로 된 사과를 요구하자 갑자기 화를 내며 피해자를 폭행하였다. 피해자는 폭행으로 인하여 오른팔을 골절하였다는 진단을 받았다. 이에 따라 피고인은 폭력행위를 행하였다."

similar_sentences = get_similar_sentences(api_key, data_path, input_sentence)
print(similar_sentences)