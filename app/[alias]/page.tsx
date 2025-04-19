import { redirect } from 'next/navigation';
import { findAlias } from '@/lib/db';

export default async function RedirectPage({ params }: { params: { alias: string } }) {
  const { alias } = params;

  const record = await findAlias(alias);

  if (!record) {
    return <h1>Alias not found</h1>;
  }

  redirect(record.url);
}
