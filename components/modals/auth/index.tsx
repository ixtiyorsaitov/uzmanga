"use client";

import { useState } from "react";
import useAuthModal from "@/components/hooks/modals/useAuthModal";
import Logo from "@/components/shared/logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const AuthContent = dynamic(() => import("./content"), {
  ssr: false,
});

const AuthModal = () => {
  const { open, setOpen } = useAuthModal();
  const [importLoading, setImportLoading] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={!importLoading}
        className={cn(
          "transition-all duration-300",
          importLoading
            ? "w-25 h-25 flex items-center justify-center"
            : "w-full max-w-lg sm:w-95",
        )}
      >
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        {importLoading && <Logo className="size-12 animate-spin" />}

        <AuthContent onReady={() => setImportLoading(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
