import { Link } from "react-scroll";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const NAV_LINKS = [
    { to: "AboutME",    label: "About Me"   },
    { to: "Experience", label: "Experience" },
    { to: "Education",  label: "Education"  },
    { to: "ContactMe",  label: "Contact Me" },
];

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPos, setDropdownPos]       = useState({ top: 0, right: 0 });
    const [activeSection, setActiveSection]   = useState("AboutME");

    const menuRef   = useRef(null);
    const buttonRef = useRef(null);

    // Track which section is in view
    useEffect(() => {
        const observers = NAV_LINKS.map(({ to }) => {
            const el = document.getElementById(to);
            if (!el) return null;

            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(to);
                },
                { threshold: 0.4 } // section must be 40% visible to become active
            );
            obs.observe(el);
            return obs;
        });

        return () => observers.forEach((obs) => obs?.disconnect());
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current   && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleToggle() {
        if (!isDropdownOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPos({
                top:   rect.bottom + 12,
                right: window.innerWidth - rect.right,
            });
        }
        setIsDropdownOpen((prev) => !prev);
    }

    const dropdown = createPortal(
        <div
            ref={menuRef}
            style={{
                top:          dropdownPos.top,
                right:        dropdownPos.right,
                transition:   "opacity 200ms ease",
                opacity:      isDropdownOpen ? 1 : 0,
                pointerEvents: isDropdownOpen ? "auto" : "none",
            }}
            className="fixed z-[9999] min-w-40"
        >
            <div className="flex flex-col gap-1 p-2 rounded-xl shadow-lg border border-white/10 backdrop-blur-xl bg-black/30">
                {NAV_LINKS.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        smooth
                        duration={500}
                        onClick={() => setIsDropdownOpen(false)}
                        className={`cursor-pointer whitespace-nowrap text-left w-full px-3 py-2 rounded-lg transition-colors duration-200
                            ${activeSection === to
                                ? "bg-teal-400/20 text-teal-400"
                                : "text-white hover:text-teal-400"
                            }`}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </div>,
        document.body
    );

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
                <nav className="w-full max-w-3xl flex items-center justify-between px-5 py-3 text-white backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-lg">

                    {/* Logo */}
                    <p className="text-lg text-teal-400 font-bold">Anobhav Singh</p>

                    {/* Desktop Menu — pill slides under the active link */}
                    <div className="hidden md:flex items-center gap-1 relative">
                        {NAV_LINKS.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                smooth
                                duration={500}
                                spy
                                onSetActive={() => setActiveSection(to)}
                                className={`relative cursor-pointer px-3 py-1.5 rounded-lg font-medium transition-colors duration-300 z-10
                                    ${activeSection === to
                                        ? "text-teal-400"
                                        : "hover:text-teal-400"
                                    }`}
                            >
                                {/* Sliding background pill */}
                                {activeSection === to && (
                                    <span
                                        className="absolute inset-0 rounded-xl bg-teal-400/15 border border-teal-400/30"
                                        style={{ transition: "all 300ms ease" }}
                                    />
                                )}
                                <span className="relative z-10">{label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile toggle */}
                    <div className="md:hidden ml-auto">
                        <button
                            ref={buttonRef}
                            onClick={handleToggle}
                            className={`text-3xl transition-transform duration-300 ${isDropdownOpen ? "rotate-45" : "rotate-0"}`}
                        >
                            +
                        </button>
                    </div>
                </nav>
            </div>

            {dropdown}
        </>
    );
}

export { Navbar };