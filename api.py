from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model_path = os.path.join('temp', 'predictor', 'model.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        month = int(data['month'])
        hour = int(data['hour'])

        # Predict temperature
        input_data = pd.DataFrame([[month, hour]], columns=['MONTH', 'HOUR'])
        predicted_temp = model.predict(input_data)[0]
        # Since TEMP was divided by 10 in training, multiply back
        predicted_temp *= 10

        return jsonify({'predicted_temperature': round(predicted_temp, 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
