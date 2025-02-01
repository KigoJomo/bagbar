import { ReactNode } from 'react'
import AdminNav from '../components/admin/AdminNav';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminNav />
      <div className="mt-8">{children}</div>
    </>
  )
}