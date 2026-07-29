import { guideSections } from "@/data/guide";
import PageHeader from "@/components/ui/PageHeader";
import GuideAccordion from "@/components/ui/GuideAccordion";

export default function GuidePage() {
  const sections = guideSections.filter((s) => s.scope === "habitacion");

  return (
    <main className="min-h-screen bg-[var(--color-sand)] pb-10">
      <PageHeader title="Guía de la habitación" subtitle="Todo lo que necesitas saber" />
      <GuideAccordion sections={sections} defaultOpenId="bienvenida" />
    </main>
  );
}
