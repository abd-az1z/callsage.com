'use client';

import { HomeView } from "@/modules/home/ui/views/home-view";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        if (!session) {
          redirect("/sign-in");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        redirect("/sign-in");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <HomeView />
    </div>
  );
};

export default DashboardPage;
