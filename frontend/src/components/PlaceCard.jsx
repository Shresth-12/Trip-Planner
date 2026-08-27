import aiimage from "../assets/ai.webp";

export function PlaceCard({ title, description, walk, price }) {
  return (
    <article className="flex overflow-hidden rounded-[18px] border border-[#e3e8e2] bg-white max-[480px]:block">
          <img
            src={aiimage}
            alt=""
            className="w-[145px] min-h-[150px] object-cover max-[480px]:h-[145px] max-[480px]:w-full"
          />
        <div className="p-4">
          <h3 className="font-['Space_Grotesk']">{title}</h3>
          <p className="mt-2 text-sm text-[#66727d]">{description}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#e8664f]"><span>↗ {walk}</span><span>◉ {price}</span></div>
        </div>
    </article>
  );
}
