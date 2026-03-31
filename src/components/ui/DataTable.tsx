import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Settings2, Check } from "lucide-react";
import { useTableStore } from "../../store/useTableStore";

export interface Column<T> {
  header: string;
  key: string;
  className?: string;
  headerClassName?: string;
  render?: (item: T) => ReactNode;
  align?: "left" | "right" | "center";
  canHide?: boolean; // New property to prevent hiding essential columns
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
}

interface DataTableProps<T> {
  tableId: string;
  columns: Column<T>[];
  data: T[];
  pagination?: PaginationProps;
  emptyState?: ReactNode;
  isLoading?: boolean;
}

export default function DataTable<T extends { id: string | number }>({
  tableId,
  columns,
  data,
  pagination,
  emptyState,
  isLoading,
}: DataTableProps<T>) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { hiddenColumns, toggleColumn } = useTableStore();
  
  const currentHidden = hiddenColumns[tableId] || [];
  const visibleColumns = columns.filter(col => !currentHidden.includes(col.key));

  return (
    <div className="bg-[#29221b] rounded-2xl border border-[#3b3127] shadow-xl overflow-hidden flex flex-col">
      {/* Table Header / Actions */}
      <div className="px-8 py-4 border-b border-[#3b3127] flex justify-end relative">
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            isSettingsOpen ? "bg-[#ef6c00] text-white" : "text-gray-400 hover:bg-[#3b3127] hover:text-white"
          }`}
        >
          <Settings2 className="w-4 h-4" />
          Kolom
        </button>

        {isSettingsOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsSettingsOpen(false)}
            />
            <div className="absolute right-8 top-14 w-56 bg-[#1f1a14] border border-[#3b3127] rounded-xl shadow-2xl z-20 p-2 animate-in fade-in zoom-in duration-200">
              <p className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-[#3b3127] mb-1">
                Tampilkan Kolom
              </p>
              <div className="max-h-60 overflow-y-auto">
                {columns.map((column) => (
                  <button
                    key={column.key}
                    disabled={column.canHide === false}
                    onClick={() => toggleColumn(tableId, column.key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                      column.canHide === false ? "opacity-50 cursor-not-allowed" : "hover:bg-[#3b3127]"
                    } ${!currentHidden.includes(column.key) ? "text-white" : "text-gray-500"}`}
                  >
                    <span>{column.header}</span>
                    {!currentHidden.includes(column.key) && (
                      <Check className="w-4 h-4 text-[#ef6c00]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#3b3127]">
              {visibleColumns.map((column, index) => (
                <th
                  key={column.key || index}
                  className={`px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider ${
                    column.align === "right" ? "text-right" : ""
                  } ${column.headerClassName || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3b3127]">
            {isLoading ? (
              <tr>
                <td colSpan={visibleColumns.length} className="px-8 py-12 text-center text-gray-400">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-2 h-2 bg-[#ef6c00] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#ef6c00] rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 bg-[#ef6c00] rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-[#3b3127]/30 transition group">
                  {visibleColumns.map((column, index) => (
                    <td
                      key={column.key || index}
                      className={`px-8 py-6 ${column.align === "right" ? "text-right" : ""} ${
                        column.className || ""
                      }`}
                    >
                      {column.render ? column.render(item) : (item as any)[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={visibleColumns.length} className="px-8 py-12 text-center text-gray-500">
                  {emptyState || "Tidak ada data tersedia"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="px-8 py-6 border-t border-[#3b3127] flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Menampilkan{" "}
            <span className="text-white font-medium">
              {Math.min((pagination.currentPage - 1) * pagination.pageSize + 1, pagination.totalItems)}
              {" sampai "}
              {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
            </span>{" "}
            dari <span className="text-white font-medium">{pagination.totalItems}</span> data
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={pagination.currentPage === 1}
              onClick={() => pagination.onPageChange?.(pagination.currentPage - 1)}
              className="p-2 text-gray-500 hover:text-white transition disabled:opacity-20 border border-[#3b3127] rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Simple pagination numbers */}
            {Array.from({ length: Math.min(pagination.totalPages, 5) }).map((_, i) => {
              const pageNum = i + 1;
              if (pagination.totalPages > 5 && i === 3) {
                 return <span key="ellipsis" className="text-gray-500 px-2">...</span>;
              }
              if (pagination.totalPages > 5 && i === 4) {
                 return (
                    <button
                      key={pagination.totalPages}
                      onClick={() => pagination.onPageChange?.(pagination.totalPages)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition ${
                        pagination.currentPage === pagination.totalPages
                          ? "bg-[#ef6c00] text-white"
                          : "text-gray-400 hover:bg-[#3b3127] hover:text-white"
                      }`}
                    >
                      {pagination.totalPages}
                    </button>
                  );
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => pagination.onPageChange?.(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition ${
                    pagination.currentPage === pageNum
                      ? "bg-[#ef6c00] text-white"
                      : "text-gray-400 hover:bg-[#3b3127] hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => pagination.onPageChange?.(pagination.currentPage + 1)}
              className="p-2 text-gray-500 hover:text-white transition disabled:opacity-20 border border-[#3b3127] rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
