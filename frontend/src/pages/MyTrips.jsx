import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { TripsCard } from "../components/TripsCard";
import axios from "axios";
import { TravelLoader } from "../components/TravelLoader";

export function MyTrips() {
  const [Trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getTrips() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Your account session is missing. Please sign in again.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post(
          "https://trip-planner-backend-18rw.onrender.com/api/v1/trip/all",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
    <div className="min-h-screen bg-[#f7f8f5] text-[#17212b]">
      <NavBar />
      <main className="mx-auto w-[min(1160px,calc(100%-40px))] py-[72px]">
        <div className="mb-7 flex items-end justify-between gap-5 max-md:block">
          <div>
            <div className="text-[.72rem] font-bold uppercase tracking-[.16em] text-[#e8664f]">Your travel archive</div>
            <h1 className="m-[6px_0_0] font-['Space_Grotesk'] text-[clamp(1.8rem,4vw,2.7rem)]">My trips</h1>
          </div>
          <span className="text-[#66727d]">{Trips.length} saved adventures</span>
        </div>
        {loading ? (
          <TravelLoader message="Fetching your expeditions..." />
        ) : (
          <div className="grid grid-cols-3 gap-[22px] max-md:grid-cols-1">
            {error ? (
              <p className="rounded-[20px] border border-dashed border-[#cbd5cd] p-12 text-center text-[#66727d]">Error: {error}</p>
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
              <p className="rounded-[20px] border border-dashed border-[#cbd5cd] p-12 text-center text-[#66727d]">
                No trips found. Start planning your first escape.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
