"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeetingDailog } from "./NewMeetingDailog";
import { useState } from "react";
import { MeetingsSeachFilter } from "./MeetingsSeachFilter";
import { StatusFilter } from "./StatusFilter";
import { AgentIdFilter } from "./AgentIdFilter";
import { useMeetingsFilters } from "../../hooks/useMeetingsFilters";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDailogOpen, setIsDailogOpen] = useState(false);

  const isAnyFilterModified =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: DEFAULT_PAGE,
    });
  };
  return (
    <div>
      <NewMeetingDailog open={isDailogOpen} onOpenChange={setIsDailogOpen} />
      <div className="p-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl ">My Meetings</h5>
          <Button onClick={() => setIsDailogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 ">
            <MeetingsSeachFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="outline" onClick={onClearFilters} size="sm">
                <XCircleIcon /> Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
export default MeetingsListHeader;
