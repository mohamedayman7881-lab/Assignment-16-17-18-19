import { Schema, Types } from "mongoose";
import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { IUser } from "../../../utils/common/interface";
import { sendMail } from "../../../utils/email";

export const userSchema = new Schema<IUser>(
  {
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
        if (this.agent === USER_AGENT.google) return false;
        return true;
      },
    },
    credentialUpdatedAt: { type: Date },
    phoneNumber: String,
    role: { type: Number, enum: SYS_ROLE, default: SYS_ROLE.user },
    gender: { type: Number, enum: GENDER, default: GENDER.male },
    agent: { type: Number, enum: USER_AGENT, default: USER_AGENT.local },
    otp: { type: String },
    otpExpiryAt: { type: Date },
    isVerified: { type: Boolean, default: false },
    frindRequests: [{ type: Types.ObjectId, ref: "User" }],
    friends: [{ type: Types.ObjectId, ref: "User" }],
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } } // handle virtual field when convert to json or object
);

// handle virtual field
userSchema
  .virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (value: string) {
    const [firstName, lastName] = value.split(" "); // mohamed ayman => ["mohamed", "ayman"]
    this.firstName = firstName as string; // value is string but if fullName dont send so firistName and lastName will be undefined so we use as string
    this.lastName = lastName as string; // same as above
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
userSchema.pre("save", async function (next) {
  // function is a async function so wait to immplmint and resolve so by defult call next()
  // send mail if user is new and agent is local
  if (this.agent != USER_AGENT.google && this.isNew == true) {
    await sendMail({
      to: this.email,
      subject: "confirm email",
      html: `<h1>your otp is  ${this.otp}</h1>`,
    });
    // if you want to dont continue to next middleware use next(new Error("kefe kda"))
  }
});
