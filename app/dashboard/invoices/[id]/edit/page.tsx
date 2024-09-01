import EditForm from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  // Properties
  const id = params.id;
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);
  const breadcrumbs = [
    {
      label: "Invoices",
      href: "/dashboard/invoices",
      active: false,
    },
    {
      label: "Edit Invoice",
      href: `/dashboard/invoices/${id}/edit`,
      active: true,
    },
  ];

  // Safeguard
  if (!invoice) notFound();

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <EditForm invoice={invoice} customers={customers} />
    </main>
  );
}
