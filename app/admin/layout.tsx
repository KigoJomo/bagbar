import { ReactNode } from 'react'
import AdminNav from '../components/admin/AdminNav';
import { ViewPreferenceProvider } from '@/context/ViewPreferenceContext';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ViewPreferenceProvider>
        <AdminNav />
        {children}
      </ViewPreferenceProvider>
    </>
  )
}