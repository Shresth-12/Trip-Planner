import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleClick(emailAddress, passwordValue) {
    try {
      const response = await axios.post(
        "https://trip-planner-backend-18rw.onrender.com/api/v1/user/signin",
        { email: emailAddress, password: passwordValue }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userid", response.data.userId);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#e9f0eb] md:grid-cols-2">
      <div className="flex min-h-[250px] flex-col justify-between bg-[#17212b] p-7 text-white md:min-h-screen md:p-12">
        <div className="flex items-center gap-2.5 font-['Space_Grotesk'] text-[1.1rem] font-bold">
          <span className="grid h-[34px] w-[34px] place-items-center rounded-xl bg-[#e8664f] text-base text-white">✦</span>
          Travel Planner
        </div>
        <h1 className="max-w-[470px] font-['Space_Grotesk'] text-[clamp(3rem,6vw,6rem)] leading-[.95] tracking-[-.06em]">
          Go where
          <br />
          <span>you feel alive.</span>
        </h1>
        <small className="text-sm">Thoughtful itineraries, made for the way you travel.</small>
      </div>

      <div className="grid place-items-center p-5 md:p-8">
        <div className="w-full max-w-[410px] rounded-3xl bg-white p-7 shadow-[0_20px_60px_#17212b12] md:p-10">
          <div className="text-[.72rem] font-bold uppercase tracking-[.16em] text-[#e8664f]">Welcome back</div>
          <h1 className="m-0 mt-1 font-['Space_Grotesk'] text-4xl">Sign in</h1>
          <p className="text-[#66727d]">Pick up where your next adventure begins.</p>

          <form onSubmit={(event) => {
            event.preventDefault();
            handleClick(email, password);
          }}>
            <label className="mb-1.5 mt-4 block text-sm font-bold">Email</label>
            <input
              className="h-12 w-full rounded-xl border border-[#dce1dc] bg-[#fbfcfa] px-[15px] outline-none focus:border-[#e8664f] focus:ring-4 focus:ring-[#e8664f18]"
              type="text"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />

            <label className="mb-1.5 mt-4 block text-sm font-bold">Password</label>
            <input
              className="h-12 w-full rounded-xl border border-[#dce1dc] bg-[#fbfcfa] px-[15px] outline-none focus:border-[#e8664f] focus:ring-4 focus:ring-[#e8664f18]"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />

            <button className="mt-5 w-full cursor-pointer rounded-full border-0 bg-[#17212b] px-[21px] py-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#e8664f]" type="submit">
              Sign in ↗
            </button>
            <p className="mt-5 text-center text-sm text-[#66727d]">
              Don&apos;t have an account?{" "}
              <button className="border-0 cursor-pointer bg-transparent p-0 font-bold text-[#e8664f]" type="button" onClick={() => navigate("/signup")}>
                Create one
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
