import Link from "next/link";
import { Send, Disc, Youtube, MessageCircle, Github } from "lucide-react";
import Wrapper from "@/components/layout/wrapper";

export default function Footer() {
  return (
    <footer className="w-full mt-10">
      <Wrapper className="mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight">
              UzManga
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Savollaringiz bo'lsa,{" "}
              <Link href="/support" className="text-primary hover:underline">
                texnik yordam
              </Link>{" "}
              xizmatiga murojaat qiling yoki pochta orqali yozing:{" "}
              <a
                href="mailto:contact@UzManga.org"
                className="text-primary hover:underline"
              >
                contact@uzmanga.org
              </a>
            </p>
            <div className="flex items-center gap-3 mt-2">
              <SocialLink
                href="#"
                icon={<Send className="w-4 h-4" />}
                ariaLabel="Telegram"
              />
              <SocialLink
                href="#"
                icon={<Disc className="w-4 h-4" />}
                ariaLabel="Discord"
              />
              <SocialLink
                href="#"
                icon={<Youtube className="w-4 h-4" />}
                ariaLabel="YouTube"
              />
              <SocialLink
                href="#"
                icon={<MessageCircle className="w-4 h-4" />}
                ariaLabel="VK"
              />
              <SocialLink
                href="#"
                icon={<Github className="w-4 h-4" />}
                ariaLabel="GitHub"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground uppercase text-sm tracking-wider">
              Biz haqimizda
            </h3>
            <FooterLink href="/about">Biz kimmiz?</FooterLink>
            <FooterLink href="/vacancies">Vakansiyalar</FooterLink>
            <FooterLink href="/ads">Reklama beruvchilarga</FooterLink>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground uppercase text-sm tracking-wider">
              Umumiy
            </h3>
            <FooterLink href="/dmca">DMCA</FooterLink>
            <FooterLink href="/copyright">Huquq egalariga</FooterLink>
            <FooterLink href="/rules">Sayt qoidalari</FooterLink>
            <FooterLink href="/faq">Ko'p so'raladigan savollar</FooterLink>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground uppercase text-sm tracking-wider">
              Tarjimonlarga
            </h3>
            <FooterLink href="/translators/contract">
              Agentlik shartnomasi
            </FooterLink>
            <FooterLink href="/translators/privacy">
              Maxfiylik kelishuvi
            </FooterLink>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground uppercase text-sm tracking-wider">
              Foydalanuvchilarga
            </h3>
            <FooterLink href="/terms">Foydalanish shartlari</FooterLink>
            <FooterLink href="/app">Mobil ilova</FooterLink>
            <FooterLink href="/cookie">Cookie siyosati</FooterLink>
            <FooterLink href="/privacy">Shaxsiy ma'lumotlar</FooterLink>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} UzManga. Barcha huquqlar himoyalangan.
          </p>
          <p>Created by ❤️ Ixtiyor</p>
        </div>
      </Wrapper>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  );
}

function SocialLink({
  href,
  icon,
  ariaLabel,
}: {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}
