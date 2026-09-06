import type { Metadata } from "next";
import { connection } from "next/server";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { PageShell } from "@/components/PageShell";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const t = await getDictionary();
  return { title: t.admin.loginTitle };
}

export default async function AdminLoginPage() {
  await connection();
  const locale = await getLocale();
  const t = await getDictionary(locale);

  return (
    <PageShell>
      <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
        {t.admin.loginTitle}
      </h1>
      <p className="mt-3 max-w-[65ch] text-base text-muted">{t.admin.loginBody}</p>
      <AdminLoginForm
        key={locale}
        passwordLabel={t.admin.password}
        submitLabel={t.admin.submit}
        submittingLabel={t.admin.submitting}
        wrongPassword={t.admin.wrongPassword}
        networkError={t.admin.networkError}
        notConfigured={t.admin.notConfigured}
        showPassword={t.admin.showPassword}
        hidePassword={t.admin.hidePassword}
      />
    </PageShell>
  );
}
