import openai
openai.api_key = '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'

openai.FineTuningJob.create(training_file='file-agr7LBKhfGoQRPh3olzhwHga',
                            model='gpt-3.5-turbo', hyperparameters={"n_epochs":4})
