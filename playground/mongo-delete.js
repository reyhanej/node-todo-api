const { MongoClient, ObjectID } = require("mongodb")
const client = new MongoClient("mongodb://localhost:27017/ToDoApp")
client.connect((err) => {
    if (err) return "Unable to connet to MongoDb"
    console.log("Connected to MongoDb successfully")
    const db = client.db("ToDoApp")

    client.close()
})