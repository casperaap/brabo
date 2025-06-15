import Navbar from '@/components/header';
import CardForm from '@/components/card';
import InspirationPopup from '@/components/InspirationPopup';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
  <h1 className="font-semibold text-2xl sm:text-3xl text-center">
    Wees een deel van&nbsp;
    <span className="inline-block px-1 bg-[#E30713] text-white">
      Brabo&nbsp;Media
    </span>
  </h1>

  {/* sub‑text */}
  <p className="font-semibold text-sm sm:text-base text-center max-w-md">
    Iedereen telt, alle contributies worden geapprecieerd.
  </p>
        <Navbar/>
        <CardForm/>
        <InspirationPopup/>
      </main>
    </div>
  );
}
