import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Terminal, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { loginSchema } from "./auth.schema";
import type { LoginForm } from "./auth.schema";
import { useAuthStore } from "@/app/store/auth.store";
import { login } from "./auth.service";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@bootcamp.it",
      password: "password",
      remember: true,
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      setAuth(response.token, response.user);
      toast.success("Login berhasil!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Email atau kata sandi salah");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1f1a14] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <div className="bg-[#ef6c00] p-2 rounded-md">
          <Terminal className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          IT <span className="text-[#ef6c00]">BOOTCAMP</span>
        </span>
      </div>

      <div className="absolute top-8 right-8 hidden md:flex gap-6 text-sm font-medium text-gray-400">
        <a href="#" className="hover:text-white transition">Kursus</a>
        <a href="#" className="hover:text-white transition">Kurikulum</a>
        <a href="#" className="hover:text-white transition">Cerita Sukses</a>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#29221b] py-10 px-8 shadow-2xl rounded-2xl border border-[#3b3127]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Selamat Datang Kembali</h2>
            <p className="text-gray-400 text-sm">
              Lanjutkan perjalananmu menjadi developer profesional.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className="block w-full pl-10 pr-3 py-3 border border-[#3b3127] rounded-lg bg-[#1f1a14] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] focus:border-[#ef6c00] sm:text-sm"
                  placeholder="dev@contoh.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-300">
                  Kata Sandi
                </label>
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#ef6c00] hover:text-[#f57c00]">
                    Lupa Kata Sandi?
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-10 pr-10 py-3 border border-[#3b3127] rounded-lg bg-[#1f1a14] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] focus:border-[#ef6c00] sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                {...register("remember")}
                className="h-4 w-4 rounded border-[#3b3127] bg-[#1f1a14] text-[#ef6c00] focus:ring-[#ef6c00] focus:ring-offset-[#29221b]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Tetap masuk
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#ef6c00] hover:bg-[#f57c00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ef6c00] focus:ring-offset-[#29221b] disabled:opacity-50 transition items-center gap-2"
              >
                {isLoading ? "Masuk..." : (
                  <>
                    Masuk ke Portal <LogIn className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-[#3b3127] text-center">
              <p className="text-sm text-gray-400 mb-4">Baru di bootcamp ini?</p>
              <button
                type="button"
                className="w-full sm:w-auto inline-flex justify-center items-center py-2 px-6 border border-[#0ea5e9] text-[#0ea5e9] rounded-full hover:bg-[#0ea5e9]/10 transition text-sm font-medium"
              >
                Daftar Sekarang
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 text-xs text-gray-500">
        <div className="flex items-center gap-4 mb-2">
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Terakreditasi Industri</span>
           <span className="flex items-center gap-1 text-[#0ea5e9]">👥 10rb+ Alumni</span>
        </div>
        <p>© 2024 IT Bootcamp Academy. Hak cipta dilindungi undang-undang.</p>
      </div>
    </div>
  );
}
