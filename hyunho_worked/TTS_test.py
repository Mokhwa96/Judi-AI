"""Synthesizes speech from the input string of text."""
from google.cloud import texttospeech
from playsound import playsound

def google_tts(text, filename):
    client = texttospeech.TextToSpeechClient()

    input_text = texttospeech.SynthesisInput(text=text)

    # Note: the voice can also be specified by name.
    # Names of voices can be retrieved with client.list_voices().
    voice = texttospeech.VoiceSelectionParams(
        language_code="ko-KR",
        name="ko-KR-Wavenet-B",
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE,
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        pitch=0.4,
        speaking_rate=1.1
    )

    response = client.synthesize_speech(
        request={"input": input_text, "voice": voice, "audio_config": audio_config}
    )
    print(response)
    print(type(response))

    # The response's audio_content is binary.
    with open(filename, "wb") as out:
        out.write(response.audio_content)
        print(f'Audio content written to file {filename}')

# input_text = "안녕하세요, 어떤 도움이 필요하신가요?"
input_text = "간편한 법률 상담, Judi와 함께!"
google_tts(input_text, "answer.mp3")
# playsound("answer.mp3")
