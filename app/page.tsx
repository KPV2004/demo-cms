'use client';
import Contact from "@/components/Contact";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import News from "@/components/News";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  // ฟังก์ชันสำหรับรับค่าจาก Menu ที่เลือกจาก Navbar
  const [selectedPage, setSelectedPage] = useState<string>('dashboard');
  const pageList = [
        { id: 'dashboard', page: <Dashboard/> },
        { id: 'news', page: <News/> },
        { id: 'contact', page: <Contact/> }
    ];

  const handleData = (data: string) => {
    setSelectedPage(data);
    console.log('รับค่าจาก Child:', data);
  };
  return (
    <div className="flex flex-col md:flex-row h-screen font-primary">
      <Navbar onSend={handleData} />
      <main className="flex-1 text-gray-700 bg-gray-100">
        {pageList.find(page => page.id === selectedPage)?.page}
      </main>
    </div>
  );
}
