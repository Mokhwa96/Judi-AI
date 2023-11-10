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
        speaking_rate=1
    )

    response = client.synthesize_speech(
        request={"input": input_text, "voice": voice, "audio_config": audio_config}
    )

    # The response's audio_content is binary.
    with open(filename, "wb") as out:
        out.write(response.audio_content)
        print(f'Audio content written to file {filename}')

input_text = "네, 정말 힘드셨겠어요. 걱정 마세요! 이제 Judi AI가 도와드릴게요!"
google_tts(input_text, "hello.mp3")
playsound("hello.mp3")
