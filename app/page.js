import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import MusicPlayer from "@/components/MusicPlayer";
import MainContent from "@/components/MainContent";

const Page = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col bg-black scrollbar-hide">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 pt-[70px] bg-black gap-20">
        {/* Fixed Sidebar */}
        <div className="fixed top-[70px] left-0 w-82 h-[calc(100vh-140px)] z-40">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="main-content ml-72 flex-1 h-[calc(100vh-80px)] overflow-y-auto pb-[85px]">
          <div className="min-h-[calc(100vh-140px)] px-2 py-0 flex flex-col gap-2">
            <MainContent />
            <Footer />
          </div>
        </main>
      </div>

      {/* Fixed Music Player */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Page;
