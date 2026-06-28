import Marquee from "./Marquee";
import SplitText from "./SplitText";

export default function AboutMe() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
        <SplitText
          text="Hello World, I'm"
          className="text-2xl font-medium"
          splitType="words"
          delay={100}
          duration={1}
        />

        <SplitText
          text="Anobhav Singh"
          className="text-6xl font-bold mt-4 text-cyan-200"
          splitType="chars"
          delay={50}
          duration={1.2}
        />
      </div>
      <div className="absolute top-1/3 left-0 w-full mt-32 flex flex-col items-center animate-fadein">
        <p className="mb-28 mt-12 max-w-3xl px-6 text-center text-lg">
          I build things that stay quiet by design simple on the surface,
          purposeful underneath and free of noise.
        </p>
        <Marquee/>
        
      </div>
    </div>
  );
}