import openai
import json
import pandas as pd
openai.api_key='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'

# data = pd.read_csv('', encoding='cp949')   # 사실관계 데이터

# 사실관계 데이터 jsonl 파일로 변환
def to_jsonl(data, data_path, encoding='utf-8'):
    with open(data_path, 'w', encoding=encoding) as f:
        for _, row in data.iterrows():
            json_obj = {
                "messages":[
                    {"role":"system", "content":"너는 고객의 법률 상담을 도와주는 법률 전문가야."},
                    {"role":"user", "content":row['']},
                    {"role":"assistant", "content":row['']}
                ]
            }
            f.write(json.dumps(json_obj, ensure_ascii=False) + '\n')

def chatbot():
    messages = [{"role":"system", "content":"너는 법률 문제에 대해 상담을 진행해주는 변호사야. 지금 나는 너에게 법률 문제에 대해 상담을 받으러 왔고, 내가 처한 상황을 설명할거야. 너는 내가 하는 말에 공감해주면서 사실관계 파악을 위해 부족한 정보가 있다면 하나씩 친절하게 물어볼 수 있어. 사실관계 파악을 위한 충분한 정보가 모였다면, 마지막에는 파악된 정보를 요약해서 알려줘."},]
    while True:
        question = input('질문 : ')
        if question=='break':
            break
        messages.append({"role":"user", "content":question})
        chat = openai.ChatCompletion.create(model="gpt-4", messages=messages)
        reply = chat.choices[0].message.content
        messages.append({"role":"assistant", "content":reply})
        print(f'answer : {reply}\n')
    return messages

output = chatbot()
