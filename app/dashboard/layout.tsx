// Project files
import SideNav from "@/app/ui/dashboard/sidenav";
import { Metadata } from "next";

// Enable Partial Page Rendenring (PPR)
export const experimental_ppr = true;

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* Static */}
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>

      {/* Has static content (title) and dynamic content (cards, charts, users) */}
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {/* page.tsx or another layout.tsx (nesting) goes here */}
        {children}
      </div>
    </div>
  );
}
