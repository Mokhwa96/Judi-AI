import openai
import pandas as pd
openai.api_key = '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'

data = pd.read_csv('ljp_criminal_validation.csv', encoding='utf-8')
question = data['facts'][21]

completion = openai.ChatCompletion.create(
    model = "ft:gpt-3.5-turbo-0613:personal::8Hjgk8fM",
    messages=[
        {"role":"system", "content":"너는 법률 문제에 대해 상담을 진행해주는 변호사야. 지금 나는 너에게 내가 겪는 법률 문제 상황을 얘기해 줄거야. 너는 내가 설명하는 상황을 듣고, 거기에 대한 판결 결과를 얘기해 주면 돼."},
        {"role":"user", "content":question}
    ]
)
answer = completion.choices[0].message
print(f"answer : {data['ruling'][21]}")
print(f"응답 : {answer['content']}")
