'use client';

import { AgentsViewLoading } from "@/modules/agents/ui/views/AgentsView";
import { AgentsViewError } from "@/modules/agents/ui/views/AgentsView";
import NextDynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "next/navigation";
import { DEFAULT_PAGE } from "@/constants";

export const dynamic = 'force-dynamic';

const AgentsListHeader = NextDynamic(
  () => import("@/modules/agents/ui/components/AgentsListHeader").then(m => m.default),
  { ssr: false }
);

const AgentsView = NextDynamic(
  () => import("@/modules/agents/ui/views/AgentsView").then(m => m.AgentsView),
  { ssr: false }
);

function AgentsPageContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const initialPage = searchParams?.get('page')
    ? parseInt(searchParams.get('page') as string)
    : DEFAULT_PAGE;
  const initialSearch = searchParams?.get('search') || '';

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <AgentsListHeader />
      <Suspense fallback={<AgentsViewLoading />}>
        <ErrorBoundary fallback={<AgentsViewError />}>
          <AgentsView initialPage={initialPage} initialSearch={initialSearch} />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default function AgentsPage() {
  return (
    <Suspense fallback={<AgentsViewLoading />}>
      <AgentsPageContent />
    </Suspense>
  );
}
