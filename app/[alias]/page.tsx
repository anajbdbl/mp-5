import { redirect } from "next/navigation";
import { findAlias } from "@/lib/db";

export default async function RedirectAlias({ params }: { params: { alias: string } }) {
  const record = await findAlias(params.alias);
  if (!record) {
    return <h1>Alias not found</h1>;
  }
  redirect(record.url);
}
