"use client";

import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/emptyState";
import { useAgentsFilters } from "../../hooks/useAgentsFilters";
import { DataPagination } from "../components/DataPagination";

export const AgentsView = () => {
  const [filters, setFilters] = useAgentsFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 p-4 md:px-8 flex flex-col gap-y-4 ">
      <DataTable data={data.items} columns={columns} />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
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
