
import nltk


def get_arguments(domain, intent, words_to_check, speech):

	arguments = []

	if domain == "youtube":
		print intent
		if intent == "play":
			words = speech.split(" ")
			position = words.index("play")
			thing_to_play = ""
			i = position 
			for x in words[position + 1:]:
				if not (x.lower().strip() == "please" and i + 1 == len(words[position + 1:])):
					thing_to_play += x + " "
				i += 1
			arguments = [thing_to_play.strip()]

	elif domain == "weather":
		if "today" in speech or "now" in speech:
			arguments = ["now"]
		elif "tomorrow" in speech and "day after tomorrow" not in speech:
			arguments = ["tomorrow"]
		elif "day after tomorrow" in speech:
			arguments = ["day after tomorrow"]
		else:
			days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
			for day in days:
				if day in speech.lower():
					arguments = [day]
	elif domain == "shuttle":
		if "intent" == "running":
			shuttles = ["Campus", "Tech Shuttle", "Cambridge East", "Cambridge West", "Boston East"]
			for shuttle in shuttles:
				if shuttle.lower() in speech.lower():
					arguments = [shuttle.lower()]
		elif "intent" == "when":
			arguments = ["boston east"]

	else:
		arguments = []

	return arguments



def get_intent(domain, words_to_check):
	if domain == "youtube":
		if "play" in words_to_check['nouns'] or "play" in words_to_check['verbs'] or "listen" in words_to_check['verbs'] or "listen" in words_to_check['nouns']:
			intent = "play"
		elif "stop" in words_to_check['nouns'] or "stop" in words_to_check['verbs']:
			intent = "stop"
	elif domain == "shuttle":
		if "running" in speech or "operating" in speech:
			intent = "running"
		else:
			intent = "when"
	else:
		intent = None

	return intent


def get_domain(speech, words_to_check):

	if "play" in words_to_check['nouns'] or "play" in words_to_check['verbs'] or "listen" in words_to_check['verbs'] or "listen" in words_to_check['nouns']:
		domain = "youtube"
	elif "date" in words_to_check['nouns']:
		domain = "date"
	elif "time" in words_to_check['nouns']:
		domain = "time"
	elif "weather" in words_to_check['nouns'] or "rain" in words_to_check['verbs'] or "sunny" in words_to_check['adverbs'] or "sunny" in words_to_check['adjectives'] or "windy" in words_to_check['adverbs'] or "windy" in words_to_check['adjectives']:
		domain = "weather"
	elif "joke" in words_to_check['nouns'] or ("tell" in words_to_check['nouns'] and ("funny" in words_to_check['adjectives'] or "funny" in words_to_check['nouns'])) or ("make" in words_to_check['nouns'] and "laugh" in speech):
		domain = "joke"
	elif "time" in words_to_check['nouns']:
		domain ="time"
	elif "you" in words_to_check['nouns'] and (len(words_to_check['adjectives']) != 0 or len(words_to_check['adverbs']) != 0) and ("me" not in words_to_check['nouns']):
		domain = "compliment"
	elif "shuttle" in words_to_check['nouns'] or "bus" in words_to_check['nouns']:
		domain = "shuttle"
	else:
		domain = None

	
	return domain


def parse_speech(speech):
	
	tokens = nltk.word_tokenize(speech)

	words_to_check = {}
	words_to_check['nouns'] = []
	words_to_check['verbs'] = []
	words_to_check['adverbs'] = []
	words_to_check['adjectives'] = []
	
	# print  nltk.help.upenn_tagset('IN')

	for word, part in nltk.pos_tag(tokens):
		if str(part.strip()) == "NN" or str(part.strip()) == "NNP" or str(part.strip()) == "PRP":
			words_to_check['nouns'].append(word.lower())
		elif str(part.strip()) == "VB":
			words_to_check['verbs'].append(word.lower())
		elif str(part.strip()) == "JJ":
			words_to_check['adjectives'].append(word.lower())
		elif str(part.strip()) == "RB":
			words_to_check['adverbs'].append(word.lower())
		# print word, part


	domain = get_domain(speech, words_to_check)
	intent = get_intent(domain, words_to_check)
	arguments = get_arguments(domain, intent, words_to_check, speech)

	return (domain, intent, arguments)


# print parse_speech("What time is it?")
# print parse_speech("Tell me the time please!")
# print parse_speech("Would you please tell me what time is it?")
# print parse_speech("Someone tell me the goddamn time please!")

# print parse_speech("Please play time of your life!")


# print parse_speech("What is the weather like?")
# print parse_speech("Tell me about the weather!")
# print parse_speech("Is it going to rain today?")
# print parse_speech("Is it going to be windy outside?")
# print parse_speech("Is it windy outside?")
# print parse_speech("Is it sunny outside?")
# print parse_speech("Is it going to rain Sunday!")

# print parse_speech("Tell me a joke!")
# print parse_speech("Tell me something funny!")
# print parse_speech("Make me laugh")

# print parse_speech("You are funny!")
# print parse_speech("You are awesome!")


# print parse_speech("play travelling solider please")


