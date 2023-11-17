from openai import OpenAI
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import json
import sys
import time
import asyncio


api_key = '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'
data_path = "C:/Users/gjaischool1/mococo_project/Judi-AI-main/hh/total_embedding_done.csv"

messages = [{"role": "system", "content": "너는 법률 문제에 대해 상담을 진행해주는 변호사야. 지금 나는 너에게 법률 문제에 대해 상담을 받으러 왔고, 내가 처한 상황을 설명할거야. 너는 내가 하는 말에 공감해주면서 사실관계 파악을 위해 부족한 정보가 있다면 하나씩 친절하게 물어볼 수 있어. 사실관계 파악을 위한 충분한 정보가 모였다면, 마지막에는 파악된 정보를 요약해서 알려줘"}, ]
top_similar_sentence = ''
casename = ''




def chatbot(api_key, input_text):
    client = OpenAI(api_key=api_key,)


    # chat = client.chat.completions.create(model='gpt-4', messages=[{"role": "user","content": last_content + "\n위 글을\n" + "피해자 B과 피고인 A은 과거 연인 사이였다. 피고인은 위 2021. 3. 7. 03:00경에서 같은 날 04:30경 사이 광주 서구 C, 3층에 있는 D주점 내 불상의 방에서 피해자 B이 자신을 폭행하였다는 이유로 피해자의 머리채를 잡아 바닥에 밀쳐놓고 피해자의 얼굴과 머리, 팔, 어깨 등을 손으로 수회 때리거나 발로 밟아 폭행하고, 다른 방으로 도망한 피해자를 찾아가 또다시 주먹으로 피해자의 얼굴을 2회 때리고 7~8회 가량 침을 뱉고 생수를 머리에 붓는 등 폭행하였다. 이로써 피고인은 피해자를 폭행하여 우측 후이개, 하악, 협부의 부종과 잠깐의 의식소실 및 후두부 타박으로 인한 압통 등 약 2주간의 치료를 필요로 하는 상해를 가하였다." + "\n와 같은 형식으로 바꿔줘"}])
    if input_text == 'break':
       last_content = messages[-1]['content']
       chat = client.chat.completions.create(model='gpt-4', messages=[{"role":"user" , "content": last_content + "\n위 글의 사건 상황을 정리해서 판레문 형식으로 바꿔주고 마지막에 '강제추행', '공무집행방해', '교통사고처리특례법위반(치상)', '도로교통법위반(음주운전)', '사기', '상해','폭행'중 가장 근접한 한가지를 했다고 적어줘"}])
       last_paragraph = chat.choices[0].message.content
       messages.append({"role": 'assistant', 'content': last_paragraph})
       return last_paragraph
    
    messages.append({"role":"user", "content":input_text})
    chat = client.chat.completions.create(model='gpt-4', messages=messages)
    reply = chat.choices[0].message.content
    messages.append({"role":'assistant', 'content':reply})
    return reply






def casename_find(sentence):

#     모델1초기v
#     from keras.models import load_model
#
#
#     model_1 = load_model('C:/Users/gjaischool1/mococo_project/my/model1_test1.h5')
#     import pickle
#     with open('C:/Users/gjaischool1/mococo_project/my/label_encoder.pkl', 'rb') as file:
#         loaded_e = pickle.load(file)
#     result = loaded_e.inverse_transform([model_1.predict(input_data_embedding).argmax()])
#
#     predict_idx = model_1.predict(input_data_embedding).argsort()[0][::-1]
#     predict = sorted(model_1.predict(input_data_embedding)[0], reverse=True)
#     print('0.강제추행, 1.공무집행방해, 2.교통사고처리특례법위반(치상), 3.도로교통법위반(음주운전), 4.사기, 5.상해, 6.폭행')
#
#     for i in range(6):
#         print(f'{predict_idx[i]}:{predict[i]:.4f}')
#
#     input_data_casename = result[0]
#     return input_data_casename



    global casename
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
    print('casename:',casename)




def get_similar_sentences(api_key, data_path, input_sentence, engine='text-embedding-ada-002'):
    # API 키 설정
    client = OpenAI(api_key=api_key,)

    # 데이터 불러오기
    data = pd.read_csv(data_path)

    # 샘플만 사용하고 복사본을 만듭니다.
    data_sample = data.copy()

    # 'embedding' 열의 문자열을 NumPy 배열로 변환
    data_sample['embedding'] = data_sample['embedding'].apply(lambda x: np.array(eval(x)))

    # 유사도 계산
    input_sentence_embed = client.embeddings.create(input = input_sentence, model=engine).data[0].embedding

    input_fin = np.array(input_sentence_embed)  # 임베딩을 NumPy 배열로 변환

    query_2d = input_fin.reshape(1, -1)



    # casename = MODEL_1(query_2d)

    # print('예상casename:',casename)

    data_sample_predict_case = data_sample[data_sample['casename']==casename]



    data_sample_predict_case.loc[:,'similarity'] = data_sample_predict_case['embedding'].apply(lambda x: cosine_similarity(x.reshape(1, -1), query_2d)[0][0])

    global top_similar_sentence

    top_similar_sentence = data_sample_predict_case.sort_values("similarity", ascending=False).head(15)[["casename", "facts", "ruling"]]
    
    # 유사한 문장 찾기
    print(top_similar_sentence)
    return top_similar_sentence


