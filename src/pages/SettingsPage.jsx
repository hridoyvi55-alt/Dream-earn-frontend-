import BottomNav from "../components/BottomNav";

export default function SettingsPage() {
  return (
    <div className="min-h-screen pb-20">
      <div className="container p-8">
        <div className="card p-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-[#9ca3af] mt-2">Design later.</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
