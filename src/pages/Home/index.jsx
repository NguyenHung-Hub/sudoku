import React from "react";

const HomePage = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-slate-600">
      <div className="fixed left-0 top-0 z-10 h-screen w-screen">
        <video
          className="absolute top-0 z-10 h-full w-full object-cover"
          // width="1000"
          // height="600"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="./video/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-20 bg-black/40"></div>
      </div>
      <div className="absolute left-1/2 top-1/2 z-20 h-auto w-[500px] -translate-x-1/2 -translate-y-1/2 ">
        <h1 className="text-center text-[110px] font-bold uppercase tracking-wide text-[#567B79]">
          Sudoku
        </h1>
        <div className="flex  h-full  w-full flex-col items-center justify-center p-2">
          <a
            href="/sudoku"
            className="w-2/3 rounded-lg bg-[#B2B47E] px-8 py-4 text-center text-2xl font-bold uppercase tracking-wide text-[#FFFCF9] hover:cursor-pointer"
          >
            New Game
          </a>
          <a
            href="/sudoku"
            className="mt-6 w-2/3 rounded-lg bg-[#868188] px-8 py-4 text-center text-2xl font-bold uppercase tracking-wide text-[#FFFCF9] hover:cursor-pointer"
          >
            Continue
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
