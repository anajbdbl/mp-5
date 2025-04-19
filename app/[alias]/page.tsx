import { redirect } from 'next/navigation';
import { findAlias } from '@/lib/db';

export default async function RedirectPage({ params }: { params: Promise<{ alias: string }> }) {
  const { alias } = await params; 
  const url = await findAlias(alias); 

  if (!url) {
    return (
      <h2>Alias was not found</h2>
    );
  }

  redirect(url);
}