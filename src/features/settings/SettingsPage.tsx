import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Settings, Save, Lock, Bell, Globe, Database, ShieldCheck, Mail, Camera, Link, MessageCircle, Bot, AtSign } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";
import { profileSchema, systemSchema, integrationSchema } from "./settings.schema";
import type { ProfileFormValues, SystemFormValues, IntegrationFormValues } from "./settings.schema";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<"profile" | "system" | "integration">("profile");
  const isAdmin = user?.role === "ADMIN";

  // Profile Form
  const {
    register: regProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
    },
  });

  // System Form
  const {
    register: regSystem,
    handleSubmit: handleSystemSubmit,
    formState: { isSubmitting: isSystemSubmitting },
  } = useForm<SystemFormValues>({
    resolver: zodResolver(systemSchema),
    defaultValues: {
      appName: "IT Bootcamp Academy",
      maintenanceMode: false,
      registrationEnabled: true,
      maxStudentsPerCohort: 50,
      defaultCurrency: "IDR",
    },
  });

  // Integration Form
  const {
    register: regIntegration,
    handleSubmit: handleIntegrationSubmit,
    formState: { errors: integrationErrors, isSubmitting: isIntegrationSubmitting },
  } = useForm<IntegrationFormValues>({
    resolver: zodResolver(integrationSchema),
    defaultValues: {
      smtpHost: "",
      smtpPort: 2525,
      smtpUser: "",
      smtpPass: "",
      whatsappApiKey: "",
      whatsappSenderNum: "",
      geminiApiKey: "",
      geminiModel: "gemini-pro"
    },
  });

  const onProfileSave = (data: ProfileFormValues) => {
    console.log("Profile data saved:", data);
    toast.success("Profil Anda berhasil diperbarui!");
  };

  const onSystemSave = (data: SystemFormValues) => {
    if (!isAdmin) {
      toast.error("Hanya Admin yang dapat mengubah pengaturan sistem.");
      return;
    }
    console.log("System data saved:", data);
    toast.success("Pengaturan sistem berhasil disimpan!");
  };

  const onIntegrationSave = (data: IntegrationFormValues) => {
    if (!isAdmin) {
      toast.error("Hanya Admin yang dapat mengubah integrasi API.");
      return;
    }
    console.log("Integration data saved:", data);
    toast.success("Pengaturan integrasi API berhasil disimpan!");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Pengaturan</h1>
        <p className="text-gray-400 text-sm">
          Kelola preferensi akun dan konfigurasi sistem aplikasi.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav Settings */}
        <div className="w-full lg:w-64 space-y-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "profile"
                ? "bg-[#ef6c00] text-white shadow-lg shadow-[#ef6c00]/20"
                : "text-gray-400 hover:text-white hover:bg-[#29221b]"
            }`}
          >
            <User className="w-5 h-5" />
            Profil Saya
          </button>
          <button
            onClick={() => setActiveTab("system")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "system"
                ? "bg-[#ef6c00] text-white shadow-lg shadow-[#ef6c00]/20"
                : "text-gray-400 hover:text-white hover:bg-[#29221b]"
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" />
              Pengaturan Sistem
            </div>
            {!isAdmin && <Lock className="w-3.5 h-3.5 opacity-50" />}
          </button>
          <button
            onClick={() => setActiveTab("integration")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "integration"
                ? "bg-[#ef6c00] text-white shadow-lg shadow-[#ef6c00]/20"
                : "text-gray-400 hover:text-white hover:bg-[#29221b]"
            }`}
          >
            <div className="flex items-center gap-3">
              <Link className="w-5 h-5" />
              Integrasi API
            </div>
            {!isAdmin && <Lock className="w-3.5 h-3.5 opacity-50" />}
          </button>
          
          <div className="h-px bg-[#3b3127] my-4 mx-4"></div>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#29221b] transition-all">
            <Bell className="w-5 h-5" />
            Notifikasi
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#29221b] transition-all">
            <ShieldCheck className="w-5 h-5" />
            Keamanan
          </button>
        </div>

        {/* Form Container */}
        <div className="flex-1">
          {activeTab === "profile" ? (
            <div className="bg-[#29221b] rounded-2xl border border-[#3b3127] shadow-xl overflow-hidden">
              <div className="p-6 border-b border-[#3b3127] bg-[#3b3127]/20">
                <h3 className="text-white font-bold">Informasi Profil</h3>
                <p className="text-gray-400 text-xs mt-1">Perbarui detail personal dan foto profil Anda.</p>
              </div>
              <form onSubmit={handleProfileSubmit(onProfileSave)} className="p-8 space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-4">
                  <div className="relative group">
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=ef6c00&color=fff`}
                      alt="Avatar Preview"
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-[#3b3127] group-hover:border-[#ef6c00] transition-colors"
                    />
                    <button type="button" className="absolute -bottom-2 -right-2 bg-[#ef6c00] p-2 rounded-lg shadow-lg text-white hover:bg-[#f57c00] transition transform hover:scale-110">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-white font-semibold text-lg">{user?.name}</h4>
                    <p className="text-[#ef6c00] text-sm font-bold uppercase tracking-wider">{user?.role === "ADMIN" ? "Administrator" : "Tim Pemasaran"}</p>
                    <p className="text-gray-500 text-xs mt-1">Format yang didukung: JPG, PNG. Maksimal 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        {...regProfile("name")}
                        className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition"
                      />
                    </div>
                    {profileErrors.name && <p className="text-red-500 text-xs">{profileErrors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        {...regProfile("email")}
                        type="email"
                        className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition"
                      />
                    </div>
                    {profileErrors.email && <p className="text-red-500 text-xs">{profileErrors.email.message}</p>}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#3b3127] flex justify-end">
                  <button
                    type="submit"
                    disabled={isProfileSubmitting}
                    className="flex items-center gap-2 px-8 py-3 bg-[#ef6c00] text-white font-bold rounded-xl hover:bg-[#f57c00] shadow-lg shadow-[#ef6c00]/20 transition disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Profil
                  </button>
                </div>
              </form>
            </div>
          ) : activeTab === "system" ? (
            <div className="bg-[#29221b] rounded-2xl border border-[#3b3127] shadow-xl overflow-hidden relative">
              {!isAdmin && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-8 text-center">
                  <div className="bg-red-500/20 p-4 rounded-full mb-4 border border-red-500/30">
                    <Lock className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Akses Terbatas</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">
                    Maaf, hanya administrator yang memiliki izin untuk mengubah konfigurasi sistem.
                  </p>
                </div>
              )}

              <div className="p-6 border-b border-[#3b3127] bg-[#3b3127]/20">
                <h3 className="text-white font-bold">Konfigurasi Sistem</h3>
                <p className="text-gray-400 text-xs mt-1">Atur parameter global aplikasi IT Bootcamp.</p>
              </div>

              <form onSubmit={handleSystemSubmit(onSystemSave)} className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300">Nama Aplikasi</label>
                      <input
                        {...regSystem("appName")}
                        disabled={!isAdmin}
                        className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">Target Siswa / Kohort</label>
                    <input
                      {...regSystem("maxStudentsPerCohort", { valueAsNumber: true })}
                      type="number"
                      disabled={!isAdmin}
                      className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition disabled:opacity-50"
                    />
                  </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-[#1f1a14] border border-[#3b3127] rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-sm font-bold text-white leading-none mb-1">Mode Pemeliharaan</p>
                          <p className="text-[10px] text-gray-500">Kunci akses publik aplikasi sementara.</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        {...regSystem("maintenanceMode")}
                        disabled={!isAdmin}
                        className="w-5 h-5 accent-[#ef6c00]"
                      />
                    </div>

                    <div className="p-4 bg-[#1f1a14] border border-[#3b3127] rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm font-bold text-white leading-none mb-1">Pendaftaran Terbuka</p>
                          <p className="text-[10px] text-gray-500">Status penerimaan siswa mandiri.</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        {...regSystem("registrationEnabled")}
                        disabled={!isAdmin}
                        className="w-5 h-5 accent-[#ef6c00]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#3b3127] flex justify-end">
                  <button
                    type="submit"
                    disabled={isSystemSubmitting || !isAdmin}
                    className="flex items-center gap-2 px-8 py-3 bg-[#ef6c00] text-white font-bold rounded-xl hover:bg-[#f57c00] shadow-lg shadow-[#ef6c00]/20 transition disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-[#29221b] rounded-2xl border border-[#3b3127] shadow-xl overflow-hidden relative">
              {!isAdmin && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-8 text-center">
                  <div className="bg-red-500/20 p-4 rounded-full mb-4 border border-red-500/30">
                    <Lock className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Akses Terbatas</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">
                    Maaf, hanya administrator yang memiliki izin untuk mengubah integrasi API.
                  </p>
                </div>
              )}

              <div className="p-6 border-b border-[#3b3127] bg-[#3b3127]/20">
                <h3 className="text-white font-bold">Integrasi API & Layanan</h3>
                <p className="text-gray-400 text-xs mt-1">Konfigurasi SMTP Email, WhatsApp Gateway, dan layanan AI Gemini.</p>
              </div>

              <form onSubmit={handleIntegrationSubmit(onIntegrationSave)} className="p-8 space-y-8">
                {/* SMTP Settings */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold flex items-center gap-2 border-b border-[#3b3127] pb-2">
                    <AtSign className="w-5 h-5 text-blue-400" /> Pengaturan SMTP Email
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400">SMTP Host</label>
                      <input {...regIntegration("smtpHost")} disabled={!isAdmin} className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition disabled:opacity-50" placeholder="cth: smtp.gmail.com" />
                      {integrationErrors.smtpHost && <p className="text-red-500 text-xs">{integrationErrors.smtpHost.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400">SMTP Port</label>
                      <input {...regIntegration("smtpPort", { valueAsNumber: true })} type="number" disabled={!isAdmin} className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition disabled:opacity-50" placeholder="cth: 465" />
                      {integrationErrors.smtpPort && <p className="text-red-500 text-xs">{integrationErrors.smtpPort.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400">SMTP Username</label>
                      <input {...regIntegration("smtpUser")} disabled={!isAdmin} className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition disabled:opacity-50" />
                      {integrationErrors.smtpUser && <p className="text-red-500 text-xs">{integrationErrors.smtpUser.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400">SMTP Password</label>
                      <input {...regIntegration("smtpPass")} type="password" disabled={!isAdmin} className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition disabled:opacity-50" />
                      {integrationErrors.smtpPass && <p className="text-red-500 text-xs">{integrationErrors.smtpPass.message}</p>}
                    </div>
                  </div>
                </div>

                {/* WhatsApp API */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold flex items-center gap-2 border-b border-[#3b3127] pb-2">
                    <MessageCircle className="w-5 h-5 text-green-500" /> WhatsApp Gateway (Fonnte/Wablas)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400">WhatsApp API Key</label>
                      <input {...regIntegration("whatsappApiKey")} disabled={!isAdmin} className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition disabled:opacity-50" />
                      {integrationErrors.whatsappApiKey && <p className="text-red-500 text-xs">{integrationErrors.whatsappApiKey.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400">Nomor Pengirim</label>
                      <input {...regIntegration("whatsappSenderNum")} disabled={!isAdmin} className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition disabled:opacity-50" placeholder="cth: 6281234567890" />
                      {integrationErrors.whatsappSenderNum && <p className="text-red-500 text-xs">{integrationErrors.whatsappSenderNum.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Gemini API */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold flex items-center gap-2 border-b border-[#3b3127] pb-2">
                    <Bot className="w-5 h-5 text-purple-500" /> Google Gemini AI
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400">Gemini API Key</label>
                      <input {...regIntegration("geminiApiKey")} disabled={!isAdmin} className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition disabled:opacity-50" />
                      {integrationErrors.geminiApiKey && <p className="text-red-500 text-xs">{integrationErrors.geminiApiKey.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400">Model (Default)</label>
                      <select {...regIntegration("geminiModel")} disabled={!isAdmin} className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition disabled:opacity-50 appearance-none">
                        <option value="gemini-3.0-pro">Gemini 3.0 Pro</option>
                        <option value="gemini-3.0-flash">Gemini 3.0 Flash</option>
                        <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                      </select>
                      {integrationErrors.geminiModel && <p className="text-red-500 text-xs">{integrationErrors.geminiModel.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#3b3127] flex justify-end">
                  <button
                    type="submit"
                    disabled={isIntegrationSubmitting || !isAdmin}
                    className="flex items-center gap-2 px-8 py-3 bg-[#ef6c00] text-white font-bold rounded-xl hover:bg-[#f57c00] shadow-lg shadow-[#ef6c00]/20 transition disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Integrasi
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
