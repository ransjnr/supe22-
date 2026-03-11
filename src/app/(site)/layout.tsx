import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LiveChat from "@/components/layout/LiveChat";
import FloatingHub from "@/components/hub/FloatingHub";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <LiveChat />
      <FloatingHub />
    </>
  );
}