def result(sentences):

    import matplotlib.pyplot as plt
    import re
    import matplotlib.font_manager as fm

    # 로컬실행 그래프 한글폰트설정

    font_path = 'C:/Windows/Fonts/malgun.ttf'
    font_name = fm.FontProperties(fname=font_path).get_name()
    plt.rc('font', family=font_name)

    징역 = {}
    금고 = {}
    벌금 = {}
    집행유예 = {}
    사회봉사 = {}
    성폭력_치료프로그램 = {}
    피고인_정보공개 = {}
    아동_청소년_장애인복지시설_취업제한 = {}
    준법운전강의 = {}

    for text in sentences:
        text = re.sub(r'\d\.', '', text)

        if '징역' in text:
            pattern = r'징역 (.*?)에'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1).replace('개','') in 징역:
                    징역[re.search(pattern, text).group(1).replace('개','')] += 1
                else:
                    징역[re.search(pattern, text).group(1).replace('개','')] = 1

        if '금고' in text:
            pattern = r'금고 (.*?)에'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1).replace('개','') in 금고:
                    금고[re.search(pattern, text).group(1).replace('개','')] += 1
                else:
                    금고[re.search(pattern, text).group(1).replace('개','')] = 1

        if '벌금' in text:
            pattern = r'벌금 (.*?)에 처한다'
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

        if '유예' in text:
            pattern = r'(\d+년).*집행.*유예'
            if bool(re.search(pattern, text)):
                if re.search(pattern, text).group(1) in 집행유예:
                    집행유예[re.search(pattern, text).group(1)] += 1
                else:
                    집행유예[re.search(pattern, text).group(1)] = 1
            pattern1 = r'(\d+년).*선고.*유예'
            if bool(re.search(pattern1, text)):
                if re.search(pattern1, text).group(1) in 집행유예:
                    집행유예['선고유예'] += 1
                else:
                    집행유예['선고유예'] = 1

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

    징역 = dict(sorted(징역.items(), key=lambda x:x[1], reverse=True))
    금고 = dict(sorted(금고.items(), key=lambda x:x[1], reverse=True))
    벌금 = dict(sorted(벌금.items(), key=lambda x:x[1], reverse=True))
    집행유예 = dict(sorted(집행유예.items(), key=lambda x:x[1], reverse=True))
    사회봉사 = dict(sorted(사회봉사.items(), key=lambda x:x[1], reverse=True))
    성폭력_치료프로그램 = dict(sorted(성폭력_치료프로그램.items(), key=lambda x:x[1], reverse=True))
    피고인_정보공개 = dict(sorted(피고인_정보공개.items(), key=lambda x:x[1], reverse=True))
    아동_청소년_장애인복지시설_취업제한 = dict(sorted(아동_청소년_장애인복지시설_취업제한.items(), key=lambda x:x[1], reverse=True))
    준법운전강의 = dict(sorted(준법운전강의.items(), key=lambda x:x[1], reverse=True))
    pltcount = sum(bool(x) for x in [징역, 금고, 벌금, 집행유예, 사회봉사, 성폭력_치료프로그램, 피고인_정보공개, 아동_청소년_장애인복지시설_취업제한, 준법운전강의])

    # pie 그래프 그리는 함수 정의
    def create_pie_chart(data_dict, category_name, pltcount, count):
      total = sum(data_dict.values())  # 총합 계산
      labels = []
      sizes = []
      others = 0  # "기타"의 값

      # 항목별 비중을 계산하고, 10% 미만 항목은 "기타"로 묶음
      for label, size in data_dict.items():
          if size / total >= 0.1:  # 비중이 10% 이상인 경우
              labels.append(label)
              sizes.append(size)
          else:  # 비중이 10% 미만인 경우
              others += size

      # "기타" 항목을 리스트에 추가
      if others > 0:
          labels.append('기타')
          sizes.append(others)

      plt.subplot(2, (pltcount+1)//2, count)
      plt.pie(sizes, labels=labels, autopct='%1.1f%%')  # 파이 차트 생성
      plt.xlabel(category_name)
      count += 1
      return count

		#=========pie=========

    # 파이 차트를 위한 셋업
    fig1 = plt.figure(figsize=(10 * pltcount, 10))  # 전체 그림 크기 조절
    count = 1

    # 각 범주별 파이 차트 생성
    if 징역:
        count = create_pie_chart(징역, '징역', pltcount, count)
    if 금고:
        count = create_pie_chart(금고, '금고', pltcount, count)
    if 벌금:
        count = create_pie_chart(벌금, '벌금', pltcount, count)
    if 집행유예:
        count = create_pie_chart(집행유예, '집행유예', pltcount, count)
    if 사회봉사:
        count = create_pie_chart(사회봉사, '사회봉사', pltcount, count)
    if 성폭력_치료프로그램:
        count = create_pie_chart(성폭력_치료프로그램, '성폭력 치료프로그램', pltcount, count)
    if 피고인_정보공개:
        count = create_pie_chart(피고인_정보공개, '피고인 정보공개', pltcount, count)
    if 아동_청소년_장애인복지시설_취업제한:
        count = create_pie_chart(아동_청소년_장애인복지시설_취업제한, '아동 청소년 장애인복지시설 취업제한', pltcount, count)
    if 준법운전강의:
        count = create_pie_chart(준법운전강의, '준법운전강의', pltcount, count)


    # bar 그래프 그리는 함수 정의
    def create_bar_chart(data_dict, category_name, pltcount, count):
        total = sum(data_dict.values())
        labels = []
        sizes = []
        others = 0  # "기타"의 값

        # 항목별 비중을 계산하고, 10% 미만 항목은 "기타"로 묶음
        for label, size in data_dict.items():
            percentage = (size / total) * 100
            if percentage >= 10.0:  # 비중이 10% 이상인 경우
                labels.append(f"{label} ({percentage:.1f}%, {size}건)")
                sizes.append(size)
            else:  # 비중이 10% 미만인 경우
                others += size

        # "기타" 항목을 리스트에 추가
        if others > 0:
            other_percentage = (others / total) * 100
            labels.append(f"기타 ({other_percentage:.1f}%, {others}건)")
            sizes.append(others)

        plt.subplot(3, (pltcount+2)//3, count)
        plt.bar(labels, sizes, color='red')  # 바 차트 생성

        # 총 데이터 개수를 x축 라벨에 표시
        xlabel = f'{category_name} - {total}건'
        plt.xlabel(xlabel)

        # 최대값 + 10% 정도 여유를 두어 최상위 눈금 설정
        upper_limit = int(max(sizes)*1.1)

        # 강제로 y축 눈금을 정수로 설정
        plt.gca().yaxis.set_major_locator(plt.MaxNLocator(integer=True))

        # y축 범위 설정
        plt.ylim(0, upper_limit)
        count += 1
        return count


    #===========bar=================

    # 바 차트를 위한 셋업
    fig2 = plt.figure(figsize=(10 * pltcount, 10))  # 전체 그림 크기 조절
    count = 1

    # 각 범주별 바 차트 생성
    if 징역:
        count = create_bar_chart(징역, '징역', pltcount, count)
    if 금고:
        count = create_bar_chart(금고, '금고', pltcount, count)
    if 벌금:
        count = create_bar_chart(벌금, '벌금', pltcount, count)
    if 집행유예:
        count = create_bar_chart(집행유예, '집행유예', pltcount, count)
    if 사회봉사:
        count = create_bar_chart(사회봉사, '사회봉사', pltcount, count)
    if 성폭력_치료프로그램:
        count = create_bar_chart(성폭력_치료프로그램, '성폭력 치료프로그램', pltcount, count)
    if 피고인_정보공개:
        count = create_bar_chart(피고인_정보공개, '피고인 정보공개', pltcount, count)
    if 아동_청소년_장애인복지시설_취업제한:
        count = create_bar_chart(아동_청소년_장애인복지시설_취업제한, '아동 청소년 장애인복지시설 취업제한', pltcount, count)
    if 준법운전강의:
        count = create_bar_chart(준법운전강의, '준법운전강의', pltcount, count)

    return fig1,fig2

def model(api_key, data_path, message):
  import matplotlib.pyplot as plt
  message = message
  similar_sentences = get_similar_sentences(api_key, data_path, message)
  sentences = [line for line in similar_sentences['ruling']]
  results = {"results":sentences}
  fig1, fig2 = result(sentences)
  plt.show()
  return json.dumps(results, ensure_ascii=False)

if __name__ == "__main__":
  api_key = 'apikey'
  data_path = "C:/Users/gjaischool/Judi-AI/hh/total_embedding_done.csv"

  try:
   line = sys.stdin.readline()
   request = json.loads(line)['chat']

   # 요청 처리 및 결과 저장
   result_text = chatbot(api_key, request)
   result_model = model(api_key, data_path, result_text)

   # 결과를 클라이언트로 전송
   sys.stdout.write(json.dumps(result_text))
   sys.stdout.flush()
  except Exception as e:
   # 오류 처리
   error_message = {'error':str(e)}
   sys.stderr.write(json.dumps(error_message))
   sys.stderr.flush()

#   results = model(api_key, data_path, result_text)
#   print(results)
