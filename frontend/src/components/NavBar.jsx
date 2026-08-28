import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    if (!dropdownVisible) return undefined;

    const closeMenu = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, [dropdownVisible]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    setDropdownVisible(false);
    navigate("/signin", { replace: true });
  };

  return (
    <header className="mx-auto flex min-h-[78px] w-[min(1160px,calc(100%-40px))] items-center justify-between border-b border-[#e6e9e4]">
      <div className="flex cursor-pointer items-center gap-2.5 font-['Space_Grotesk'] text-[1.1rem] font-bold text-[#17212b]" onClick={()=> navigate("/")}>
        <span className="grid h-[34px] w-[34px] place-items-center rounded-xl bg-[#e8664f] text-base text-white">✦</span>
        <span>Travel Planner</span>
      </div>

      {!token && (
        <div className="flex items-center gap-2.5">
          <button className="cursor-pointer rounded-full border border-[#dce1dc] bg-white px-[18px] py-[11px] font-bold text-[#17212b] transition duration-200 hover:-translate-y-0.5 hover:border-[#e8664f]" onClick={() => navigate("/signup")}>Sign in</button>
        </div>
      )}

      {token && (
        <div className="flex items-center gap-2.5">
          <button className="hidden cursor-pointer rounded-full border border-[#dce1dc] bg-white px-[18px] py-[11px] font-bold text-[#17212b] transition duration-200 hover:-translate-y-0.5 hover:border-[#e8664f] sm:block" onClick={() => navigate("/create")}>+ New trip</button>
          <button className="cursor-pointer rounded-full border border-[#dce1dc] bg-white px-[18px] py-[11px] font-bold text-[#17212b] transition duration-200 hover:-translate-y-0.5 hover:border-[#e8664f]" onClick={() => navigate("/trips")}>My trips</button>

          {/* Avatar and dropdown menu */}
          <div className="relative" ref={profileMenuRef}>
            <button className="grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-full border-0 bg-[#17212b] font-bold text-white" aria-label="Open account menu" aria-expanded={dropdownVisible} onClick={() => setDropdownVisible((visible) => !visible)}>TP</button>
            {dropdownVisible && <div className="absolute right-0 top-[50px] z-30 w-[150px] rounded-[14px] border border-[#e6e9e4] bg-white p-1.5 shadow-[0_16px_40px_#17212b18]"><button className="w-full cursor-pointer rounded-[9px] border-0 bg-transparent px-2.5 py-[9px] text-left hover:bg-[#f3f5f1]" onClick={handleLogout}>Logout</button></div>}
          </div>
        </div>
      )}
    </header>
  );
}
