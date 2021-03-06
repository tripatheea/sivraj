import nltk


def get_arguments(domain, intent, words_to_check, speech):

	arguments = []

	if domain == "youtube":
		if intent == "play":
			words = speech.lower().split(" ")
			
			if "play" in speech.lower():
				position = words.index("play")
			elif "listen to" in speech.lower():
				position = words.index("listen") + 1
			elif "listen" in speech.lower():
				position = words.index("listen")	

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
		if intent == "running":
			shuttles = ["campus shuttle", "tech shuttle", "cambridge east", "cambridge west", "boston east", "boston west", "boston all", "cambridge all"]
			for shuttle in shuttles:
				if shuttle.lower() in speech.lower():
					arguments = [shuttle.lower()]
		elif intent == "when":
			arguments = ["boston east"]

	else:
		arguments = []

	return arguments



def get_intent(domain, speech, words_to_check):
	if domain == "youtube":
		if "play" in words_to_check['nouns'] or "play" in words_to_check['verbs'] or "listen" in words_to_check['verbs'] or "listen" in words_to_check['nouns']:
			intent = "play"
		elif "stop" in words_to_check['nouns'] or "stop" in words_to_check['verbs']:
			intent = "stop"
	elif domain == "shuttle":
		if "when" in speech:
			intent = "when"
		else:
			intent = "running"
	elif domain == "lights":
		if "on" in speech:
			intent = "turn_on"
		else:
			intent = "turn_off"
	else:
		intent = None

	return intent


def get_domain(speech, words_to_check):

	shuttles = ["Campus Shuttle", "Tech Shuttle", "Cambridge East", "Cambridge West", "Boston East", "Boston West", "Boston All", "Cambridge All"]

	if "play" in words_to_check['nouns'] or "play" in words_to_check['verbs'] or "listen" in words_to_check['verbs'] or "listen" in words_to_check['nouns']:
		domain = "youtube"
	elif "date" in words_to_check['nouns']:
		domain = "date"
	elif "time" in words_to_check['nouns']:
		domain = "time"
	elif "weather" in words_to_check['nouns'] or "rain" in words_to_check['verbs'] or "sunny" in words_to_check['adverbs'] or "sunny" in words_to_check['adjectives'] or "windy" in words_to_check['adverbs'] or "windy" in words_to_check['adjectives']:
		domain = "weather"
	elif "joke" in words_to_check['nouns'] or ("tell" in words_to_check['nouns'] and ("funny" in words_to_check['adjectives'] or "funny" in words_to_check['nouns'])) or (("make" in words_to_check['nouns'] or "make" in words_to_check['verbs']) and "laugh" in speech):
		domain = "joke"
	elif "time" in words_to_check['nouns']:
		domain ="time"
	# elif "you" in words_to_check['nouns'] and (len(words_to_check['adjectives']) != 0 or len(words_to_check['adverbs']) != 0) and ("me" not in words_to_check['nouns']):
	# 	domain = "compliment"
	elif "shuttle" in words_to_check['nouns'] or "bus" in words_to_check['nouns']:
		domain = "shuttle"
	elif speech == "you're funny":
		domain = "you're funny"
	elif speech == "you're awesome":
		domain = "you're awesome"
	elif speech == "i'm batman":
		domain = "i'm batman"
	elif speech == "hello":
		domain = "hello"
	elif speech == "previous screen":
		domain = "previous screen"
	elif speech == "next screen":
		domain = "next screen"
	elif speech == "close lightbox":
		domain = "close lightbox"
	elif speech == "update":
		domain = "update"
	elif speech == "thank you":
		domain = "thank you"
	elif speech == "you're funny":
		domain = "you're funny"
	elif "lights" in words_to_check['nouns'] or "lamp" in words_to_check['nouns']:
		domain = "lights"
	else:
		domain = None

	for shuttle in shuttles:
		if shuttle.lower() in speech.lower():
			domain = "shuttle"

	
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
		if str(part.strip()) == "NN" or str(part.strip()) == "NNP" or str(part.strip()) == "PRP" or str(part.strip()) == "NNS":
			words_to_check['nouns'].append(word.lower())
		elif str(part.strip()) == "VB":
			words_to_check['verbs'].append(word.lower())
		elif str(part.strip()) == "JJ":
			words_to_check['adjectives'].append(word.lower())
		elif str(part.strip()) == "RB":
			words_to_check['adverbs'].append(word.lower())
		# print word, part


	domain = get_domain(speech, words_to_check)
	intent = get_intent(domain, speech, words_to_check)
	arguments = get_arguments(domain, intent, words_to_check, speech)

	return (domain, intent, arguments)


# print parse_speech("What time is it?")
# print parse_speech("Tell me the time please!")
# print parse_speech("Would you please tell me what time is it?")
# print parse_speech("Someone tell me the goddamn time please!")

# print parse_speech("Please play time of your life!")
# print parse_speech("I want to listen to Style by Taylor Swift!")


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


# print parse_speech("Is Boston West running?")


print parse_speech("Lights on please")