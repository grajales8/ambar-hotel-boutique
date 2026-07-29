import { ImageResponse } from "next/og";
import { goldMarkDataUri } from "@/lib/brand-mark";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
            width: 380,
            height: 380,
            borderRadius: "50%",
            border: "6px solid #C6A15B",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 340,
              height: 340,
              borderRadius: "50%",
              border: "2px solid #DCC28F",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={goldMarkDataUri} width={230} height={230} alt="" />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
