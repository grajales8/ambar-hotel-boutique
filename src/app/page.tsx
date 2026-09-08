import Image from "next/image";
import WelcomeHero from "@/components/home/WelcomeHero";
import MenuGrid from "@/components/home/MenuGrid";

export default function HomePage() {
  return (
    <main className="flex flex-col bg-[var(--color-navy)]">
      <WelcomeHero />
      <MenuGrid />
      <footer className="flex flex-col items-center gap-2 bg-[var(--color-sand)] px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-6">
        <Image
          src="/brand/logo-terracota.png"
          alt="AMBAR Hotel Boutique"
          width={640}
          height={486}
          className="h-auto w-[110px]"
        />
      </footer>
    </main>
  );
}
