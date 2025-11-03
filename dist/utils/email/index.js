"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dev_config_1 = require("../../config/dev.config");
// send mail function utlis
const sendMail = async (mailOptions) => {
    // create transporter
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: dev_config_1.devConfig.EMAIL_USER,
            pass: dev_config_1.devConfig.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false, // not goot for production
        },
    });
    mailOptions.from = `social_app <${dev_config_1.devConfig.EMAIL_USER}>`;
    // send mail
    await transporter.sendMail(mailOptions);
};
exports.sendMail = sendMail;
