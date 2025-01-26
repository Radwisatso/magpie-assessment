import AppBar from "./_components/AppBar";
import Navigation from "./_components/Navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="h-full">
        {/* App Bar */}
        <div className="w-full h-16 border-b">
          <div className="max-w-[1400px] mx-auto px-6 h-full">
            <AppBar />
          </div>
        </div>
        <div className="flex h-[calc(100vh-64px)]">
          <div className="max-w-[1440px] h-full w-full mx-auto px-6 flex">
            <div className="w-64 border-r h-full">
              <Navigation />
              
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
