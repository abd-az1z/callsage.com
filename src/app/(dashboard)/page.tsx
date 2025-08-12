'use client';

import NextDynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export const dynamic = 'force-dynamic';

const HomeView = NextDynamic(
  () => import("@/modules/home/ui/views/home-view").then(m => m.HomeView),
  { ssr: false }
);

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const { authClient } = await import("@/lib/auth-client");
        const session = await authClient.getSession();
        if (!session) {
          router.replace("/sign-in");
          return;
        }
      } catch (e) {
        console.error("Auth check failed", e);
        router.replace("/sign-in");
        return;
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    check();
    return () => { mounted = false; };
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return <HomeView />;
}
