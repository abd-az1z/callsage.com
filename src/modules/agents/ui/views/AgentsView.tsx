"use client";

import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";
import { columns } from "../components/columns";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/emptyState";
import { DataPagination } from "../components/DataPagination";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { DEFAULT_PAGE } from "@/constants";

interface AgentsViewProps {
  initialPage?: number;
  initialSearch?: string;
}

export const AgentsView = ({ initialPage = DEFAULT_PAGE, initialSearch = '' }: AgentsViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the current page and search from URL params or use initial values
  const page = searchParams?.get('page') ? parseInt(searchParams.get('page') as string) : initialPage;
  const search = searchParams?.get('search') || initialSearch;

  const trpc = useTRPC();
  const { data, error } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      page,
      search,
    })
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  // Handle error state
  if (error) {
    return <AgentsViewError />;
  }

  return (
    <div className="flex-1 p-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data?.items || []}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      {data && data.totalPages > 0 && (
        <DataPagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {!data?.items?.length && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join meetings. Each agent will follow your instructions and can interact with participants during the call. "
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take few seconds"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later"
    />
  );
};
