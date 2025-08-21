# -*- coding: utf-8 -*

# import for chatbot
# things we need for NLP
import nltk
from nltk.stem import SnowballStemmer
#stemmer = SnowballStemmer(conf.LANGUAGE)
# things we need for Tensorflow
import numpy as np
import tflearn
import random
# restore all of our data structures
import pickle
import json
import conf


class trainer():

    words = []
    classes = []
    train_x = []
    train_y = []
    intents = {}
    tags = ()
    model = None
    context = {}
    session = {}
    ERROR_THRESHOLD = conf.ERROR_THRESHOLD
    language=""

    def __init__(self,language):
        self.language=language

    def load_pickel_file(self,file):
        data = pickle.load(open(file, "rb"))
        self.words = data['words']
        self.classes = data['classes']
        self.train_x = data['train_x']
        self.train_y = data['train_y']


    def load_json_file(self,file):
        with open(file) as json_data:
            self.intents = json.load(json_data)

    def set_tags(self):
        self.tags=self.intents.keys()

    def Build_neural_network(self):
        net = tflearn.input_data(shape=[None, len(self.train_x[0])])
        net = tflearn.fully_connected(net, conf.NB_NEURONS)
        net = tflearn.fully_connected(net, conf.NB_NEURONS)
        net = tflearn.fully_connected(net, len(self.train_y[0]), activation='softmax')
        net = tflearn.regression(net)
        self.model = tflearn.DNN(net)

    def clean_up_sentence(self,sentence):
        # tokenize the pattern
        sentence_words = nltk.word_tokenize(sentence)
        # stem each word
        stemmer = SnowballStemmer(self.language)
        sentence_words = [stemmer.stem(word.lower()) for word in sentence_words]
        return sentence_words

    # return bag of words array: 0 or 1 for each word in the bag that exists in the sentence
    def bow(self,sentence, words, show_details=False):
        # tokenize the pattern
        sentence_words = self.clean_up_sentence(sentence)
        # bag of words
        bag = [0] * len(words)
        for s in sentence_words:
            for i, w in enumerate(words):
                if w == s:
                    bag[i] = 1
                    if show_details:
                        print("found in bag: %s" % w)

        return (np.array(bag))

    def load_our_saved_model(self,file):
        self.model.load(file)

    def classify(self,sentence):
        return_list = []
        if not (1 in self.bow(sentence, self.words)):
            return return_list

        # ERROR_THRESHOLD=max(self.model.predict([self.bow("azdjrhjhfgrj45erjer87grgrencfeyfdhgffgfj", self.words)])[0])
        # generate probabilities from the model
        results = self.model.predict([self.bow(sentence, self.words)])[0]
        print("resultats=", results)
        # filter out predictions below a threshold
        results = [[i, r] for i, r in enumerate(results) if r > (self.ERROR_THRESHOLD)]
        # sort by strength of probability
        results.sort(key=lambda x: x[1], reverse=True)

        for r in results:
            return_list.append((self.classes[r[0]], r[1]))
        # return tuple of intent and probability
        print("listprob: ",return_list)
        return return_list

    def response(self,sentence, show_details=False):
        results = self.classify(sentence)
        # if we have a classification then find the matching intent tag
        if results:
            # loop as long as there are matches to process
            while results:
                for t in self.tags:
                    for i in self.intents[t]:
                        # find a tag matching the first result
                        if i['tag'] == results[0][0]:
                            probability = results[0][1]
                            # check if this intent is contextual and applies to this user's conversation
                            if not 'context_filter' in i :
                                if show_details: print('tag:', i['tag'])
                                # a random response from the intent
                                msg = random.choice(i['responses'])
                                tag = i['tag']

                                return msg, tag, probability

                results.pop(0)



