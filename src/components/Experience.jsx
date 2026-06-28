import ElectricBorder from "./ElectricBorder";
import SpotlightCard from "./SpotlightCard";

export default function Experience() {
    const techStack = {
        Frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
        Backend: ["Node.js", "Express.js"],
        Database: ["SQL", "NoSQL"],
        Languages: ["Java", "C++", "Python"],
        Tools: ["Git", "GitHub", "Postman"],
        Others: ["System Design"],
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 md:px-8">
            <div id="heading" className="text-6xl font-bold pb-16">
                <h1>Experience</h1>
            </div>

            {/* Experience Cards */}
            <div id="body" className="grid gap-x-10 gap-y-10 md:gap-x-30 md:gap-y-10 md:grid-cols-2">
                <SpotlightCard
                    className="custom-spotlight-card relative rounded-3xl overflow-hidden p-8 bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                    spotlightColor="rgba(0, 229, 255, 0.5)"
                >
                    <div id="sirion">
                        <h1 className="text-lg font-bold md:text-xl">Sirion</h1>
                        <p>Professional Consultant - Engineering</p>
                        <p>May 2025 - Oct 2025</p>
                    </div>
                </SpotlightCard>

                <SpotlightCard
                    className="custom-spotlight-card relative rounded-3xl overflow-hidden p-8 bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                    spotlightColor="rgba(0, 229, 255, 0.5)"
                >
                    <div id="novecta">
                        <h1 className="font-bold text-xl">Novecta</h1>
                        <p>Web Development Intern</p>
                        <p>Dec 2024 - Jan 2025</p>
                    </div>
                </SpotlightCard>

                <SpotlightCard
                    className="custom-spotlight-card relative rounded-3xl overflow-hidden p-8 bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                    spotlightColor="rgba(0, 229, 255, 0.5)"
                >
                    <div id="final_year_project">
                        <h1 className="font-bold text-xl">Final Year Project</h1>
                        <p>Sign Language Recognition using LSTM</p>
                    </div>
                </SpotlightCard>

                <SpotlightCard
                    className="custom-spotlight-card relative rounded-3xl overflow-hidden p-8 bg-white/10 backdrop-blur-xs border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                    spotlightColor="rgba(0, 229, 255, 0.5)"
                >
                    <div id="react_project">
                        <h1 className="font-bold text-xl">
                            Personal Portfolio Website
                        </h1>
                        <p>Full Stack Project</p>
                    </div>
                </SpotlightCard>
            </div>
            <div className="mt-16 w-max-7xl">
                <ElectricBorder
                    color="#00ccc7"
                    speed={0.6}
                    chaos={0.06}
                    thickness={2}
                    style={{ borderRadius: 16 }}
                >
                    <div className="p-8">
                        <h1 className="font-bold text-2xl mb-2">Tech Stack</h1>
                        <p className="text-gray-400">Tools I build with</p>

                        {Object.entries(techStack).map(([category, items]) => (
                            <div key={category} className="mt-6">
                                <h3 className="text-xs tracking-[4px] uppercase font-semibold text-gray-300 mb-4">
                                    {category}
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {items.map((item) => (
                                        <div
                                            key={item}
                                            className="
                                                px-5 py-2
                                                rounded-full
                                                border border-cyan-400/40
                                                bg-white/5
                                                text-sm font-medium
                                                shadow-[0_0_15px_rgba(0,204,199,0.2)]
                                            "
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ElectricBorder>
            </div>
        </div>
    );
}