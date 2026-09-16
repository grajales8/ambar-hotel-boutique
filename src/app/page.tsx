import WelcomeHero from "@/components/home/WelcomeHero";
import MenuGrid from "@/components/home/MenuGrid";

export default function HomePage() {
  return (
    <main className="flex h-[100svh] w-full max-w-full flex-col overflow-y-hidden overflow-x-hidden overscroll-none" style={{ backgroundColor: "#0B0B0C" }}>
      <WelcomeHero />
      <div className="flex min-h-0 flex-1 shrink overflow-hidden" style={{ backgroundColor: "#0B0B0C" }}>
        <MenuGrid />
      </div>
    </main>
  );
}
