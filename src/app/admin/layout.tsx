export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full !max-w-none !mx-0 !shadow-none bg-[#0B0B0C] min-h-screen">
      {children}
    </div>
  );
}
