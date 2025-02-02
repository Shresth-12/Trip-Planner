import aiimage from "../assets/ai.webp";

export function HotelCard({ name, location, budget, rating }) {
  return (
    <div className="group mt-8">
      <div className="border p-4 border-gray-200 rounded-2xl group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
        <img
          src={aiimage}
          alt=""
          className="w-66 h-36 object-cover rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ml-8"
        />
        <h1 className="text-xl mt-2 font-medium group-hover:text-blue-600 transition-all duration-300">{name}</h1>
        <p className="w-80 mt-2 text-sm text-gray-500 group-hover:text-gray-700 transition-all duration-300">📍{location}</p>
        <p className="w-80 mt-2 text-sm font-medium group-hover:text-gray-800 transition-all duration-300">💰 {budget}</p>
        <p className="w-80 mt-2 text-sm font-medium group-hover:text-gray-800 transition-all duration-300">⭐ {rating}</p>
      </div>
    </div>
  );
}
