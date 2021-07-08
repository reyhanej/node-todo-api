const mongoose = require("mongoose")
const Schema = mongoose.Schema
const validator = require("validator")
const jwt = require("jsonwebtoken")

const UserSchema = new Schema({
  username: {
            type: String,
            required: true,
            trim: true,
            uniqe: true
        },
  email: {
            type: String,
            required: true,
            trim: true,
           /*  validate: {
                validator: [validator.isEmail, "value is not valid"],
            } */
        },
  password: {
            type: String,
            required: true,
            minLength: 6,
        },
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
 })


UserSchema.methods.generateAuthToken = async function() {
    var user = this
    var access = 'auth'
    var token = await jwt.sign({ _id: user._id.toHexString(), access }, '123abc').toString();

    user.tokens.push({ access, token })

    await user.save()
    return token
}

const User = mongoose.model("user", UserSchema)
module.exports = User