import WelcomeHero from "@/components/home/WelcomeHero";
import MenuGrid from "@/components/home/MenuGrid";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: "#0B0B0C" }}>
      <WelcomeHero />
      <div className="flex-1" style={{ backgroundColor: "#0B0B0C" }}>
        <MenuGrid />
      </div>
    </main>
  );
}
