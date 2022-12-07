from flask import Flask, render_template, request


# ===============================================
# app.py
# ------------
# reads json data to send to viewer
# ===============================================

app = Flask(__name__, static_folder='./static', template_folder='./static')


@app.route('/')
def homepage():
    return render_template('index.html')

# backend function and connect to api
# switching to temp branch



