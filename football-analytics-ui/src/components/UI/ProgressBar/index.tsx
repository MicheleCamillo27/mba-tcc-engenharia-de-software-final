import type { ProgressBarProps } from "./types";


export default function ProgressBar({ label, value }: ProgressBarProps) {
  return (
    <div style={{ marginBottom: "14px" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px"
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            letterSpacing: "0.3px"
          }}
        >
          {label}
        </span>

        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--text-primary)"
          }}
        >
          {value.toFixed(1)}%
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "10px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "999px",
          overflow: "hidden",
          position: "relative"
        }}
      >

        <div
          style={{
            width: `${value}%`,
            height: "100%",
            borderRadius: "999px",
            background: `
              linear-gradient(
                90deg,
                rgba(212,175,55,0.6),
                rgba(212,175,55,1)
              )
            `,
            boxShadow: "0 0 8px rgba(212,175,55,0.5)",
            transition: "width 0.6s ease"
          }}
        />


        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${value}%`,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            opacity: 0.4
          }}
        />
      </div>
    </div>
  );
}