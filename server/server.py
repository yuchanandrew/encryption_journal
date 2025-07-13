from flask import Flask, request, jsonify

import torch
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification

from datasets import load_dataset

app = Flask(__name__)

dataset = load_dataset("go_emotions")
label_names = dataset['train'].features['labels'].feature.names

# print(label_names)

tokenizer = DistilBertTokenizerFast.from_pretrained("./emotions_model")
model = DistilBertForSequenceClassification.from_pretrained("./emotions_model")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data['text']

    batch = tokenizer(text, padding=True, truncation=True, max_length=128, return_tensors="pt")

    model.eval()
    with torch.no_grad():
        outputs = model(**batch)

    logits = outputs.logits
    predicted_class_id = logits.argmax(dim=-1).item()

    prediction_name = label_names[predicted_class_id]

    return jsonify({"emotion": prediction_name})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)