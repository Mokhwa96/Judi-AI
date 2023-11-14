import openai
import pandas as pd

# api_key='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'

def chatbot(api_key):
    openai.api_key=api_key
    
    messages = [{"role":"system", "content":"너는 법률 문제에 대해 상담을 진행해주는 변호사야. 지금 나는 너에게 법률 문제에 대해 상담을 받으러 왔고, 내가 처한 상황을 설명할거야. 너는 내가 하는 말에 공감해주면서 사실관계 파악을 위해 부족한 정보가 있다면 하나씩 친절하게 물어볼 수 있어. 사실관계 파악을 위한 충분한 정보가 모였다면, 마지막에는 파악된 정보를 요약해서 알려줘"},]
    while True:
        question = input('질문 : ')
        if question=='break':
            last_content = messages[-1]["content"]
            chat = openai.ChatCompletion.create(model="gpt-4", messages=[{"role":"user" , "content": last_content + "\n위 글을\n" + "피해자 B과 피고인 A은 과거 연인 사이였다. 피고인은 위 2021. 3. 7. 03:00경에서 같은 날 04:30경 사이 광주 서구 C, 3층에 있는 D주점 내 불상의 방에서 피해자 B이 자신을 폭행하였다는 이유로 피해자의 머리채를 잡아 바닥에 밀쳐놓고 피해자의 얼굴과 머리, 팔, 어깨 등을 손으로 수회 때리거나 발로 밟아 폭행하고, 다른 방으로 도망한 피해자를 찾아가 또다시 주먹으로 피해자의 얼굴을 2회 때리고 7~8회 가량 침을 뱉고 생수를 머리에 붓는 등 폭행하였다. 이로써 피고인은 피해자를 폭행하여 우측 후이개, 하악, 협부의 부종과 잠깐의 의식소실 및 후두부 타박으로 인한 압통 등 약 2주간의 치료를 필요로 하는 상해를 가하였다." + "\n와 같은 형식으로 바꿔줘"}])
            last_paragraph = chat.choices[0].message.content
            print(last_paragraph)
            break
        messages.append({"role":"user", "content":question})
        chat = openai.ChatCompletion.create(model="gpt-4", messages=messages)
        reply = chat.choices[0].message.content
        messages.append({"role":"assistant", "content":reply})
        print(f'answer : {reply}\n')
    print
    return last_paragraph

# output = chatbot(api_key)