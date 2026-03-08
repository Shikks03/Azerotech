interface WaveDividerProps {
  color?: "navy" | "white";
}

export default function WaveDivider({ color = "navy" }: WaveDividerProps) {
  const bgColor = color === "navy" ? "#080B1A" : "#FFFFFF";

  return (
    <svg
      className="w-full h-auto"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
        fill={bgColor}
        opacity="0.5"
      />
      <path
        d="M0,60 Q300,10 600,60 T1200,60 L1200,120 L0,120 Z"
        fill={bgColor}
      />
    </svg>
  );
}
