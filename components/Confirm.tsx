export default function Confirm({ onConfirm }: { onConfirm: (data: boolean) => void }) {
    return (
        <div className="relative flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">ยืนยันการดำเนินการ</h1>
            <p className="text-gray-600 mb-2">คุณต้องการลบรายการนี้หรือไม่?</p>
            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => onConfirm(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    ยืนยัน
                </button>
                <button
                    onClick={() => onConfirm(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    ยกเลิก
                </button>
            </div>
        </div>
    );
}
