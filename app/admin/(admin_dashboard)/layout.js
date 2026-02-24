import AdminLayoutShell from "@/components/admin_components/AdminLayoutShell";

 export default function AdminLayout({ children }) {
  return (
    <div>
      
    <AdminLayoutShell>{children}</AdminLayoutShell>
    </div>
  );
}