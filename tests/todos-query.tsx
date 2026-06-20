import { useQuery } from "convex/react";
import React from "react";
import { api } from "@/convex/_generated/api";

const TodosTestQueryComponent = () => {
  const inbox = useQuery(api.todos.queries.listInbox);
  const today = useQuery(api.todos.queries.listToday);
  const upcoming = useQuery(api.todos.queries.listUpcoming);
  const starred = useQuery(api.todos.queries.listStarred);

  console.log({ inbox, today, upcoming, starred });
  return (
    <pre className="p-4 text-xs">
      {JSON.stringify({ inbox, today, upcoming, starred }, null, 2)}
    </pre>
  );
};

export default TodosTestQueryComponent;
