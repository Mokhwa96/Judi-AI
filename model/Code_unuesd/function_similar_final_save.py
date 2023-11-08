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
input_sentence = "피해자 B와 피고인 A는 우연히 같은 바에서 인연을 맺었다는 상황을 가정해봅시다. 피고인 A는 2021년 3월 7일 03:00경부터 04:30경 사이에 광주 서구에 위치한 C 바 내에서 사건이 발생하였습니다. A는 B가 자신의 핸드폰을 가져가려는 것을 보고 반응하였는데 이 과정에서 B가 넘어져 머리를 세게 박았습니다. 이로 인해 B는 목숨을 잃었는데 영상에서는 A가 B를 신체적으로 공격하거나 존폐 상태로 만드는 장면 등은 확인되지 않았습니다."

similar_sentences = get_similar_sentences(api_key, data_path, input_sentence)
print(similar_sentences)