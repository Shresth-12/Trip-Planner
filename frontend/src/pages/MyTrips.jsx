import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { TripsCard } from "../components/TripsCard";
import axios from "axios";

export function MyTrips() {
  const [Trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTrips() {
      const userid = localStorage.getItem("userid");
      setLoading(true);
      try {
        const response = await axios.post("https://trip-planner-backend-18rw.onrender.com/api/v1/trip/all", {
          userId: userid,
        });
        setTrips(response.data);
      } catch (err) {
        setError(err.message || "Error fetching trips");
      } finally {
        setLoading(false);
      }
    }
    getTrips();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="text-3xl font-bold mt-6 ml-66">
        <h1>My Trips</h1>
      </div>

      <div className="ml-66 mt-10 flex flex-wrap gap-6">
        {loading ? (
          // Skeleton Loader
          Array.from({ length: 6 }).map((_, index) => (
            <div>
            <div key={index} className="animate-pulse w-80 h-48 bg-gray-300 rounded-xl"></div>
            <div key={index} className="animate-pulse w-40 h-2 bg-gray-300 rounded-xl mt-3"></div>
            <div key={index} className="animate-pulse w-64 h-2 bg-gray-300 rounded-xl mt-3"></div>
            </div>
          ))
        ) : error ? (
          <p>Error: {error}</p>
        ) : Trips.length > 0 ? (
          Trips.map((trip, index) => {
            const info = JSON.parse(trip.trips);
            return (
              <TripsCard
                key={index}
                location={info.tripDetails.location}
                days={info.tripDetails.duration}
                budget={info.tripDetails.budget}
                trip={trip._id}
              />
            );
          })
        ) : (
          <p>No trips found.</p>
        )}
      </div>
    </div>
  );
}
