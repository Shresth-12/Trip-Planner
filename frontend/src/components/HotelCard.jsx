import aiimage from "../assets/ai.webp";

export function HotelCard({ name, location, budget, rating }) {
  return (
    <article className="overflow-hidden rounded-[18px] border border-[#e3e8e2] bg-white">
        <img
          src={aiimage}
          alt=""
        />
        <div className="p-4">
          <h3 className="font-['Space_Grotesk']">{name}</h3>
          <p className="mt-2 text-sm text-[#66727d]">📍 {location}</p>
          <p className="mt-2 text-sm text-[#66727d]">💰 {budget} <span aria-hidden="true">·</span> ⭐ {rating}</p>
        </div>
    </article>
  );
}
