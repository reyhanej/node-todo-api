const { MongoClient } = require("mongodb")
const client = new MongoClient("mongodb://localhost:27017/ToDoApp")
client.connect((err) => {
    if (err) return "Unable to connet to MongoDb"
    console.log("Connected to MongoDb successfully")
    const db = client.db("ToDoApp")
        // db.collection("ToDos").insertOne({
        //     text: "to watch anime",
        //     completed: false
        // }, (err, result) => {
        //     if (err) throw new Error("Unable to insrt values in the collection", err)
        //     console.log(JSON.stringify(result.ops))
        // })
        // db.collection("ToDos").insertOne({
        //         text: "to read book",
        //         completed: true
        //     }, (err, result) => {
        //         if (err) throw new Error("Unable to insrt values in the collection", err)
        //         console.log(JSON.stringify(result.ops[0]._id.getTimestamp()))
        //     })
    db.collection("Users").insertMany([{
        name: "Morteza",
        age: 24
    }, {
        name: "sara",
        age: 19
    }], (err, result) => {
        if (err) throw new Error("Unable to insrt values in the collection")
        console.log(JSON.stringify(result.ops, result.ops[1]._id))
    })
    client.close()
})