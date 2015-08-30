from flask import Flask
from flask import request

import nltk
import sivraj_nlp


import json

app = Flask(__name__)

app.debug = True


@app.route("/")
def hello():
    return "Hey buddy!"



@app.route('/nlp', methods=['POST'])
def nlp():
	if request.method == 'POST':
		if request.form['speech']:
			processed_speech = sivraj_nlp.parse_speech(str(request.form['speech']))
			return json.dumps(processed_speech)

	return "error"


if __name__ == "__main__":
    app.run()