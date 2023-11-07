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
input_sentence = "피해자 A(여성, 22세)는 2021년 9월 17일 약 23시경, 서울시 내에 위치한 한 번화가 지하철역 인근에서 집으로 귀가하던 중 미상의 가해자에게 무작위 폭행을 당하였다. 가해자는 후드 티와 마스크를 착용하였으며, 이로 인해 그의 정확한 신원을 확인할 수 없었다. 키가 크고 마른 체형의 30대로 추정되는 남성 가해자는 A에게 접근하여 욕설을 하며 얼굴을 주먹으로 강타하였다. 이로 인해 A는 오른쪽 눈 및 얼굴에 심각한 부상을 입었으며, 병원 진단 결과 외상 후 스트레스 장애(PTSD)의 초기 증상을 보이고 있음이 확인되었다. 이 사건으로 인해 A는 심리적인 고통과 함께 신체적인 상해를 입었고, 경찰에 신고한 후 심리 상담을 받고 있는 중이다. 본 사건의 범죄 사실은 A의 의료 기록과 상담 기록, 그리고 목격자의 증언을 통해 입증될 수 있다. 현재까지 가해자는 검거되지 않았으며, 경찰은 CCTV 확인 및 목격자 조사를 통해 가해자의 신원 파악 및 검거를 위한 수사를 지속하고 있다."

similar_sentences = get_similar_sentences(api_key, data_path, input_sentence)
print(similar_sentences)