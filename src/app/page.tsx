import WelcomeHero from "@/components/home/WelcomeHero";
import MenuGrid from "@/components/home/MenuGrid";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-sand)]">
      <WelcomeHero />
      <MenuGrid />
      <footer className="mt-auto px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-4 text-center">
        <div className="gold-hairline mx-auto mb-3 w-16" />
        <p className="text-xs text-[var(--color-ink-soft)]">
          AMBAR Hotel Boutique · Cali, Colombia
        </p>
      </footer>
    </main>
  );
}
