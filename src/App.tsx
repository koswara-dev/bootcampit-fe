import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#29221b',
            color: '#fff',
            border: '1px solid #3b3127',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#29221b',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#29221b',
            },
          },
        }}
      />
    </>
  );
}
