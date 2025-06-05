'use client'

import { Icon } from "@iconify/react/dist/iconify.js"; // ใช้ Iconify สำหรับแสดงไอคอน
import { useEffect, useState } from "react"; // ใช้ useState และ useEffect จาก React

export default function Navbar({ onSend }: { onSend: (data: string) => void }) {
    const [selected, setSelected] = useState<string>('dashboard');

    // useEffect เพื่อส่งค่าที่เลือกไปยัง parent component เพื่อที่จะเปลี่ยนแปลงข้อมูล
    useEffect(() => {
        onSend(selected);
    }, [selected]);

    // รายการเมนูที่จะแสดงใน Navbar
    const menuItems = [
        { id: 'dashboard', label: 'แดชบอร์ด', icon: 'material-symbols:space-dashboard' },
        { id: 'news', label: 'ข่าวสาร', icon: 'material-symbols:newsmode-rounded' },
        { id: 'contact', label: 'ติดต่อ', icon: 'material-symbols:contact-page' }
    ];
    
    return (
        <div className="group h-full hover:w-[15%] w-[5%] py-4 bg-white text-gray-400 transition-all duration-300 ease-out">
            <div className="text-lg text-green-700 font-bold flex flex-col p-4 justify-start items-center">
                <span className="hidden group-hover:block">CMS Website</span>
                <span className="block group-hover:hidden">CMS</span>
            </div>
            <div className="flex flex-col gap-5 mx-4">
                {/* รายการเมนู */}
                {menuItems.map(item => (
                    <div key={item.id}>
                        <div
                            id={item.id}
                            onClick={() => setSelected(item.id)}
                            className={`flex w-full py-2 justify-start items-center gap-[5%] px-2 cursor-pointer
                                ${selected === item.id ? 'border-green-700 border-l-2 bg-green-200 text-green-700' : 'hover:border-l-2 hover:border-gray-400 hover:bg-gray-100 hover:text-gray-700'}
                            `}
                        >
                            <Icon icon={item.icon} width="18" height="18" />
                            <h1 className="hidden group-hover:block">{item.label}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
