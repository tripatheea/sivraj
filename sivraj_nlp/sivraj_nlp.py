from flask import Flask
from flask import request

import nltk
import nlp_sivraj


import json

app = Flask(__name__)

app.debug = True


@app.route("/")
def hello():
    return "Hey buddy!"



@app.route('/nlp')
def nlp():
	
	if request.method == 'GET':
		if request.args.get('speech'):
			processed_speech = nlp_sivraj.parse_speech(str(request.args.get('speech')))
			return json.dumps(processed_speech)
	return "error"


if __name__ == "__main__":
    app.run()