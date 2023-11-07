#과정 1번 : 아래 코드는 판결문의 내용을 가져와 임베딩 처리를 하는 코드입니다.

import openai
from openai.embeddings_utils import get_embedding
import numpy as np
import pandas as pd
import os
from glob import glob
os.chdir("C:/Users/gjaischool/Desktop/My_coding/final_projects/Judi-AI/")


# api_key 설정
openai.api_key = "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"
max_words = []
start = 0
end = 1000
# 데이터를 청크로 불러와 각 청크에서 "facts" 열의 최대 단어 수를 계산
for data in pd.read_csv("data_full.csv", chunksize=1000):
    # "facts" 열의 각 행을 공백을 기준으로 단어로 나누고 단어의 수를 계산
    word_counts = data["facts"].str.split().str.len()
    # 최대 단어 수 추가
    max_words.append(word_counts.max())
    print(max_words)  # 각 청크의 최대 단어 수를 출력합니다
    # 임베딩 처리후 저장하기
    data["embedding"] = data["facts"].apply(lambda row: get_embedding(row, engine= 'text-embedding-ada-002'))

    data.to_csv("data_ruling_embed_"+str(start)+".csv", encoding = "utf-8", index = False) # CP949로 이용시 오류 발생
    start +=1000
    end += 1000
    print(str(start) + "~" + str(end))

#나눠서 임베딩한 파일을 병합하는 과정---------------------------------------------------------------------------------------------------------

file_names = glob("C:/Users/gjaischool/Desktop/My_coding/final_projects/Judi-AI/merged/*.csv") #폴더 내의 모든 csv파일 목록을 불러온다
print(file_names)
total = pd.DataFrame() #빈 데이터프레임 하나를 생성한다

for file_name in file_names:
    temp = pd.read_csv(file_name, sep=',', encoding='utf-8') #csv파일을 하나씩 열어 임시 데이터프레임으로 생성한다
    total = pd.concat([total, temp]) #전체 데이터프레임에 추가하여 넣는다

print(total.columns)
print(total.head())
total = total.drop('Unnamed: 0.1', axis=1)
total = total.drop('Unnamed: 0', axis=1)
total.to_csv("C:/Users/gjaischool/Desktop/My_coding/final_projects/Judi-AI/total_embedding_done.csv")