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

def model():

    while True:
        input_text = input('<질문하세요>')
        if input_text == 'break':
            print('<질문종료중>')
            print(chatbot(api_key=api_key, input_text='break'))
            casename_find(messages[-1]['content'])
            print('<유사도 확인중>')
            break
        else:
            print('<답변중>')
            print(chatbot(api_key=api_key, input_text=input_text))


    similar_sentences = get_similar_sentences(api_key = api_key, data_path=data_path, input_sentence=messages[-1]['content'])

    print('<그래프생성중>')
    graph(similar_sentences['ruling'])

    return print('<END>')

    # similar_sentences = get_similar_sentences(api_key, data_path, result_text)
    # sentences = [line for line in similar_sentences['ruling']]
    # results = {"results":sentences}
    # return json.dumps(results, ensure_ascii=False)





def graph(top_similar_sentence):

    import matplotlib.pyplot as plt
    import re
    import matplotlib.font_manager as fm

    # 로컬실행 그래프 한글폰트설정

    font_path = 'C:/Windows/Fonts/malgun.ttf'
    font_name = fm.FontProperties(fname=font_path).get_name()
    plt.rc('font', family=font_name)

    벌금 = {}
    성폭력_치료프로그램 = {}
    피고인_정보공개 = {}
    아동_청소년_장애인복지시설_취업제한 = {}
    소송비용부담 = {}
    징역 = {}
    집행유예 = {}
    사회봉사 = {}
    준법운전강의 = {}

    for text in top_similar_sentence:
        text = text.replace('0.', 'x')
        text = text.replace('1.', 'x')
        text = text.replace('2.', 'x')
        text = text.replace('3.', 'x')
        text = text.replace('4.', 'x')
        text = text.replace('5.', 'x')
        text = text.replace('6.', 'x')
        text = text.replace('7.', 'x')
        text = text.replace('8.', 'x')
        text = text.replace('9.', 'x')
        text_list = text.split('. ')

        for i in text_list:
            if '피고인을 벌금' in i:
                pattern = r'벌금 (.*?)에 처한다'
                if bool(re.search(pattern, i)):
                    money = re.search(pattern, i).group(1).replace(',','').replace(' ','').replace('(백만)','')

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

            if '성폭력' in i:
                pattern = r'(\d+시간)의 성폭력'
                if bool(re.search(pattern, i)):
                    if re.search(pattern, i).group(1) in 성폭력_치료프로그램:
                        성폭력_치료프로그램[re.search(pattern, i).group(1)] += 1
                    else:
                        성폭력_치료프로그램[re.search(pattern, i).group(1)] = 1

            if '피고인에 대한 정보' in i:
                pattern = r'\d+년'
                if bool(re.findall(pattern, i)):
                    if re.findall(pattern, i)[0] in 피고인_정보공개:
                        피고인_정보공개[re.findall(pattern, i)[0]] += 1
                    else:
                        피고인_정보공개[re.findall(pattern, i)[0]] = 1

            if '청소년 관련기관' in i:
                pattern = r'\d+년'
                if bool(re.findall(pattern, i)):
                    if re.findall(pattern, i)[0] in 아동_청소년_장애인복지시설_취업제한:
                        아동_청소년_장애인복지시설_취업제한[re.findall(pattern, i)[0]] += 1
                    else:
                        아동_청소년_장애인복지시설_취업제한[re.findall(pattern, i)[0]] = 1

            if '소송비용' in i:
                if '증인' in i:
                    if '증인비용부담' in 소송비용부담:
                        소송비용부담['증인비용부담'] += 1
                    else:
                        소송비용부담['증인비용부담'] = 1
                else:
                    if '소송비용전체부담' in 소송비용부담:
                        소송비용부담['소송비용전체부담'] += 1
                    else:
                        소송비용부담['소송비용전체부담'] = 1

            if '징역' in i:
                pattern = f'징역 (.*?)에'
                if bool(re.search(pattern, i)):
                    if re.search(pattern, i).group(1).replace('개','') in 징역:
                        징역[re.search(pattern, i).group(1).replace('개','')] += 1
                    else:
                        징역[re.search(pattern, i).group(1).replace('개','')] = 1

            if '유예' in i:
                pattern = f'(\d+년)간 위 형의 집행을 유예한다'
                if bool(re.search(pattern, i)):
                    if re.search(pattern, i).group(1) in 집행유예:
                        집행유예[re.search(pattern, i).group(1)] += 1
                    else:
                        집행유예[re.search(pattern, i).group(1)] = 1
                pattern1 = f'선고를 유예한다'
                if bool(re.search(pattern1, i)):
                    if '선고유예' in 집행유예:
                        집행유예['선고유예'] += 1
                    else:
                        집행유예['선고유예'] = 1

            if '사회봉사' in i:
                pattern = '(\d+시간)의 사회봉사'
                if bool(re.search(pattern, i)):
                    if re.search(pattern, i).group(1) in 사회봉사:
                        사회봉사[re.search(pattern, i).group(1)] += 1
                    else:
                        사회봉사[re.search(pattern, i).group(1)] = 1

            if '준법운전강의' in i:
                pattern = '(\d+시간)의 준법운전강의'
                if bool(re.search(pattern, i)):
                    if re.search(pattern, i).group(1) in 준법운전강의:
                        준법운전강의[re.search(pattern, i).group(1)] += 1
                    else:
                        준법운전강의[re.search(pattern, i).group(1)] = 1




    벌금 = dict(sorted(벌금.items(), key=lambda x:x[1], reverse=True))
    성폭력_치료프로그램 = dict(sorted(성폭력_치료프로그램.items(), key=lambda x:x[1], reverse=True))
    피고인_정보공개 = dict(sorted(피고인_정보공개.items(), key=lambda x:x[1], reverse=True))
    아동_청소년_장애인복지시설_취업제한 = dict(sorted(아동_청소년_장애인복지시설_취업제한.items(), key=lambda x:x[1], reverse=True))
    소송비용부담 = dict(sorted(소송비용부담.items(), key=lambda x:x[1], reverse=True))
    징역 = dict(sorted(징역.items(), key=lambda x:x[1], reverse=True))
    집행유예 = dict(sorted(집행유예.items(), key=lambda x:x[1], reverse=True))
    사회봉사 = dict(sorted(사회봉사.items(), key=lambda x:x[1], reverse=True))
    준법운전강의 = dict(sorted(준법운전강의.items(), key=lambda x:x[1], reverse=True))



    pltcount = bool(벌금)+bool(성폭력_치료프로그램)+bool(피고인_정보공개)+bool(소송비용부담)+bool(징역)+bool(집행유예)+bool(사회봉사)+bool(준법운전강의)

    count = 1

		#=========pie=========

    if bool(벌금):
        plt.subplot(2,pltcount,count)
        plt.pie(벌금.values(), labels=벌금.keys())
        plt.xlabel('벌금')
        plt.axis=('equal')
        count += 1

    if bool(성폭력_치료프로그램):
        plt.subplot(2, pltcount, count)
        plt.pie(성폭력_치료프로그램.values(), labels=성폭력_치료프로그램.keys())
        plt.xlabel('성폭력_치료프로그램')
        plt.axis = ('equal')
        count += 1

    if bool(피고인_정보공개):
        plt.subplot(2, pltcount, count)
        plt.pie(피고인_정보공개.values(), labels=피고인_정보공개.keys())
        plt.xlabel('피고인_정보공개')
        plt.axis = ('equal')
        count += 1

    if bool(소송비용부담):
        plt.subplot(2, pltcount, count)
        plt.pie(소송비용부담.values(), labels=소송비용부담.keys())
        plt.xlabel('소송비용부담')
        plt.axis = ('equal')
        count += 1

    if bool(징역):
        plt.subplot(2, pltcount, count)
        plt.pie(징역.values(), labels=징역.keys())
        plt.xlabel('징역')
        plt.axis = ('equal')
        count += 1

    if bool(집행유예):
        plt.subplot(2, pltcount, count)
        plt.pie(집행유예.values(), labels=집행유예.keys())
        plt.xlabel('집행유예')
        plt.axis = ('equal')
        count += 1

    if bool(사회봉사):
        plt.subplot(2, pltcount, count)
        plt.pie(사회봉사.values(), labels=사회봉사.keys())
        plt.xlabel('사회봉사')
        plt.axis = ('equal')
        count += 1

    if bool(준법운전강의):
        plt.subplot(2, pltcount, count)
        plt.pie(준법운전강의.values(), labels=준법운전강의.keys())
        plt.xlabel('준법운전강의')
        plt.axis = ('equal')
        count += 1


    #===========bar=================


    if bool(벌금):
        plt.subplot(2, pltcount, count)
        plt.bar(벌금.keys(), 벌금.values(), color='red')
        plt.xlabel('벌금')
        plt.ylim(0, len(top_similar_sentence))
        count += 1

    if bool(성폭력_치료프로그램):
        plt.subplot(2, pltcount, count)
        plt.bar(성폭력_치료프로그램.keys(), 성폭력_치료프로그램.values(), color='red')
        plt.xlabel('성폭력_치료프로그램')
        plt.ylim(0, len(top_similar_sentence))
        count += 1


    if bool(피고인_정보공개):
        plt.subplot(2, pltcount, count)
        plt.bar(피고인_정보공개.keys(), 피고인_정보공개.values(), color='red')
        plt.xlabel('피고인_정보공개')
        plt.ylim(0, len(top_similar_sentence))
        count += 1

    if bool(소송비용부담):
        plt.subplot(2, pltcount, count)
        plt.bar(소송비용부담.keys(), 소송비용부담.values(), color='red')
        plt.xlabel('소송비용부담')
        plt.ylim(0, len(top_similar_sentence))
        count += 1


    if bool(징역):
        plt.subplot(2, pltcount, count)
        plt.bar(징역.keys(), 징역.values(), color='red')
        plt.xlabel('징역')
        plt.ylim(0, len(top_similar_sentence))
        count += 1

    if bool(집행유예):
        plt.subplot(2, pltcount, count)
        plt.bar(집행유예.keys(), 집행유예.values(), color='red')
        plt.xlabel('집행유예')
        plt.ylim(0, len(top_similar_sentence))
        count += 1


    if bool(사회봉사):
        plt.subplot(2, pltcount, count)
        plt.bar(사회봉사.keys(), 사회봉사.values(), color='red')
        plt.xlabel('사회봉사')
        plt.ylim(0, len(top_similar_sentence))
        count += 1

    if bool(준법운전강의):
        plt.subplot(2, pltcount, count)
        plt.bar(준법운전강의.keys(), 준법운전강의.values(), color='red')
        plt.xlabel('준법운전강의')
        plt.ylim(0, len(top_similar_sentence))
        count += 1


    plt.show()








model()

