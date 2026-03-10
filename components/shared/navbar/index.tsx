import Wrapper from "@/components/layout/wrapper";
import BottomNav from "./bottom-nav";
import NavbarLeft from "./navbar-left";
import { NavbarRight } from "./navbar-right";
import SearchTrigger from "./search-trigger";

const Navbar = () => {
  return (
    <>
      <Wrapper className="fixed top-0 border-b py-3 z-50 bg-background">
        <div className="md:flex hidden items-center justify-between">
          <NavbarLeft />
          <NavbarRight />
        </div>

        {/* Mobile */}
        <div className="md:hidden flex">
          <SearchTrigger className="w-full" />
        </div>
      </Wrapper>
      <BottomNav />
    </>
  );
};

export default Navbar;
