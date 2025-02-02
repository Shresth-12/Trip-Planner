import mongoose from "mongoose"
import env from "dotenv"
env.config()
mongoose.connect("mongodb+srv://shresth:sweta%40176@cluster0.3fnlsyv.mongodb.net/trip")

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
