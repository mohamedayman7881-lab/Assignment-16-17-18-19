"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSchema = void 0;
const mongoose_1 = require("mongoose");
exports.chatSchema = new mongoose_1.Schema({
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        // make message as a ref document not embedded document to limit
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
}, { timestamps: true });
