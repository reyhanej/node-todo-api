const { MongoClient, ObjectID } = require("mongodb")
const client = new MongoClient("mongodb://localhost:27017/ToDoApp")
client.connect((err) => {
    if (err) return "Unable to connet to MongoDb"
    console.log("Connected to MongoDb successfully")
    const db = client.db("ToDoApp")
        // db.collection("ToDos").find({ _id: new ObjectID("60d9c4f06c190611ccfd4f10") }).toArray().then(docs => {
        //         console.log("To Do list :", JSON.stringify(docs), "       ")
        //     },
        //     err => { throw new Error("there is an error", err) })
    db.collection("ToDos").find().count().then(count => {
        console.log(`To do List count : ${count}`)
    }, err => {
        throw new Error("there is an error", err)
    })
    db.collection("Users").find().count().then(count => {
        console.log(`Users count : ${count}`)
    }, err => {
        throw new Error("there is an error", err)
    })
    client.close()
})