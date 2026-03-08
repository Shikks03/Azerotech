export default function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
      <span
        className="text-xl font-bold tracking-tight"
        style={{ color: variant === "light" ? "#FFFFFF" : "#0F172A" }}
      >
        Azero<span style={{ color: "#4F6EF7" }}>Tech</span>
      </span>
    </div>
  );
}
