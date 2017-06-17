from flask import Flask, jsonify, render_template, request, session

from flask_jsglue import JSGlue
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Hp3n>3N2qZ;TmUQYLj3@n28wCotC3,9dMbWnh6>8zvN,'
JSGlue(app)
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login/")
def login():
    return render_template("login.html")

@app.route("/login/verify", methods=["POST"])
def verify_login():
    # TODO: add verification
    return "done"

@app.route("/teachers/")
def teachers():
    return render_template("teachers.html")

@app.route("/teachers/config")
def teacher_config():
    return render_template("teacher/config.html")

@app.route("/students")
def student():
    return render_template("student/index.html")

@app.route("/students/no/")
def student_no():
    # TODO: localize to a specific class
    socketio.emit('no', {'data': 'none'})
    return jsonify({'success': True})

@app.route("/students/yes/")
def student_yes():
    # TODO: localize to a specific class
    socketio.emit('yes', {'data': 'none'})
    return jsonify({'success': True})
