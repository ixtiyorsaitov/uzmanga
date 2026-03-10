import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="mt-[61px]"></div>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
