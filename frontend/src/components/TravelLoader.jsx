export function TravelLoader({ message = "Planning your adventure...", compact = false }) {
  return (
    <div className={`grid justify-items-center gap-2 text-center ${compact ? "inline-flex items-center gap-3 p-0" : "p-7"}`} role="status" aria-live="polite">
      <div className={`relative grid place-items-center rounded-full border border-[#e8664f33] bg-[radial-gradient(circle_at_center,#fff_0_34%,#e9f0eb_35%_36%,transparent_37%)] ${compact ? "h-[44px] w-[44px] border-0 bg-transparent" : "h-[116px] w-[116px]"}`} aria-hidden="true">
        <span className={`absolute animate-spin rounded-full border border-dashed border-[#e8664f77] [animation-duration:6s] ${compact ? "inset-0" : "inset-4"}`} />
        <span className={`absolute animate-spin rounded-full border border-dashed border-[#56a8a077] [animation-direction:reverse] [animation-duration:4s] ${compact ? "inset-y-2 inset-x-0" : "inset-y-7 inset-x-2"}`} />
        <span className={`absolute grid animate-bounce place-items-center rounded-full bg-[#e8664f] text-white [animation-duration:1.4s] ${compact ? "left-[13px] top-[11px] h-5 w-5 text-[.55rem]" : "left-[45px] top-6 h-[27px] w-[27px] text-sm"}`}>✈</span>
        {!compact && <span className="absolute bottom-5 right-3 animate-pulse text-lg text-[#f0b45e]">✦</span>}
      </div>
      <strong className="font-['Space_Grotesk'] text-[1.1rem]">{message}</strong>
      {!compact && <span className="text-sm text-[#66727d]"></span>}
    </div>
  );
}
