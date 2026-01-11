import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# Define feature and time columns
FEATURE_COLS = ['HUMIDITY', 'WIND_SPEED', 'CLOUD_COVER', 'TEMP']
TIME_COLS = ['YEAR', 'MONTH', 'DAY', 'HOUR']

# --- Load and prepare data ---
def load_and_prepare_data(df, thresholds):
    df.columns = df.columns.str.strip()
    if 'TEMP' not in df.columns:
        raise ValueError("The 'TEMP' column is missing in the data.")

    df['TEMP'] = df['TEMP'] / 10
    df['DATETIME'] = pd.to_datetime(df[TIME_COLS])
    df[FEATURE_COLS + TIME_COLS] = df[FEATURE_COLS + TIME_COLS].apply(pd.to_numeric, errors='coerce')
    df.dropna(subset=FEATURE_COLS + TIME_COLS, inplace=True)

    # Filter data
    filtered_df = df.copy()
    for key, value in thresholds.items():
        filtered_df = filtered_df[filtered_df[key] == value]

    if filtered_df.shape[0] < 2:
        raise ValueError("Not enough data after filtering.")

    delta = np.diff(filtered_df['TEMP'].values)
    X = filtered_df[FEATURE_COLS].iloc[:-1]
    last_row = filtered_df.iloc[-1].copy()

    return df, X, delta, last_row

# --- Build model ---
def build_model(X, y):
    return Pipeline([
        ('scaler', StandardScaler()),
        ('regressor', LinearRegression())
    ]).fit(X, y)

# --- Predict temperature deltas ---
def predict_deltas(model, last_row, df, start_hour, end_hour=23):
    predicted = []
    constant = {
        'HUMIDITY': last_row['HUMIDITY'],
        'WIND_SPEED': last_row['WIND_SPEED'],
        'CLOUD_COVER': last_row['CLOUD_COVER']
    }
    current_input = last_row[FEATURE_COLS].values.reshape(1, -1)
    current_delta = model.predict(current_input)[0]
    predicted.append((start_hour, last_row['TEMP'] + current_delta))

    for hour in range(start_hour + 1, end_hour + 1):
        row = df[(df['YEAR'] == last_row['YEAR']) & (df['MONTH'] == last_row['MONTH']) &
                (df['DAY'] == last_row['DAY']) & (df['HOUR'] == hour)]
        if row.empty:
            continue

        original_temp = row['TEMP'].values[0]
        input_row = pd.DataFrame([{
            'TEMP': original_temp,
            'HUMIDITY': constant['HUMIDITY'],
            'WIND_SPEED': constant['WIND_SPEED'],
            'CLOUD_COVER': constant['CLOUD_COVER']
        }])[FEATURE_COLS]

        pred_delta = model.predict(input_row)[0]
        predicted_temp = original_temp + pred_delta
        predicted.append((hour, predicted_temp))

    return predicted

# --- Plot forecast ---
def plot_forecast(last_row, preds):
    datetimes = [
        last_row['DATETIME'].replace(hour=hour) + pd.Timedelta(hours=(1 if hour != last_row['HOUR'] else 0))
        for hour, _ in preds
    ]
    temps = [t for _, t in preds]

    fig, ax = plt.subplots(figsize=(10, 5))
    ax.plot(datetimes, temps, marker='o', linestyle='-', color='blue')
    ax.set_title("Hourly Temperature Forecast")
    ax.set_xlabel("Datetime")
    ax.set_ylabel("Predicted Temp (°C)")
    plt.xticks(rotation=45)
    plt.grid(True)
    st.pyplot(fig)

# --- Streamlit UI ---
st.set_page_config(page_title="Hourly Temperature Forecast", layout="centered")
st.title("🌡️ Weather Temperature Predictor")

csv_file = st.file_uploader("Upload CSV with weather data", type="csv")

if csv_file:
    try:
        df_preview = pd.read_csv(csv_file)
        st.subheader("📄 Data Preview")
        st.dataframe(df_preview.head())

        with st.expander("🔍 Filter Settings"):
            df_preview.columns = df_preview.columns.str.strip()
            default_month = int(df_preview['MONTH'].dropna().unique()[0])
            default_hour = int(df_preview['HOUR'].dropna().unique()[0])

            month = st.slider("Month", 1, 12, default_month)
            hour = st.slider("Start Hour", 0, 23, default_hour)
            thresholds = {'MONTH': month, 'HOUR': hour}

        if st.button("📈 Predict Temperature"):
            with st.spinner("Training model and predicting..."):
                full_df, X, y, last_row = load_and_prepare_data(df_preview, thresholds)
                model = build_model(X, y)
                predictions = predict_deltas(model, last_row, full_df, int(last_row['HOUR']))

            st.subheader("🧾 Predicted Temperatures")
            for h, t in predictions:
                st.write(f"Hour {h}: {t:.2f} °C")

            st.subheader("📊 Forecast Chart")
            plot_forecast(last_row, predictions)

    except Exception as e:
        st.error(f"❌ Error: {e}")