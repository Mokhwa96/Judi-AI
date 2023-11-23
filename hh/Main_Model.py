from openai import OpenAI
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import json
import sys
import re

def chatbot(api_key, request):
    client = OpenAI(api_key=api_key,)

    chat = client.chat.completions.create(model='gpt-4-1106-preview', messages=request)
    reply = chat.choices[0].message.content

    return reply

def casename_find(sentence):

    casename = ''
    if '강제추행' in sentence[-100:]:
        casename = '강제추행'
    elif '공무집행방해' in sentence[-100:]:
        casename = '공무집행방해'
    elif '교통사고처리특례법위반(치상)' in sentence[-100:]:
        casename = '교통사고처리특례법위반(치상)'
    elif '도로교통법위반(음주운전)' in sentence[-100:]:
        casename = '도로교통법위반(음주운전)'
    elif '사기' in sentence[-100:]:
        casename = '사기'
    elif '상해' in sentence[-100:]:
        casename = '상해'
    elif '폭행' in sentence[-100:]:
        casename = '폭행'
    
    return casename


def get_similar_sentences(api_key, file_path, input_sentence, threshold=0.9, engine='text-embedding-ada-002'):
    # API 키 설정
    client = OpenAI(api_key=api_key)

    # 데이터 불러오기
    data = pd.read_csv(file_path + "data.csv")
    # print(f'data.head :\n{data.head()}')
    array = np.load(file_path +'embedding.npy')
    # print(f'array : {array[0]}')

    # 입력 문장의 임베딩 계산
    input_sentence_embed = client.embeddings.create(input=input_sentence, model=engine).data[0].embedding
    input_fin = np.array(input_sentence_embed)

    # 유사도 계산
    similarities = np.dot(array, input_fin) / (np.sqrt((array**2).sum(axis=-1)) * np.sqrt((input_fin**2).sum()))
    # print(f'similarities : {similarities}')
        
    # 유사도가 threshold 이상인 모든 인덱스 찾기
    similar_indexes = np.where(similarities >= threshold)[0]
    # print(f'similar_indexes : {similar_indexes}')

    # 유사도와 인덱스 쌍을 반환
    similar_sentences_sorted = sorted([(index, similarities[index]) for index in similar_indexes], key=lambda x: x[1], reverse=True)
    # print(f'similar_sentences_sorted : {similar_sentences_sorted}')

    # 결과를 데이터 프레임으로 변환
    result_df = pd.DataFrame([data.iloc[i[0]][["casename", "facts", "ruling"]].to_dict() for i in similar_sentences_sorted])
    # print(f'result_df :\n{result_df}')

    return result_df


