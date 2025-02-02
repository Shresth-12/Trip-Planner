import aiimage from "../assets/ai.webp";

export function PlaceCard({ title, description, walk, price }) {
  return (
    <div className="mt-8 group">
      <div className="flex border p-4 border-gray-200 rounded-2xl group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
        <div>
          <img
            src={aiimage}
            alt=""
            className="w-32 h-32 object-cover rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
          />
        </div>
        <div className="ml-4">
          <h1 className="text-xl font-bold w-80 group-hover:text-blue-600 transition-all duration-300">{title}</h1>
          <p className="w-80 text-gray-500 text-sm group-hover:text-gray-800 transition-all duration-300">{description}</p>
          <p className="w-80 mt-2 group-hover:text-gray-600 transition-all duration-300">🏃🏻 {walk}</p>
          <p className="w-80 mt-2 group-hover:text-gray-600 transition-all duration-300">🎟️ {price}</p>
        </div>
      </div>
    </div>
  );
}
