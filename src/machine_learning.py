import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# -------------------------
# 1. PREPROCESAMIENTO
# -------------------------
def preprocess(df):
    df = df.copy()

    df["tipo_envio"] = df["tipo_envio"].map({"normal": 0, "express": 1})
    df["fragil"] = df["fragil"].astype(int)
    df["frio"] = df["frio"].astype(int)

    df = pd.get_dummies(df, columns=["ventana_horaria"])

    return df

# -------------------------
# 2. ENTRENAMIENTO
# -------------------------
df = pd.read_json("src/dataset_entrenamiento.json")
df = preprocess(df)

X = df.drop("prioridad", axis=1)
y = df["prioridad"]

columnas_modelo = X.columns

model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42
)

model.fit(X, y)

# -------------------------
# 3. PREDICCION
# -------------------------
df_new = pd.read_json("src/envios_prueba_ia.json")
df_new = preprocess(df_new)

# Asegurar mismas columnas que el entrenamiento
df_new = df_new.reindex(columns=columnas_modelo, fill_value=0)

predicciones = model.predict(df_new)
probabilidades = model.predict_proba(df_new)

# -------------------------
# 4. MOSTRAR RESULTADOS
# -------------------------
orden = ["Alta", "Media", "Baja"]

for i, pred in enumerate(predicciones):

    # convertir a dict
    probs_dict = dict(zip(model.classes_, probabilidades[i]))

    # ordenar + convertir a float + redondear
    probs = {
        k: round(float(probs_dict.get(k, 0)), 2)
        for k in orden
    }

    print(f"\nEnvío {i+1}:")
    print(f"Prioridad: {pred}")
    print(f"Probabilidades: {probs}")