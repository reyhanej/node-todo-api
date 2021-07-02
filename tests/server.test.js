const expect = require("expect")
const mocha = require("mocha")
const request = require("supertest")
const { app } = require("../server/server")
const Todo = require("./../server/db/models/todo")

beforeEach(done => {
    Todo.deleteMany({}).then(() => done())
})

describe("test post api", () => {
    it("shoud create a new todo", (done) => {
        let text = "todo test text"

        request(app)
            .post("/todos")
            .send({ text })
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) { return done(err) }
                Todo.find().then(todos => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                }).catch((e) => done(e))
            })
    })
    it("Should not create invalid body data", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(404)
            .end((err, res) => {
                if (err) { return done(err) }
                Todo.find().then(todos => {
                    expect(todos.length).toBe(0)
                    done()
                }).catch((e) => done(e))

            })
    })
})