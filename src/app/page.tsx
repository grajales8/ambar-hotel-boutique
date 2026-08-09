import WelcomeHero from "@/components/home/WelcomeHero";
import MenuGrid from "@/components/home/MenuGrid";

export default function HomePage() {
  return (
    <main className="flex flex-col bg-[var(--color-sand)]">
      <WelcomeHero />
      <MenuGrid />
      <footer className="px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-2 text-center">
        <div className="gold-hairline mx-auto mb-2 w-16" />
        <p className="text-xs text-[var(--color-ink-soft)]">
          AMBAR Hotel Boutique · Cali, Colombia
        </p>
      </footer>
    </main>
  );
}
