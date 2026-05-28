"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contactMessageSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
    },
    subject: {
        type: String,
        required: false,
        trim: true,
    },
    message: {
        type: String,
        required: [true, "Message is required"],
    },
}, {
    timestamps: true,
});
exports.ContactMessage = mongoose_1.default.model("ContactMessage", contactMessageSchema);
