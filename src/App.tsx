import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";
import { useSettingsStore } from "./store/useSettingsStore";

export default function App() {
  const { theme, fontSize, setTheme, setFontSize } = useSettingsStore();

  // Initialize theme & font size on first load
  useEffect(() => {
    setTheme(theme);
    setFontSize(fontSize);
  }, [theme, fontSize, setTheme, setFontSize]);

  return (
    <div className="min-h-screen bg-[#1f1a14] transition-colors duration-300 dark:bg-[#1f1a14] light:bg-gray-50">
      <AppRouter />
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: theme === 'dark' ? '#29221b' : '#fff',
            color: theme === 'dark' ? '#fff' : '#1f1a14',
            border: theme === 'dark' ? '1px solid #3b3127' : '1px solid #e5e7eb',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: theme === 'dark' ? '#29221b' : '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: theme === 'dark' ? '#29221b' : '#fff',
            },
          },
        }}
      />
    </div>
  );
}
