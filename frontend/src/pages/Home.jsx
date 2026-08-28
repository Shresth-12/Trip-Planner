import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
    const token = localStorage.getItem("token");

    return (
        <div className="min-h-screen bg-[#f7f8f5] font-sans text-[#17212b]">
            <NavBar />
            <main>
                <section className="relative overflow-hidden bg-[#e9f0eb] px-0 py-20 pb-28">
                    <div className="relative z-10 mx-auto w-[min(1160px,calc(100%-40px))] max-w-[780px]">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#17212b22] px-3 py-2 text-[.69rem] font-bold tracking-[.1em]">
                            <span className="status-dot" />
                            AI-POWERED TRAVEL PLANNING
                        </div>
                        <div className="mt-6 text-[.72rem] font-bold uppercase tracking-[.16em] text-[#e8664f]">Your next journey starts here</div>
                        <h1 className="m-[14px_0_22px] max-w-[760px] font-['Space_Grotesk'] text-[clamp(3rem,7vw,6.8rem)] leading-[.94] tracking-[-.06em]">
                            Plan your next
                            <br />
                            <span>great escape.</span>
                        </h1>
                        <p className="mb-8 max-w-[560px] text-[1.08rem] leading-[1.7] text-[#66727d]">
                            Your intelligent travel co-pilot turns a few preferences into a
                            complete itinerary, tuned to your pace, people, and budget.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                className="cursor-pointer rounded-full border-0 bg-[#17212b] px-[21px] py-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#e8664f]"
                                onClick={() => navigate(token ? "/create" : "/signup")}
                            >
                                Create your itinerary <span aria-hidden="true">↗</span>
                            </button>
                            <span className="text-xs text-[#66727d]">
                                Thoughtful plans. Memorable journeys.
                            </span>
                        </div>
                        <div className="mt-14 flex flex-wrap gap-8 text-[.83rem] text-[#66727d]">
                            <div><strong className="block font-['Space_Grotesk'] text-[1.4rem] text-[#17212b]">01</strong>Share your preferences</div>
                            <div><strong className="block font-['Space_Grotesk'] text-[1.4rem] text-[#17212b]">02</strong>Let AI do the research</div>
                            <div><strong className="block font-['Space_Grotesk'] text-[1.4rem] text-[#17212b]">03</strong>Explore with confidence</div>
                        </div>
                    </div>
                    <div className="absolute bottom-1/4 right-[11%] grid h-[155px] w-[155px] place-items-center rounded-full border border-[#17212b2c] text-[#17212b77] max-md:-right-10 max-md:bottom-8 max-md:opacity-50" aria-hidden="true">
                        <span>N</span>
                        <i>✦</i>
                        <span>S</span>
                    </div>
                </section>

                <section className="mx-auto w-[min(1160px,calc(100%-40px))] py-[72px]">
                    <div className="mb-7 flex items-end justify-between gap-5 max-md:block">
                        <div>
                            <div className="text-[.72rem] font-bold uppercase tracking-[.16em] text-[#e8664f]">Designed around you</div>
                            <h2 className="m-[6px_0_0] font-['Space_Grotesk'] text-[clamp(1.8rem,4vw,2.7rem)] tracking-[-.04em]">Travel planning, elevated.</h2>
                        </div>
                        <span className="text-[#66727d]">Every itinerary, uniquely yours.</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                        <article className="rounded-[18px] border border-[#e3e8e2] bg-white p-6">
                            <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[#e8664f18] text-xl text-[#e8664f]">✦</span>
                            <h3 className="mt-5 font-['Space_Grotesk'] font-bold">Intelligent recommendations</h3>
                            <p className="mt-1 text-sm leading-[1.5] text-[#66727d]">Ideas become a considered day-by-day plan in seconds.</p>
                        </article>
                        <article className="rounded-[18px] border border-[#e3e8e2] bg-white p-6">
                            <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[#e8664f18] text-xl text-[#e8664f]">◎</span>
                            <h3 className="mt-5 font-['Space_Grotesk'] font-bold">Your travel style</h3>
                            <p className="mt-1 text-sm leading-[1.5] text-[#66727d]">Solo, family, luxury, or low-key. Your preferences lead the way.</p>
                        </article>
                        <article className="rounded-[18px] border border-[#e3e8e2] bg-white p-6">
                            <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[#e8664f18] text-xl text-[#e8664f]">↗</span>
                            <h3 className="mt-5 font-['Space_Grotesk'] font-bold">Everything in one place</h3>
                            <p className="mt-1 text-sm leading-[1.5] text-[#66727d]">Keep every itinerary ready for your next departure.</p>
                        </article>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home
