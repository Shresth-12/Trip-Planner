import express from "express"
import { Trip } from "../db.js"
import { authMiddleware } from "../middleware/auth.js"
const router=express.Router()

router.use(authMiddleware)

router.post("/save",async(req,res)=>{
    try{
    const trip=await Trip.create({
  userId:req.userId,
      trips:req.body.data
    })
    return res.json({
        message:"Trip Saved",
        tripId:trip._id
    })
}
catch(err)
{
    console.log(err)
}
})
router.get("/get-trip/:tripId", async (req, res) => {
    const { tripId } = req.params; 
    try {
      const trip = await Trip.findOne({ _id: tripId, userId: req.userId });
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      const parsedTrips = JSON.parse(trip.trips);
      res.json(parsedTrips);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  router.post("/all", async (req, res) => {
    try {
      const trips = await Trip.find({ userId: req.userId });
        return res.status(200).json(trips);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router