import json
import pandas as pd

data = pd.read_csv('ljp_criminal_train.csv', encoding='utf-8')   # 사실관계 데이터
data = data.iloc[:100]
data_path = 'C:/Users/gh576/OneDrive/바탕 화면/JudiAI/'

# 사실관계 데이터 jsonl 파일로 변환
def to_jsonl(data, data_path, encoding='utf-8'):
    with open(data_path, 'w', encoding=encoding) as f:
        for _, row in data.iterrows():
            json_obj = {
                "messages":[
                    {"role":"system", "content":"너는 법률 문제에 대해 상담을 진행해주는 변호사야. 지금 나는 너에게 내가 겪는 법률 문제 상황을 얘기해 줄거야. 너는 내가 설명하는 상황을 듣고, 거기에 대한 판결 결과를 얘기해 주면 돼."},
                    {"role":"user", "content":row['facts']},
                    {"role":"assistant", "content":row['ruling']}
                ]
            }
            f.write(json.dumps(json_obj, ensure_ascii=False) + '\n')

to_jsonl(data, data_path+'ljp_criminal_train.jsonl')
