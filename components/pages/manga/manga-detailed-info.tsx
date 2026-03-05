"use client";

import React from "react";
import { ArrowUpRight, Copy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IManga } from "@/types/manga";
import Link from "next/link";

interface InfoRowProps {
  label: string;
  children: React.ReactNode;
}

const InfoRow = ({ label, children }: InfoRowProps) => (
  <div className="grid grid-cols-[140px_1fr] gap-4 py-2 items-start">
    <span className="text-muted-foreground text-sm font-medium">{label}</span>
    <div className="flex flex-col gap-2">{children}</div>
  </div>
);

export default function MangaDetailedInfo({ manga }: { manga: IManga }) {
  // const copyToClipboard = (text: string) => {
  //   navigator.clipboard.writeText(text);
  //   // Bu yerda toast xabarnoma chiqarish mumkin
  // };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-1 p-4 blur-card">
      {/* Pablisherlar */}
      <InfoRow label="Pablisher">
        <div className="flex items-center gap-2 bg-secondary/50 w-fit pr-4 pl-1 py-1 rounded-full border border-border">
          <div className="overflow-hidden relative">
            <Avatar className="size-6">
              <AvatarImage src={manga.createdBy.avatar} />
              <AvatarFallback>I</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-sm font-medium">{manga.createdBy.name}</span>
        </div>
      </InfoRow>

      <InfoRow label="Holat">
        <Link
          href="#"
          className="flex items-center gap-1 hover:underline text-sm font-medium hover:text-primary"
        >
          {manga.status.name} <ArrowUpRight className="size-4" />
        </Link>
      </InfoRow>

      <InfoRow label="Tarjima holati">
        <Link
          href="#"
          className="flex items-center gap-1 hover:underline text-sm font-medium hover:text-primary"
        >
          {manga.translationStatus.name} <ArrowUpRight className="size-4" />
        </Link>
      </InfoRow>

      <InfoRow label="Yosh chegarasi">
        <Link
          href="#"
          className="flex items-center gap-1 hover:underline text-sm font-medium hover:text-primary"
        >
          {manga.ageRating.name} <ArrowUpRight className="size-4" />
        </Link>
      </InfoRow>

      {/* Альтернативные названия */}
      {/* <InfoRow label="Альтернативные названия">
        <div className="flex flex-col gap-3">
          {[
            "The Everyone Regressed Except Me",
            "Everyone Regressed Except Me",
          ].map((title) => (
            <div key={title} className="group flex items-center gap-2">
              <span className="text-sm font-medium leading-tight">{title}</span>
              <button
                onClick={() => copyToClipboard(title)}
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                <Copy className="size-4" />
              </button>
            </div>
          ))}
          <button className="text-blue-500 hover:text-blue-400 text-sm font-medium w-fit transition-colors">
            Больше
          </button>
        </div>
      </InfoRow> */}
    </div>
  );
}
