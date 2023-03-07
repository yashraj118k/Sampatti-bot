from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
from chat import get_response
app=Flask(__name__)
CORS(app)

@app.route("/predict")
def index_get():
    return render_template("index.html")

@app.route('/data')
def get_data():
    with open('news_results.json') as f:
        data = json.load(f)
    return jsonify(data)

@app.post("/predict")
def predict():
    text=request.get_json().get("message")
    response=get_response(text)
    message={"answer":response}
    return jsonify(message)

@app.route('/')
def index():
    return render_template('landing.html') # serve the HTML file

@app.route('/recommendation')
def recommendation():
    return render_template('suggest.html')


if __name__=="__main__": 
    app.run(debug=True)