import { guideSections } from "@/data/guide";
import PageHeader from "@/components/ui/PageHeader";
import GuideAccordion from "@/components/ui/GuideAccordion";

export default function HotelGuidePage() {
  const sections = guideSections.filter((s) => s.scope === "hotel");

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-10">
      <PageHeader title="Guía del Hotel" subtitle="Historia, horarios y todo sobre AMBAR" />
      <GuideAccordion sections={sections} defaultOpenId="historia" />
    </main>
  );
}
