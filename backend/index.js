const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is running");
});

// connect with mongodb database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sajc8ea.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	try {
		const dataCollection = client.db("addressBook").collection("address");
		app.post("/contacts", async(req, res) => {
			const contact = req.body;
			const query = { number: contact.number };
			const alreadyExist = await dataCollection.findOne(query);
			if (alreadyExist) {
				res.status(400).send(({ message: "User already exists" }));
				return;
			}
			const result = dataCollection.insertOne(contact);
			res.status(201).json(result);
		});
	} finally {
	}
}
run();

app.listen(port, () => {
	console.log(`Server running on ${port}`);
});
