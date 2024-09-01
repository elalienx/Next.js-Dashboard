// Node modules
import { Metadata } from "next";

// Project files
import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";
import breadcrumbNavigation from "./breadcumb-navigation.json";

export const metadata: Metadata = {
  title: "Create invoice",
};

export default async function Page() {
  // Properties
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbNavigation} />
      <Form customers={customers} />
    </main>
  );
}
