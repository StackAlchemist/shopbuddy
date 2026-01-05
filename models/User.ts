import {models, Schema, model} from "mongoose";

const UserSchema = new Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true }, // hashed
    image: String,
}, { timestamps: true });

UserSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
}

export default models.User || model("User", UserSchema);