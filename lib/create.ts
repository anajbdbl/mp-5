'use server';

import { createAlias } from '@/lib/db';

export async function handleCreateAlias(alias: string, url: string) {
  return await createAlias(alias, url); 
}
