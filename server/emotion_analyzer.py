from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

model_name = "distilbert-base-uncased-finetuned-sst-2-english"

model = AutoModelForSequenceClassification.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

classifier = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
res = classifier("I'm happy.")

# print(res)

tokens = tokenizer.tokenize("I'm so happy to be at the cafe today drinking my coffee.")
token_ids = tokenizer.convert_tokens_to_ids(tokens)

# OR

token_ids_alt = tokenizer("I'm so happy to be at the cafe today drinking my coffee.")

# print(f'Tokens: {tokens}')
# print(f'TokenIDs: {token_ids}')
# print(f'Alternative TokenIDs: {token_ids_alt}')

X_train = ["We are very happy to show you the Hugging Face Transformers library.",
           "I'm so happy to be at the cafe today drinking my coffee.",
           "I hate Fridays, man."]

# pt = pytorch
batch = tokenizer(X_train, padding=True, truncation=True, max_length=512, return_tensors="pt")

# pytorch auto tracks all tensors to form into graph
# .no_grad() makes sure pytorch does not do this
with torch.no_grad():
    # ** indicates that we want to pass 'batch' into multiple args
    # input_ids and attention_mask will be split
    outputs = model(**batch, labels=torch.tensor([1, 1, 0]))
    print(outputs)

    # Gives us the probabilites
    predictions = F.softmax(outputs.logits, dim=1)
    print(predictions)

    labels = torch.argmax(predictions, dim=1)
    print(labels)

    labels = [model.config.id2label[label_id] for label_id in labels.tolist()]
    print(labels)

# Create a saved directory to store tokenizer and model
save_directory = "saved"

# Pushing tokenizer and model into directory
tokenizer.save_pretrained(save_directory)
model.save_pretrained(save_directory)

# Pulling tokenizer and model from directory
tokenizer = AutoTokenizer.from_pretrained(save_directory)
model = AutoModelForSequenceClassification.from_pretrained(save_directory)

