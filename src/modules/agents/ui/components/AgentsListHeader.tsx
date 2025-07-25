"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewAgentDailog } from "./newAgentDailog";
import { useState } from "react";
import { useAgentsFilters } from "../../hooks/useAgentsFilters";
import { AgentSearchFilter } from "./AgentSeachFilter";
import { DEFAULT_PAGE } from "@/constants";

const AgentsListHeader = () => {

  
  const [filters, setFilters] = useAgentsFilters();
  const [isDailogOpen, setIsDailogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;
  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentDailog open={isDailogOpen} onOpenChange={setIsDailogOpen} />
      <div className="p-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl ">My Agents</h5>
          <Button onClick={() => setIsDailogOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 ">
          <AgentSearchFilter />
          {isAnyFilterModified && (
            <Button variant="outline" onClick={onClearFilters} size="sm">
              <XCircleIcon /> Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default AgentsListHeader;
