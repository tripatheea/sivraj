from flask import Flask
from flask import request

import nltk
import sivraj_nlp

import json
import urllib2
import requests

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


@app.route("/joke")
def joke():
	url = "http://tambal.azurewebsites.net/joke/random"
	response =  urllib2.urlopen(url)
	return response.read()

@app.route("/lights_status")
def lights_status():
	url = "http://explrr.com/topi/status"
	response = urllib2.urlopen(url)
	return response.read()

@app.route("/update_lights", methods=['POST'])
def update_lights():
	
	if request.method == 'POST':
		if request.form['status']:
			status = int(request.form['status'])

			url = "http://explrr.com/topi/update/index.php"

			
			data = dict(status=status)

			print status

			r = requests.post(url, data=data, allow_redirects=True)
			# print r.content

	
	return "hey"



if __name__ == "__main__":
    app.run()