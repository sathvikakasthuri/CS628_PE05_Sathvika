const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://sathvikakasthuri:Akarsh4419*@cluster0.na8rq.mongodb.net/hos08", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

// Get all records
app.get("/records", async (req, res) => {
  try {
    const results = await db.collection("records").find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: "Error fetching records" });
  }
});

// Get single record by ID
app.get("/records/:id", async (req, res) => {
  try {
    const result = await db.collection("records").findOne({ _id: new ObjectId(req.params.id) });
    if (!result) return res.status(404).send({ error: "Record not found" });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Error fetching record" });
  }
});

// Create new record
app.post("/records", async (req, res) => {
  try {
    const newDocument = { name: req.body.name };
    const result = await db.collection("records").insertOne(newDocument);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: "Error creating record" });
  }
});

// Update record by ID
app.patch("/records/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = { $set: { name: req.body.name } };
    const result = await db.collection("records").updateOne(query, updates);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Error updating record" });
  }
});

// Delete record by ID
app.delete("/records/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await db.collection("records").deleteOne(query);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "Error deleting record" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"))
