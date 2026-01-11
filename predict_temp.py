import pandas as pd
import pickle
import os

# Load the trained model
model_path = os.path.join('temp', 'predictor', 'model.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

def predict_temperature(month, hour):
    """
    Predict temperature based on month and hour.
    """
    input_data = pd.DataFrame([[month, hour]], columns=['MONTH', 'HOUR'])
    predicted_temp = model.predict(input_data)[0]
    # Since TEMP was divided by 10 in training, multiply back
    return predicted_temp * 10

if __name__ == "__main__":
    # Example usage
    month = int(input("Enter month (1-12): "))
    hour = int(input("Enter hour (0-23): "))
    temp = predict_temperature(month, hour)
    print(f"Predicted temperature for month {month}, hour {hour}: {temp:.2f}°C")
