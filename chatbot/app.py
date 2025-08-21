# -*- coding: utf-8 -*

import load_model_training
import conf
from flask_cors import CORS
from flask import Flask, jsonify , make_response
from flask import request
import tensorflow as tf
import json
# import for filtred words
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


# print("Content-type: text/html; charset=utf-8\n")

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


# function filter sentence
def filter_sentens(text):
    text = text.lower()
    text = text.replace("'", " ")
    text = text.replace("-", " ")
    deff = conf.INGONRE_STOP_WORDS
    stopWords = set(stopwords.words('french'))
    stopWords = stopWords - deff
    words = word_tokenize(text)
    wordsFiltered = ""

    for w in words:
        if w not in stopWords:
            wordsFiltered = wordsFiltered + " " + w

    return wordsFiltered.strip()


tf.compat.v1.reset_default_graph()
model = load_model_training.trainer("french")
model.load_pickel_file("models/training_data")
model.load_json_file("data/data.json")
model.set_tags()
model.Build_neural_network()
model.load_our_saved_model("models/model.tflearn")



@app.route('/reply', methods=['POST'])
def get_reply():
    data = request.data
    try:
        data = json.loads(data)
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON data"}), 400
    question = data.get("question")
    question = question.lower()
    if (question != ""):
        question = question.replace("'", " ")
        question = question.replace("-", " ")
        question = question.replace("?", "")
        question = question.replace("ç", "c")
        question = question.replace(",", "")
        question = question.replace("â", "a")
        # filter words
        question = filter_sentens(question)
        #get default response of agebt bot
        response = "pas de réponse"
        reply_0 = model.response(question, show_details=False)
        if (reply_0):
            response = str(reply_0[0])

        response = make_response(jsonify({"message": response}))
        response.headers["Content-Type"] = "application/json; charset=utf-8"
        return response

if __name__ == '__main__':

    app.run(host='0.0.0.0',  debug = True)

