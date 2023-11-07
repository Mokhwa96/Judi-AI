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
    
    top_similar_sentence = data_sample.sort_values("similarity", ascending=False).head(3)[["casename", "facts", "ruling"]]
    
    # 유사한 문장 찾기
    return top_similar_sentence