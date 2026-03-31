import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type FontSize = 'very-small' | 'small' | 'medium';

interface SettingsState {
  theme: Theme;
  fontSize: FontSize;
  setTheme: (theme: Theme) => void;
  setFontSize: (fontSize: FontSize) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      fontSize: 'small',
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
      setFontSize: (fontSize) => {
        set({ fontSize });
        const html = document.documentElement;
        html.classList.remove('text-[12px]', 'text-[14px]', 'text-[16px]');
        switch (fontSize) {
          case 'very-small': html.classList.add('text-[12px]'); break;
          case 'small': html.classList.add('text-[14px]'); break;
          case 'medium': html.classList.add('text-[16px]'); break;
        }
      },
    }),
    {
      name: 'bootcampit-settings',
    }
  )
);
