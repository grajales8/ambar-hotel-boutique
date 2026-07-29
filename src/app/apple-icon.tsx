import { ImageResponse } from "next/og";
import { goldMarkDataUri } from "@/lib/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05244F",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 132,
            height: 132,
            borderRadius: "50%",
            border: "3px solid #C6A15B",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={goldMarkDataUri} width={82} height={82} alt="" />
        </div>
      </div>
    ),
    { ...size }
  );
}
