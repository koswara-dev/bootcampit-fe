import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TableState {
  hiddenColumns: Record<string, string[]>; // tableId -> columnKeys[]
  toggleColumn: (tableId: string, columnKey: string) => void;
  setHiddenColumns: (tableId: string, columnKeys: string[]) => void;
}

export const useTableStore = create<TableState>()(
  persist(
    (set) => ({
      hiddenColumns: {},
      toggleColumn: (tableId, columnKey) =>
        set((state) => {
          const currentHidden = state.hiddenColumns[tableId] || [];
          const isHidden = currentHidden.includes(columnKey);
          const newHidden = isHidden
            ? currentHidden.filter((key) => key !== columnKey)
            : [...currentHidden, columnKey];
          
          return {
            hiddenColumns: {
              ...state.hiddenColumns,
              [tableId]: newHidden,
            },
          };
        }),
      setHiddenColumns: (tableId, columnKeys) =>
        set((state) => ({
          hiddenColumns: {
            ...state.hiddenColumns,
            [tableId]: columnKeys,
          },
        })),
    }),
    {
      name: 'table-preferences',
    }
  )
);
