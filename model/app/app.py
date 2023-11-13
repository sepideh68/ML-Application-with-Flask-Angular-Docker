from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import functools

# declare constants
HOST = '0.0.0.0'
PORT = 8081

# initialize flask application
app = Flask(__name__)
CORS(app)

@functools.lru_cache()
def load_model():
    model_path = "model_objects/model.pkl"
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    return model
model = load_model()    
@app.route('/api/predict', methods=['POST'])
def predict():
    X = request.get_json()
    model = load_model()
    df_test = pd.Series(X)
    X_test = df_test.values.reshape(1, -1)
    pred = model.predict(X_test)
    res = {"prediction": int(pred[0])}
    return jsonify(res)
if __name__ == '__main__':
  # run web server
  app.run(host=HOST, port=PORT)