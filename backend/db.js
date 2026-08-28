import mongoose from "mongoose"
import env from "dotenv"
env.config()

if (!process.env.DB_URL) {
    throw new Error("DB_URL is not defined in the environment")
}

mongoose.connect(process.env.DB_URL)

const UserSchema=new mongoose.Schema({
email:{
    type: String,
    required: true,
    unique: true,
},
password:{
    type: String,
    required: true,
}
});

const tripsSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    trips : mongoose.Schema.Types.Mixed
})

export const User = mongoose.model("User", UserSchema);
export const Trip = mongoose.model("Trip", tripsSchema);
