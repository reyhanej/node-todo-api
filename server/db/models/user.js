const mongoose = require("mongoose")
const Schema = mongoose.Schema
const validator = require("validator")
const jwt = require("jsonwebtoken")
const _ = require("lodash")

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
            validate: {
                validator: [validator.isEmail, "value is not valid"],
            }
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            token: [{
                access: {
                    type: String,
                    required: true
                },
                tokens: {
                    type: String,
                    required: true
                }
            }]

        }
    })
    // UserSchema.methods.generateAuthToken = function() {
    //         var user = this
    //         var access = 'auth'
    //         var token = jwt.sign({ _id: user._id.toHexString(), access }, '123abc').toString();

//         user.tokens.push({ access, token })

//         return user.save().then(() => token)
//     }
// UserSchema.methods.toJSON = function() {
//     const user = this.toObject()
//     return { _id, username, email } = user
// }

UserSchema.methods.generateAuthToken = function() {
    var user = this
    var access = 'auth'
    var token = jwt.sign({ _id: user._id.toHexString(), access }, '123abc').toString();

    user.tokens.push({ access, token })

    return user.save().then(() => {
        return token
    })
}
const User = mongoose.model("user", UserSchema)
module.exports = User