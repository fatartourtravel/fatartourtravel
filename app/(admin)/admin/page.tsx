import { isCatalogStoreConfigured, loadAdminCatalog } from "@/lib/catalog-store";
import { isAdmin } from "@/lib/admin-auth";
import LoginForm from "./LoginForm";
import PriceEditor from "./PriceEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <LoginForm />;
  }

  const catalog = await loadAdminCatalog();
  return <PriceEditor catalog={catalog} storeReady={isCatalogStoreConfigured()} />;
}
