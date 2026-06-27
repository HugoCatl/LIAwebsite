import { cn } from "@/lib/utils";

interface OrbProps {
  size?: number;
  className?: string;
  withOrbits?: boolean;
}

export function Orb({ size = 360, className, withOrbits = false }: OrbProps) {
  const r = size * 0.48;
  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer aura */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.5) 0%, rgba(99,102,241,0.25) 40%, transparent 70%)",
          animation: "halo-pulse 6s ease-in-out infinite",
        }}
      />
      {/* Rotating ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "85%",
          height: "85%",
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(165,180,252,0.35) 25%, transparent 50%, rgba(99,102,241,0.4) 75%, transparent 100%)",
          filter: "blur(8px)",
          animation: "orb-rotate 20s linear infinite",
        }}
      />
      {withOrbits && (
        <>
          <div className="orbit" style={{ ["--orbit-duration" as any]: "26s" }}>
            <span className="orbit__dot" style={{ ["--orbit-r" as any]: `${r}px` }} />
          </div>
          <div
            className="orbit"
            style={{
              ["--orbit-duration" as any]: "38s",
              animationDirection: "reverse",
              transform: "rotate(120deg)",
            }}
          >
            <span
              className="orbit__dot"
              style={{ ["--orbit-r" as any]: `${r * 0.82}px`, opacity: 0.55, width: 3, height: 3 }}
            />
          </div>
          <div className="orbit" style={{ ["--orbit-duration" as any]: "32s", transform: "rotate(220deg)" }}>
            <span
              className="orbit__dot"
              style={{ ["--orbit-r" as any]: `${r * 0.95}px`, opacity: 0.4, width: 2, height: 2 }}
            />
          </div>
        </>
      )}
      {/* Inner orb */}
      <div
        className="relative rounded-full"
        style={{
          width: "62%",
          height: "62%",
          background:
            "radial-gradient(circle at 35% 30%, #C7D2FE 0%, #818CF8 35%, #4F46E5 65%, #3730A3 100%)",
          boxShadow:
            "inset -20px -30px 60px rgba(15, 12, 60, 0.6), inset 10px 15px 40px rgba(199, 210, 254, 0.4), 0 0 80px rgba(99, 102, 241, 0.5)",
          animation: "orb-breathe 5s ease-in-out infinite",
        }}
      >
        {/* Highlight */}
        <div
          className="absolute rounded-full"
          style={{
            top: "12%",
            left: "18%",
            width: "30%",
            height: "22%",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      </div>
    </div>
  );
}