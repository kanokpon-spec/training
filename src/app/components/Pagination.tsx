import { useState } from "react";

interface PaginationProps {
  data: any[];
  pages: number;
  children: (
    currentItems: any[],
    currentPage: number,
    rowsPerPage: number
  ) => React.ReactNode;
}

const Pagination: React.FC<PaginationProps> = ({ data, pages, children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pages);
  const startIndex = (currentPage - 1) * pages;
  const endIndex = startIndex + pages;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div>
      {/* ส่ง currentPage และ rowsPerPage ไปให้ component ที่ใช้ */}
      {children(currentItems, currentPage, pages)}

      {/* ปุ่ม Pagination */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1} 
          className="h-10 w-10 text-xs hover:scale-105 disabled:scale-100 duration-200 mx-1 cursor-pointer bg-gray-500 rounded-full disabled:opacity-20 disabled:cursor-not-allowed"
        >
          ก่อน
        </button>
        <span className="px-4 py-2 text-gray-500">{currentPage} / {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages} 
          className="h-10 w-10 text-xs hover:scale-105 disabled:scale-100 duration-200 mx-1 cursor-pointer bg-gray-500 rounded-full disabled:opacity-20 disabled:cursor-not-allowed"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default Pagination;
