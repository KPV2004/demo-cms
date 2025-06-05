import { Icon } from "@iconify/react/dist/iconify.js";
import Confirm from "@/components/Confirm";

import { useEffect, useState } from "react";

export default function News() {
    const [sortOption, setSortOption] = useState('date'); // เริ่มต้นเรียงตามวันที่
    const [id, setId] = useState(1); // เริ่มต้น ID เป็น 1
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all'); // สถานะเริ่มต้นเป็น 'ทั้งหมด'
    const [newsData, setNewsData] = useState(
        [
            { id: 1, thumbnail: 'https://images.indianexpress.com/2025/06/IND-football-11.jpg?w=640', category: 'ข่าวสารที่ 1', date: '2023-10-01', status: 'เผยแพร่', statusCheck: 'published' },
            { id: 2, thumbnail: 'https://images.indianexpress.com/2025/06/IND-football-11.jpg?w=640', category: 'ข่าวสารที่ 2', date: '2023-10-02', status: 'ร่าง', statusCheck: 'draft' },
            { id: 3, thumbnail: 'https://images.indianexpress.com/2025/06/IND-football-11.jpg?w=640', category: 'ข่าวสารที่ 3', date: '2023-10-03', status: 'เก็บถาวร', statusCheck: 'archived' },
        ]
    );
    const [showConfirm, setShowConfirm] = useState(false);



    const option = [
        { value: 'date', label: 'วันที่' },
        { value: 'popularity', label: 'ความนิยม' },
        { value: 'category', label: 'หมวดหมู่' },
        { value: 'author', label: 'ผู้เขียน' }
    ]
    const status = [
        { value: 'all', label: 'ทั้งหมด' },
        { value: 'published', label: 'เผยแพร่' },
        { value: 'draft', label: 'ร่าง' },
        { value: 'archived', label: 'เก็บถาวร' }
    ]



    useEffect(() => {
        let sorted = [...newsData]; // copy เพื่อไม่ mutate โดยตรง

        if (sortOption === 'date') {
            sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (sortOption === 'popularity') {
            sorted.sort((a, b) => b.id - a.id);
        } else if (sortOption === 'category') {
            sorted.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortOption === 'author') {
            sorted = [...newsData]; // ไม่มีข้อมูลผู้เขียน
        }

        setNewsData(sorted); // trigger React re-render
    }, [sortOption]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('เรียงตาม:', event.target.value);
        setSortOption(event.target.value);
    };
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('สถานะ:', event.target.value);
        setFilterStatus(event.target.value);
    }
    const handleDelete = (newsId: number) => {
        setId(newsId);
        setShowConfirm(true);
    };

    const handleConfirm = (result: boolean) => {
        setShowConfirm(false);

        if (result) {
            setIsLoading(true);

            // จำลอง delay เช่น ลบจาก server
            setTimeout(() => {
                setNewsData(prev => prev.filter(item => item.id !== id));
                setIsLoading(false);
                setShowSuccess(true);

                setTimeout(() => setShowSuccess(false), 2000);
            }, 1500); // เปลี่ยนเป็นเรียก API จริงได้
        }
    };


    return (
        <div className="flex flex-col  h-full p-5">
            <h1 className="text-2xl font-medium">จัดการข่าวสาร</h1>
            <div className="w-full flex flex-col md:flex-row gap-4 my-4 md:justify-between ">
                <div className="md:w-[70%] w-full flex flex-col md:flex-row gap-4 justify-around">
                    <div className="relative md:w-[60%] w-[100%]">
                        <p>แถบค้นหา</p>
                        <input
                            type="text"
                            placeholder="ค้นหาข่าวสาร..."
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Icon icon="material-symbols:search" width="20" height="20" className="absolute right-3 bottom-3" />
                    </div>
                    <div className="md:w-[20%] w-[100%]">
                        <p>เรียงตาม</p>
                        <select
                            className="w-full p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            onChange={handleSortChange}
                        >
                            <option value="" disabled></option>
                            {option.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="md:w-[20%] w-[100%]">
                        <p >สถานะ</p>
                        <select className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            onChange={handleFilterChange}
                        >
                            <option value="" disabled></option>
                            {status.map((stat) => (
                                <option key={stat.value} value={stat.value}>
                                    {stat.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="self-end md:w-[20%] w-[100%] px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                    + เพิ่มข่าวสาร
                </button>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full border border-gray-300 bg-white rounded-md overflow-hidden min-w-[800px]">
                    <thead className="bg-white text-gray-700 text-left text-sm font-semibold">
                        <tr className="border-b border-gray-200">
                            <th className="p-3 text-center">ลำดับที่</th>
                            <th className="p-3 text-center">รูปภาพ</th>
                            <th className="p-3 text-center">หัวข้อ</th>
                            <th className="p-3 text-center">วันที่</th>
                            <th className="p-3 text-center">สถานะ</th>
                            <th className="p-3 text-center">การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsData.map((item, index) => (
                            (filterStatus === 'all' || item.statusCheck.toLowerCase() === filterStatus) && (<tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="p-3 text-sm font-medium text-center">{index + 1}</td>
                                <td className="p-3">
                                    <div className="flex justify-center">
                                        <img src={item.thumbnail} alt={item.category} className="w-24 h-auto rounded-md" />
                                    </div>
                                </td>
                                <td className="p-3 text-sm font-medium text-center">{item.category}</td>
                                <td className="p-3 text-sm text-gray-600 text-center">{item.date}</td>
                                <td
                                    className={`p-3 text-sm font-semibold text-center ${item.statusCheck === 'published'
                                        ? 'text-green-600'
                                        : item.statusCheck === 'draft'
                                            ? 'text-yellow-600'
                                            : 'text-gray-500'
                                        }`}
                                >
                                    {item.status}
                                </td>
                                <td className="p-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            className="hover:bg-blue-100 rounded-full p-1 transition-colors"
                                            onClick={() => alert(`แก้ไขข่าวสาร ID: ${item.id}`)}
                                        >
                                            <Icon icon="material-symbols:edit" width="20" height="20" className="text-blue-500 hover:text-blue-700" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="hover:bg-red-100 rounded-full p-1 transition-colors"
                                        >
                                            <Icon icon="material-symbols:delete" width="20" height="20" className="text-red-500 hover:text-red-700" />
                                        </button>
                                        {/* Modal */}
                                        {showConfirm && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                                                <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
                                                    <Confirm onConfirm={handleConfirm} />
                                                </div>
                                            </div>
                                        )}
                                        {/* Success Message */}
                                        {showSuccess && (
                                            <div className="fixed bottom-5 right-5 z-50 bg-green-500 text-white px-4 py-2 rounded shadow transition-opacity duration-500">
                                                ลบเสร็จสิ้น
                                            </div>
                                        )}
                                        {isLoading && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                                    <p className="text-white text-lg">กำลังลบ...</p>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </td>

                            </tr>)
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
