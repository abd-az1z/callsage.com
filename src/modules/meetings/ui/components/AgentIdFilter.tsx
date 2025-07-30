import { useTRPC } from "@/trpc/client";
import { useMeetingsFilters } from "../../hooks/useMeetingsFilters";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CommandSelect } from "@/components/commandSelect";
import { GeneratedAvatar } from "@/components/generated-avatar";

export const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const trpc = useTRPC();

  const [agentSearch, setAgentSearch] = useState("");
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  return (
    <div>
      <CommandSelect
        className="h-9"
        placeholder="Agent"
        options={(data?.items ?? []).map((agent) => ({
          id: agent.id,
          value: agent.id,
          children: (
            <div className="capitalize flex items-center gap-x-2">
              <GeneratedAvatar
                variant="bottsNeutral"
                seed={agent.name}
                className="size-4"
              />
              {agent.name}
            </div>
          ),
        }))}
        onSelect={(value) => setFilters({ agentId: value })}
        value={filters.agentId ?? ""}
        onSearch={setAgentSearch}
      />
    </div>
  );
};