def result_statistics(sentences):

    징역 = {'실형':{}, '집행유예':{}, '선고유예':{}}
    금고 = {'실형':{}, '집행유예':{}, '선고유예':{}}
    벌금 = {}
    사회봉사 = {}
    성폭력_치료프로그램 = {}
    피고인_정보공개 = {}
    아동_청소년_장애인복지시설_취업제한 = {}
    준법운전강의 = {}
    보호관찰 = {}

    for text in sentences:
        text = re.sub(r'\d\.', '', text)

        pattern1 = r'징역 ?(.*[년월]).*[정처 ]한다.*집행.*유예'
        pattern2 = r'징역 ?(.*[년월]).*[정처 ]한다.*선고.*유예'
        pattern3 = r'징역 ?(.*[년월]).*[정처 ]한다'
        if re.search(pattern1, text):
            if re.search(pattern1, text).group(1).replace(' 징역','').replace('개','') in 징역['집행유예']:
                징역['집행유예'][re.search(pattern1, text).group(1).replace(' 징역','').replace('개','')] += 1
            else:
                징역['집행유예'][re.search(pattern1, text).group(1).replace(' 징역','').replace('개','')] = 1

        elif re.search(pattern2, text):
            if re.search(pattern2, text).group(1).replace(' 징역','').replace('개','') in 징역['선고유예']:
                징역['선고유예'][re.search(pattern2, text).group(1).replace(' 징역','').replace('개','')] += 1
            else:
                징역['선고유예'][re.search(pattern2, text).group(1).replace(' 징역','').replace('개','')] = 1

        elif re.search(pattern3, text):
            if re.search(pattern3, text).group(1).replace(' 징역','').replace('개','') in 징역['실형']:
                징역['실형'][re.search(pattern3, text).group(1).replace(' 징역','').replace('개','')] += 1
            else:
                징역['실형'][re.search(pattern3, text).group(1).replace(' 징역','').replace('개','')] = 1

        pattern = r'금고 ?(.*[년월]).*[정처 ]한다'
        if re.search(pattern, text) and '금고' in text:
            if re.search(r'집행.*유예', text):
                if re.search(pattern, text).group(1) in 금고['집행유예']:
                    금고['집행유예'][re.search(pattern, text).group(1).replace(' 징역','').replace('개','')] += 1
                else:
                    금고['집행유예'][re.search(pattern, text).group(1).replace(' 징역','').replace('개','')] = 1

            elif re.search(r'선고.*유예', text):
                if re.search(pattern, text) in 금고:
                    금고['선고유예'][re.search(pattern, text).group(1).replace(' 징역','').replace('개','')] += 1
                else:
                    금고['선고유예'][re.search(pattern, text).group(1).replace(' 징역','').replace('개','')] = 1

            else:
                if re.search(pattern, text) in 금고:
                    금고['실형'][re.search(pattern, text).group(1).replace(' 징역','').replace('개','')] += 1
                else:
                    금고['실형'][re.search(pattern, text).group(1).replace(' 징역','').replace('개','')] = 1

        if '벌금' in text:
            pattern = r'벌금 (.*)에 처한다'
            if bool(re.search(pattern, text)):
                money = re.search(pattern, text).group(1).replace(',','').replace(' ','').replace('(백만)','')

                if '만원' in money:

                    if money in 벌금:
                        벌금[money] += 1
                    else:
                        벌금[money] = 1
                else:
                    money = str(int(int(money[:-1])/10000))+'만원'
                    if money in 벌금:
                        벌금[money] += 1
                    else:
                        벌금[money] = 1


        if '보호관찰' in text:
              if '전체' in 보호관찰:
                  보호관찰['전체'] += 1
              else:
                  보호관찰['전체'] = 1

        if '사회봉사' in text:
            pattern = r'(\d+시간)의 사회봉사'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1) in 사회봉사:
                    사회봉사[re.search(pattern, text).group(1)] += 1
                else:
                    사회봉사[re.search(pattern, text).group(1)] = 1

        if '성폭력' in text:
            pattern = r'(\d+시간)의 성폭력'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1) in 성폭력_치료프로그램:
                    성폭력_치료프로그램[re.search(pattern, text).group(1)] += 1
                else:
                    성폭력_치료프로그램[re.search(pattern, text).group(1)] = 1

        if '피고인에 대한 정보' in text:
            pattern = r'\d+년'
            if bool(re.findall(pattern, text)):
                if re.findall(pattern, text)[0] in 피고인_정보공개:
                    피고인_정보공개[re.findall(pattern, text)[0]] += 1
                else:
                    피고인_정보공개[re.findall(pattern, text)[0]] = 1

        if '청소년 관련기관' in text:
            pattern = r'(\d+년).*취업제한'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1) in 아동_청소년_장애인복지시설_취업제한:
                    아동_청소년_장애인복지시설_취업제한[re.search(pattern, text).group(1)] += 1
                else:
                    아동_청소년_장애인복지시설_취업제한[re.search(pattern, text).group(1)] = 1

        if '준법운전강의' in text:
            pattern = r'(\d+시간)의 준법운전강의'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1) in 준법운전강의:
                    준법운전강의[re.search(pattern, text).group(1)] += 1
                else:
                    준법운전강의[re.search(pattern, text).group(1)] = 1

    벌금 = dict(sorted(벌금.items(), key=lambda x:x[1], reverse=True))
    보호관찰 = dict(sorted(보호관찰.items(), key=lambda x:x[1], reverse=True))
    사회봉사 = dict(sorted(사회봉사.items(), key=lambda x:x[1], reverse=True))
    성폭력_치료프로그램 = dict(sorted(성폭력_치료프로그램.items(), key=lambda x:x[1], reverse=True))
    피고인_정보공개 = dict(sorted(피고인_정보공개.items(), key=lambda x:x[1], reverse=True))
    아동_청소년_장애인복지시설_취업제한 = dict(sorted(아동_청소년_장애인복지시설_취업제한.items(), key=lambda x:x[1], reverse=True))
    준법운전강의 = dict(sorted(준법운전강의.items(), key=lambda x:x[1], reverse=True))
    전체 = {}

    if 징역['실형']:
      전체['징역_실형'] = sum(징역['실형'].values())
    if 징역['집행유예']:
      전체['징역_집행유예'] = sum(징역['집행유예'].values())
    if 징역['선고유예']:
      전체['징역_선고유예'] = sum(징역['선고유예'].values())
    전체['징역_전체'] =  sum([sum(징역[key].values()) for key in 징역.keys() if 징역[key]])

    if 금고['실형']:
      전체['금고_실형'] = sum(금고['실형'].values())
    if 금고['집행유예']:
      전체['금고_집행유예'] = sum(금고['집행유예'].values())
    if 금고['선고유예']:
      전체['금고_선고유예'] = sum(금고['선고유예'].values())
    전체['금고_전체'] =  sum([sum(금고[key].values()) for key in 금고.keys() if 금고[key]])

    if 벌금:
      전체['벌금'] = sum(벌금.values())

    if 보호관찰:
      전체['보호관찰'] = sum(보호관찰.values())

    if 사회봉사:
      전체['사회봉사'] = sum(사회봉사.values())

    if 성폭력_치료프로그램:
      전체['성폭력_치료프로그램'] = sum(성폭력_치료프로그램.values())

    if 피고인_정보공개:
      전체['피고인_정보공개'] = sum(피고인_정보공개.values())

    if 아동_청소년_장애인복지시설_취업제한:
      전체['아동_청소년_장애인복지시설_취업제한'] = sum(아동_청소년_장애인복지시설_취업제한.values())

    if 준법운전강의:
      전체['준법운전강의'] = sum(준법운전강의.values())

    casename_dict = {'전체': 전체, '징역': 징역, '금고': 금고, '벌금': 벌금, '보호관찰': 보호관찰, '사회봉사': 사회봉사, '성폭력_치료프로그램': 성폭력_치료프로그램,
                     '피고인_정보공개': 피고인_정보공개, '아동_청소년_장애인복지시설_취업제한': 아동_청소년_장애인복지시설_취업제한,
                     '준법운전강의': 준법운전강의}

    return casename_dict

if __name__ == "__main__":
  api_key = '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'
  file_path = "C:/Users/gh576/JudiAI/hh/"

  line = sys.stdin.buffer.readline().decode('utf-8')
  request = json.loads(line)

  # 요청 처리 및 결과 저장
  reply_text = chatbot(api_key, request)
  df_similar_sentences = get_similar_sentences(api_key, file_path, reply_text, engine='text-embedding-ada-002')
  if (df_similar_sentences.empty):
      sentences = []
  else:
      sentences = [line for line in df_similar_sentences['ruling']]
  result_final = result_statistics(sentences)
  result_final['results'] = reply_text
  # 결과를 클라이언트로 전송
  sys.stdout.reconfigure(encoding='utf-8')
  sys.stdout.write(json.dumps(result_final, ensure_ascii=False))
  sys.stdout.flush()
