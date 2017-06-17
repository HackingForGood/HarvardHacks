from flask import Flask, render_template, request

from flask_jsglue import JSGlue

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Hp3n>3N2qZ;TmUQYLj3@n28wCotC3,9dMbWnh6>8zvN,'
JSGlue(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login/")
def login():
    return render_template("login.html")

@app.route("/login/verify", methods=["POST"])
def verify_login():
    # TODO: add verification
    return True

@app.route("/teachers/config")
def teacher_config():
    return render_template("teacher/config.html")

@app.route("/students")
def student():
    return render_template("student/index.html")

# @app.route("/students/feedback")
# def studentFeedback():
#     return render_template("student/feedback.html")
