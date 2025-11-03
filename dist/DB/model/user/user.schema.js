"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
const email_1 = require("../../../utils/email");
exports.userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: function () {
            if (this.agent === enum_1.USER_AGENT.google)
                return false;
            return true;
        },
    },
    credentialUpdatedAt: { type: Date },
    phoneNumber: String,
    role: { type: Number, enum: enum_1.SYS_ROLE, default: enum_1.SYS_ROLE.user },
    gender: { type: Number, enum: enum_1.GENDER, default: enum_1.GENDER.male },
    agent: { type: Number, enum: enum_1.USER_AGENT, default: enum_1.USER_AGENT.local },
    otp: { type: String },
    otpExpiryAt: { type: Date },
    isVerified: { type: Boolean, default: false },
    frindRequests: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
    friends: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } } // handle virtual field when convert to json or object
);
// handle virtual field
exports.userSchema
    .virtual("fullName")
    .get(function () {
    return this.firstName + " " + this.lastName;
})
    .set(function (value) {
    const [firstName, lastName] = value.split(" "); // mohamed ayman => ["mohamed", "ayman"]
    this.firstName = firstName; // value is string but if fullName dont send so firistName and lastName will be undefined so we use as string
    this.lastName = lastName; // same as above
});
/**
 * mongoose middleware
 * 4 types of mongoose middleware
 * 1. document middleware (with [save, deleteOne, updateOne , validate])  >> pre and post (use with document only) >> user.deleteOne() is a document middleware
 * 2. query middleware >> User.deleteOne() is a query middleware
 * 3. model middleware
 * 4. aggregate middleware
 *  */
// create() is a function fires save() >> so we use it on document middleware
/**
 * if use hook >> with deleteOne and want to use it on document middleware
 * >> with user.deleteOne()
 * >> userSchema.pre("deleteOne", { document: true , query: false }, function (next) {
 * })
 */
// document middleware >> next is a function to continue to next middleware (from mongoose)
exports.userSchema.pre("save", async function (next) {
    // function is a async function so wait to immplmint and resolve so by defult call next()
    // send mail if user is new and agent is local
    if (this.agent != enum_1.USER_AGENT.google && this.isNew == true) {
        await (0, email_1.sendMail)({
            to: this.email,
            subject: "confirm email",
            html: `<h1>your otp is  ${this.otp}</h1>`,
        });
        // if you want to dont continue to next middleware use next(new Error("kefe kda"))
    }
});
