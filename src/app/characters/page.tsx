import { AvatarGrid } from "@/components/ui/avatar-grid";
import { characters } from "@/lib/data";

export default function CharactersPage() {
  return (
    <main className="relative w-full min-h-screen bg-black pt-32 pb-24 overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-accent-primary/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-16">
        <div className="text-left w-full">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-widest mb-2">
            The Nine
          </h1>
          <p className="text-gray-500 font-mono tracking-[0.3em] uppercase text-xs">
            Avataars of the Kirit Universe
          </p>
        </div>
        
        {/* Render the AvatarGrid with all characters */}
        <AvatarGrid />
      </div>
    </main>
  );
}
