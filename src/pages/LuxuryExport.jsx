import React from "react";
import ComingSoon from "../components/common/ComingSoon";
import luxeAtelier from "../assets/images/luxe/fashion-atelier.jpg";

export default function LuxuryExport() {
  return (
    <ComingSoon
      lockup={["ORAC", "Luxe"]}
      eyebrow="Opening Soon"
      title="ORAC LUXE"
      subtitle="Opening Soon."
      tone="luxury"
      image={{
        src: luxeAtelier,
        alt: "Fashion atelier workspace for ORAC Luxe",
        label: "Luxe image",
      }}
    />
  );
}
