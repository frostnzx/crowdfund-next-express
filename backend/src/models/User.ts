import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    username: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});
// we need to actually compile it into model
export const User = mongoose.model("User", UserSchema);
