import { Link } from "react-scroll";
import { useState, useRef, useEffect } from "react";

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full flex md:justify-between items-center pt-5 px-5 z-50 bg-black text-white border-b border-teal-900 pb-3">
            <p className="text-lg text-teal-400 font-bold ">Anobhav Singh</p>
            <div className="hidden md:flex gap-6 font-medium mr-3">
                <Link to="AboutME" smooth={true} duration={500} spy={true} activeClass="text-teal-400 text-black rounded" className="cursor-pointer">
                    About Me
                </Link>

                <Link to="Experience" smooth duration={500} spy={true} activeClass="text-teal-400 text-black rounded" className="cursor-pointer">
                    Experience
                </Link>

                <Link to="Education" smooth duration={500} spy={true} activeClass="text-teal-400 text-black rounded" className="cursor-pointer">
                    Education
                </Link>

                <Link to="ContactMe" smooth duration={500} spy={true} activeClass="text-teal-400 text-black rounded" className="cursor-pointer">
                    Contact Me
                </Link>
            </div>
            <div ref={menuRef} className="relative ml-auto md:hidden ">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`text-3xl transition-transform duration-300 ${isDropdownOpen ? "rotate-45" : "rotate-0"}`}>+</button>

                <div className={`absolute right-0 mt-2 flex flex-col gap-3 min-w-40 rounded-lg bg-slate-900 p-4 shadow-lg origin-top transition-all duration-300 ${isDropdownOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}>
                    <Link to="AboutME" smooth duration={500} className="cursor-pointer whitespace-nowrap text-left w-full"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        About Me
                    </Link>

                    <Link
                        to="Experience"
                        smooth
                        duration={500}
                        className="cursor-pointer whitespace-nowrap text-left w-full"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        Experience
                    </Link>

                    <Link
                        to="Education"
                        smooth
                        duration={500}
                        className="cursor-pointer whitespace-nowrap text-left w-full"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        Education
                    </Link>

                    <Link
                        to="ContactMe"
                        smooth
                        duration={500}
                        className="cursor-pointer whitespace-nowrap text-left w-full"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        Contact Me
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export { Navbar };