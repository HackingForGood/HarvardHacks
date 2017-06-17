from flask import Flask, render_template, request

from flask_jsglue import JSGlue

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/login/verify", methods=["POST"])
def verify_login():
    pass

@app.route("/students")
def student():
    pass
