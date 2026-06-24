const ITEMS = [
  "Software Engineer",
  "Full Stack Developer",
  "Python Developer",
  "Backend Developer",
  "Always Learning",
];

export default function Marquee() {
  return (
    <div className="overflow-hidden w-full mt-10">
      <div className="flex w-max animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0" style={{ gap: "48px", paddingRight: "48px" }}>
            {ITEMS.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}