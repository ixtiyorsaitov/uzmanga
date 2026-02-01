import { AuthProvider } from "@/components/contexts/auth.context";
import { Toaster } from "../ui/sonner";
import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme.provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Providers;
