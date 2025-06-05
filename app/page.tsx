'use client';
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  // ฟังก์ชันสำหรับรับค่าจาก Menu ที่เลือกจาก Navbar
  const handleData = (data: string) => {
    console.log('รับค่าจาก Child:', data);
  };
  return (
    <div className="flex flex-col md:flex-row h-screen font-primary">
      <Navbar onSend={handleData} />
    </div>
    
    
  );
}
