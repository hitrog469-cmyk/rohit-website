import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rohit Acharya — Structural Engineer & Researcher";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#050505",
          position: "relative",
        }}
      >
        {/* Amber glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0) 70%)",
          }}
        />

        {/* H-section mark */}
        <div style={{ display: "flex", flexDirection: "column", width: "64px", marginBottom: "40px" }}>
          <div style={{ width: "64px", height: "16px", background: "#F59E0B", borderRadius: "3px" }} />
          <div style={{ width: "13px", height: "30px", background: "#F59E0B", marginLeft: "26px" }} />
          <div style={{ width: "64px", height: "16px", background: "#F59E0B", borderRadius: "3px" }} />
        </div>

        <div
          style={{
            fontSize: "84px",
            fontWeight: 800,
            color: "#F5F5F5",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          Rohit Acharya
        </div>
        <div
          style={{
            fontSize: "34px",
            color: "#F59E0B",
            marginTop: "24px",
            fontWeight: 600,
          }}
        >
          Structural Engineer & Researcher
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#A3A3A3",
            marginTop: "16px",
          }}
        >
          FG-GRC composite plates · FEM · NIT Rourkela · Nepal
        </div>

        {/* Footer line */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "20px",
            color: "#525252",
          }}
        >
          rohitacharya.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
