'use client'

import { Icon } from "@iconify/react/dist/iconify.js";

export default function Navbar() {
    return (
        <div className=" h-full p-4 bg-gray-800 text-white">
            <div className="text-lg font-bold flex flex-col p-4 justify-center items-center">MyApp</div>
            <div>
                <div >
                    <a href="#" className="hover:bg-red-200 flex flex-col p-4 justify-center items-center gap-1">
                        <Icon icon="material-symbols:space-dashboard" width="24" height="24" />
                        <h1>แดชบอร์ด</h1>
                    </a>
                </div>
                <div>
                    <a href="#" className="hover:bg-red-200 flex flex-col p-4 justify-center items-center gap-1">
                        <Icon icon="material-symbols:newsmode-rounded" width="24" height="24" />
                        <h1>ข่าวสาร</h1>
                    </a>
                </div>
                <div>
                    <a href="#" className="hover:bg-red-200 flex flex-col p-4 justify-center items-center gap-1">
                        <Icon icon="material-symbols:contact-page" width="24" height="24" />
                        <h1>ติดต่อ</h1>
                    </a>
                </div>
            </div>
        </div>
    );
}