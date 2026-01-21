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
        {children}
      </ThemeProvider>
    </UserProvider>
  );
};

export default Providers;
