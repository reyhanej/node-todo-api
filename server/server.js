const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/ToDoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const _ = require("lodash")
const ToDo = require("./db/models/todo")
const { ObjectID } = require("mongodb")
const User = require("./db/models/user")
const express = require("express")
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/todos", async(req, res) => {
    try {
        const ToDoObj = new ToDo({
            text: req.body.text,
            completed: req.body.completed,
            completedAt: req.body.completedAt
        });
        console.log(ToDoObj);

        const resultTodo = await ToDoObj
            .save()
        res.send(resultTodo)
    } catch (err) {
        res.status(404)
        res.send(err)
    }
});

app.get("/todos", (req, res) => {
    ToDo.find().then(todos => {
        res.send({ todos })
    }, (e) => res.status(404).send(e))
})
app.get("/todos/:id", async(req, res) => {
    try {
        const id = req.params.id
        if (!ObjectID.isValid(id)) { return res.status(404).send("invalid object id") }
        const result = await ToDo.findById(id)
        res.send(result)
    } catch (e) {
        res.status(404)
        res.send(err, "couldn`t find document")
    }
})
app.delete("/todos/:id", async(req, res) => {
    try {
        const id = req.params.id
        if (!ObjectID.isValid(id)) { return res.status(404).send("invalid object id") }
        const result = await ToDo.findOneAndDelete(id)
        res.send(result)
    } catch (err) {
        res.status(404)
        res.send(err)
    }
})
app.patch("/todos/:id", async(req, res) => {
    try {
        const id = req.params.id
        if (!ObjectID.isValid(id)) { return res.status(404).send("invalid object id") }
        const body = _.pick(req.body, ["text", "completed"])

        if (body.completed && _.isBoolean(body.completed))
            body.completedAt = new Date().getDate()
        else {
            body.completed = false
            body.completedAt = null
        }
        console.log(body)
        result = await ToDo.findOneAndUpdate(id, body, { new: true });
        res.send(result)
    } catch (e) {
        res.status(404)
        res.send(e)
    }
})

// app.post("/users", async(req, res) => {
//     try {
//         const body = _.pick(req.body, ["email", "password", "username"])
//         const userObj = new User(body)
//         const userResult = await userObj
//             .save()
//         const token = userResult.generateAuthToken()
//         res.header("x-auth", token).send()
//         console.log(token, "tokennn")

//     } catch (e) {
//         res.status(404)
//         res.send(e)

//     }
// })
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'username']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(3000, () => console.log("server on 3000 port is running"))

module.exports = {
    app
}