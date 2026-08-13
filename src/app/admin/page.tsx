import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirect /admin to the orders dashboard by default
  redirect('/admin/orders');
}
