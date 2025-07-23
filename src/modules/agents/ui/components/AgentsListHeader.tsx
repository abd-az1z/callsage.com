"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentDailog } from "./newAgentDailog";
import { useState } from "react";

const AgentsListHeader = () => {
  const [isDailogOpen, setIsDailogOpen] = useState(false);
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
      </div>
    </>
  );
};
export default AgentsListHeader;
