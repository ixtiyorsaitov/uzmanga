import { Toaster } from "../ui/sonner";
import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme.provider";
import { UserProvider } from "@/components/contexts/user.context";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </ThemeProvider>
    </UserProvider>
  );
};

export default Providers;
