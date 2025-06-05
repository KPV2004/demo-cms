'use client'

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export default function Navbar() {
    const [selected, setSelected] = useState<string>('dashboard');

     const menuItems = [
        { id: 'dashboard', label: 'แดชบอร์ด', icon: 'material-symbols:space-dashboard' },
        { id: 'news', label: 'ข่าวสาร', icon: 'material-symbols:newsmode-rounded' },
        { id: 'contact', label: 'ติดต่อ', icon: 'material-symbols:contact-page' }
    ];
    
    return (
        <div className=" h-full w-[15%] py-4  bg-white text-gray-400">
            <div className="text-lg text-green-700 font-bold flex flex-col p-4 justify-start items-center">CMS Website</div>
            <div className="flex flex-col gap-5 mx-4">
               {menuItems.map(item => (
                    <div key={item.id}>
                        <div
                            id={item.id}
                            onClick={() => setSelected(item.id)}
                            className={`flex w-full py-2 justify-start items-center gap-[5%] px-2 cursor-pointer
                                ${selected === item.id ? 'border-green-700 border-l-2 bg-green-200 text-green-700' : 'hover:border-l-2 hover:border-gray-400 hover:bg-gray-100 hover:text-gray-700'}
                            `}
                        >
                            <Icon icon={item.icon} width="20" height="20" />
                            <h1>{item.label}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}