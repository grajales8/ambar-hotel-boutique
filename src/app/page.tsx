import WelcomeHero from "@/components/home/WelcomeHero";
import MenuGrid from "@/components/home/MenuGrid";

export default function HomePage() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#070708" }}
    >
      <main
        className="relative mx-auto flex h-[100dvh] w-full max-w-[430px] flex-col overflow-y-hidden overflow-x-hidden md:my-0 md:h-screen md:shadow-[0_0_80px_rgba(0,0,0,0.6)]"
        style={{ backgroundColor: "#0B0B0C" }}
      >
        <WelcomeHero />
        <div className="flex min-h-0 flex-1" style={{ backgroundColor: "#0B0B0C" }}>
          <MenuGrid />
        </div>
      </main>
    </div>
  );
}
