"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function DashboardPage() {
  const storeUser = useMutation(api.users.mutations.store);

  useEffect(() => {
    storeUser();
  }, [storeUser]);

  return <div>DashboardPage</div>;
}
