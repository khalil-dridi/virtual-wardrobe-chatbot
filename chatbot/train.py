# -*- coding: utf-8 -*-
import conf
# things we need for NLP
import nltk
nltk.download('stopwords')
nltk.download('punkt')
from nltk.stem import SnowballStemmer
#stemmer = SnowballStemmer(conf.LANGUAGE)
# things we need for Tensorflow
import numpy as np
import tflearn
import tensorflow as tf
import random
import json
# import for filtred words
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import pickle
import shutil



class EarlyStoppingCallback(tflearn.callbacks.Callback):
    compter = 0
    max = 0

    def __init__(self, val_acc_thresh):
        """ Note: We are free to define our init function however we please. """
        # Store a validation accuracy threshold, which we can compare against
        # the current validation accuracy at, say, each epoch, each batch step, etc.
        self.val_acc_thresh = val_acc_thresh

    def on_epoch_end(self, training_state):
        """
        This is the final method called in trainer.py in the epoch loop.
        We can stop training and leave without losing any information with a simple exception.
        """
        print("Terminating training at the end of epoch", training_state.epoch)
        # raise StopIteration
        if(training_state.acc_value > 0.85):
            raise StopIteration
        if (training_state.epoch == conf.NB_EPOCH):
            raise StopIteration
        if(training_state.epoch <= conf.NB_EPOCH_THRESHOLD and self.max < 0.99):
            if training_state.acc_value >= self.max:
                self.max = training_state.acc_value
        else:
            if training_state.acc_value >= (self.max - 0.01):
                self.compter = self.compter + 1
            else:
                self.compter = 0
            if (self.compter > 1):
                raise StopIteration

    def on_train_end(self, training_state):
        """
        Furthermore, tflearn will then immediately call this method after we terminate training,
        (or when training ends regardless). This would be a good time to store any additional
        information that tflearn doesn't store already.
        """
        print("info:", training_state.acc_value)
        print("max:",self.max)

class training():
    train_x = []
    train_y = []

    # function filter sentence
    def filter_sentens(self, language, text):
        text = text.lower()
        text = text.replace("'", " ")
        text = text.replace("-", " ")
        deff = conf.INGONRE_STOP_WORDS
        stopWords = set(stopwords.words(language))
        stopWords = stopWords - deff
        words = word_tokenize(text)
        wordsFiltered = ""
        for w in words:
            if w not in stopWords:
                wordsFiltered = wordsFiltered + " " + w
        return wordsFiltered.strip()

    def prepare_data_trainer(self, language):
        # import our chat-bot intents file
        with open("data/data.json") as json_data:
            intents = json.load(json_data)
        words = []
        classes = []
        documents = []
        ignore_words = ['?' ,'؟' ,'!' ,'.', '،', '؛']
        tags = intents.keys()
        for t in tags:
            for intent in intents[t]:
                for pattern in intent['patterns']:
                    # tokenize each word in the sentence
                    pattern = str(pattern).replace("-", " ")
                    pattern = str(pattern).replace("ç", "c")
                    pattern = str(pattern).replace(",", "")
                    pattern = str(pattern).replace("â", "a")
                    print(pattern)
                    # filter words of stop_words
                    pattern = self.filter_sentens(language,pattern)
                    print("filter: ",pattern)
                    w = nltk.word_tokenize(pattern)
                    # add to our words list
                    words.extend(w)
                    #print("words: ", words)
                    # add to documents in our corpus
                    if(w):
                        documents.append((w, intent['tag']))
                    # add to our classes list
                    if intent['tag'] not in classes:
                        classes.append(intent['tag'])

        # stem and lower each word and remove duplicates
        stemmer = SnowballStemmer(language)
        words = [stemmer.stem(w.lower()) for w in words if w not in ignore_words]
        words = sorted(list(set(words)))

        # remove duplicates
        classes = sorted(list(set(classes)))

        # create our training data
        training = []
        output = []
        # create an empty array for our output
        output_empty = [0] * len(classes)

        # training set, bag of words for each sentence
        for doc in documents:
            # initialize our bag of words
            bag = []
            # list of tokenized words for the pattern
            pattern_words = doc[0]
            # stem each word
            pattern_words = [stemmer.stem(word.lower()) for word in pattern_words]
            # create our bag of words array
            for w in words:
                bag.append(1) if w in pattern_words else bag.append(0)

            # output is a '0' for each tag and '1' for current tag
            output_row = list(output_empty)
            output_row[classes.index(doc[1])] = 1

            training.append([bag, output_row])

        # shuffle our features and turn into np.array
        random.shuffle(training)
        training = np.array(training)
        # create train and test lists
        train_x = list(training[:, 0])
        train_y = list(training[:, 1])
        # reset underlying graph data
        tf.compat.v1.reset_default_graph()
        # Build neural network
        net = tflearn.input_data(shape=[None, len(train_x[0])])
        net = tflearn.fully_connected(net, conf.NB_NEURONS)
        net = tflearn.fully_connected(net, conf.NB_NEURONS)
        net = tflearn.fully_connected(net, len(train_y[0]), activation='softmax')
        net = tflearn.regression(net)
        # Define model and setup tensorboard
        model = tflearn.DNN(net,tensorboard_dir='models/tflearn_logs',tensorboard_verbose=0)

        early_stopping_cb = EarlyStoppingCallback(val_acc_thresh=0.1)
        try:
            model.fit(train_x, train_y, n_epoch=conf.NB_EPOCH, batch_size=conf.BATCH_SIZE, show_metric=True,callbacks=early_stopping_cb)
        except StopIteration:
            model.save('models/model.tflearn')
            pickle.dump({'words': words, 'classes': classes, 'train_x': train_x, 'train_y': train_y}, open("models/training_data",
                "wb"))
            shutil.rmtree('models/tflearn_logs')


training().prepare_data_trainer('french')

