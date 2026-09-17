import WelcomeHero from "@/components/home/WelcomeHero";
import MenuGrid from "@/components/home/MenuGrid";

export default function HomePage() {
  return (
    <main className="flex h-[100svh] w-full flex-col overflow-y-hidden overscroll-none overflow-x-hidden" style={{ backgroundColor: "#0B0B0C" }}>
      <WelcomeHero />
      <div className="flex min-h-0 flex-1" style={{ backgroundColor: "#0B0B0C" }}>
        <MenuGrid />
      </div>
    </main>
  );
}
