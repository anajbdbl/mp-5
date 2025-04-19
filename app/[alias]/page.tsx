import { redirect } from 'next/navigation';
import { findAlias } from '@/lib/db';

interface AliasPageProps {
  params: {
    alias: string;
  };
}

export default async function AliasRedirectPage({ params }: AliasPageProps) {
  const record = await findAlias(params.alias);

  if (!record) {
    return <h1>Alias not found</h1>;
  }

  redirect(record.url);
}
