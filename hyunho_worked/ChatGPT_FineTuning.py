import openai
openai.api_key='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'

path = 'C:/Users/gh576/OneDrive/바탕 화면/JudiAI/'
openai.File.create(
    file=open(path+'ljp_criminal_train.jsonl', 'rb'),
    purpose='fine-tune'
)
