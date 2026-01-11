import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import pickle
import os

# Load data
df = pd.read_csv('_temperature_data.txt', sep=r'\s+')

# Prepare data
df['TEMP'] = df['TEMP'] / 10  # Adjust as per utils.py

# Features and target
X = df[['MONTH', 'HOUR']]
y = df['TEMP']

# Build model
model = Pipeline([
    ('scaler', StandardScaler()),
    ('regressor', LinearRegression())
])
model.fit(X, y)

# Save model
model_path = os.path.join('temp', 'predictor', 'model.pkl')
os.makedirs(os.path.dirname(model_path), exist_ok=True)
with open(model_path, 'wb') as f:
    pickle.dump(model, f)

print("Model trained and saved to", model_path)