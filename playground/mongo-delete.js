const { MongoClient, ObjectID } = require("mongodb")
const client = new MongoClient("mongodb://localhost:27017/ToDoApp")
client.connect((err) => {
    if (err) return "Unable to connet to MongoDb"
    console.log("Connected to MongoDb successfully")
    const db = client.db("ToDoApp")
        // db.collection("Users").deleteMany({ name: "ali" }).then(docs => {
        //     console.log(docs)
        // })
        // db.collection("ToDos").deleteOne({ completed: true }).then(docs => {
        //     console.log(docs)
        // })
    db.collection("ToDos").findOneAndDelete({ completed: true }).then(docs => {
        console.log(docs)
    })

    client.close()
})