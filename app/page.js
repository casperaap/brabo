import Navbar from '@/components/header';
import CardForm from '@/components/card';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
  <h1 className="font-semibold text-2xl sm:text-3xl text-center">
    Be a part of&nbsp;
    <span className="inline-block px-1 bg-primary text-white">
      Brabo&nbsp;Media
    </span>
  </h1>

  {/* sub‑text */}
  <p className="font-semibold text-sm sm:text-base text-center max-w-md">
    Every voice counts, every contribution is appreciated.
  </p>
        <Navbar/>
        <CardForm/>
      </main>
    </div>
  );
}
