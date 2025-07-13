from datasets import load_dataset
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification
from transformers import Trainer, TrainingArguments

# Step 1: Import in established datatset (I chose go_emotions)
dataset = load_dataset("go_emotions")

# Upon printing, we can see that all data is already split into "train", "validation", "test"
print(dataset)

# Step 2: So we split them based on label
train_dataset = dataset["train"]
val_dataset = dataset["validation"]
test_dataset = dataset["test"]

train_dataset = train_dataset.select(range(10000))

# Step 3: Find an appropriate model to use from Hugging Face hub
model_name = "distilbert-base-uncased"

# Step 4: Set up the tokenizer and mdeol from the model_name
tokenizer = DistilBertTokenizerFast.from_pretrained(model_name)
model = DistilBertForSequenceClassification.from_pretrained(model_name, num_labels=28)

def tokenize(batch):
    return tokenizer(batch['text'], padding="max_length", truncation=True, max_length=128)

def preprocess_labels(input):
    input["labels"] = input["labels"][0] if len(input["labels"]) > 0 else 0
    return input

# Map each dataset to their preprocessed versions (i.e. to inputs with only one emotion label)
train_dataset = train_dataset.map(preprocess_labels)
val_dataset = val_dataset.map(preprocess_labels)
test_dataset = test_dataset.map(preprocess_labels)

# Tokenize each of the preprocessed datasets
train_dataset = train_dataset.map(tokenize, batched=True)
val_dataset = val_dataset.map(tokenize, batched=True)
test_dataset = test_dataset.map(tokenize, batched=True)

# Set the formats of each of the datasets into torch tensors
train_dataset.set_format('torch', ['input_ids', 'attention_mask', 'labels'])
val_dataset.set_format('torch', ['input_ids', 'attention_mask', 'labels'])
test_dataset.set_format('torch', ['input_ids', 'attention_mask', 'labels'])

training_args = TrainingArguments (
    output_dir="./results",
    eval_strategy="epoch",
    save_strategy="epoch",
    per_device_train_batch_size=32,
    per_device_eval_batch_size=32,
    num_train_epochs=3,
    learning_rate=2e-5,
    weight_decay=0.01,
    save_total_limit=2,
    logging_dir="./logs",
    logging_steps=50,
)

trainer = Trainer (
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset
)

trainer.train()

results = trainer.evaluate()
print(results)

trainer.save_model("./save")