import SpotlightCard from "./SpotlightCard";

export default function Education() {
    const educationData = {
        "10th": {
            board:"CBSE",
            year: "2019-2020",
            score: "76.5%",
        },
        "12th": {
            board:"CBSE",
            year: "2021-2022",
            score: "76.6%",
        },
        "B.Tech": {
            college:"S.R.M Chennai",
            year: "2022-2026",
            score: "8.81 CGPA",
        },
    };

    return (
        <>
            <div id='education' className="text-6xl font-bold pt-16 text-center">Education</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-16">
                {Object.entries(educationData).map(([degree, details]) => (
                    <SpotlightCard
                        key={degree}
                        className="custom-spotlight-card relative rounded-3xl overflow-hidden p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                        spotlightColor="rgba(0,229,255,0.5)"
                    >
                        <div className="flex flex-col items-center justify-center text-center">
                            <h1 className="text-2xl font-bold mb-4">
                                {degree}
                            </h1>

                            <p className="text-lg">
                                {details.year}
                            </p>

                            <p className="text-gray-300">
                                {details.score}
                            </p>

                            <p className="text-sm text-gray-300 mt-2">
                                {details.board || details.college}
                            </p>
                        </div>
                    </SpotlightCard>
                ))}
            </div>
        </>
    );
}