import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

// Run this from the Convex dashboard → Functions → internal.seed.run
// It seeds one user's data — pass in your actual userId from the users table
export const run = internalMutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    const now = Date.now();
    const day = 1000 * 60 * 60 * 24; // 1 day in ms

    // -----------------------------------------------------------------------
    // 1. Projects
    // -----------------------------------------------------------------------
    const personalId = await ctx.db.insert("projects", {
      name: "Personal",
      color: "#6366f1", // indigo
      userId,
      archived: false,
    });

    const workId = await ctx.db.insert("projects", {
      name: "Work",
      color: "#f59e0b", // amber
      userId,
      archived: false,
    });

    // -----------------------------------------------------------------------
    // 2. Todos — Inbox (no dueDate, no project)
    // -----------------------------------------------------------------------
    await ctx.db.insert("todos", {
      title: "Read Convex docs",
      description: "Focus on queries, mutations, and indexes",
      completed: false,
      starred: false,
      priority: "medium",
      userId,
    });

    await ctx.db.insert("todos", {
      title: "Set up ESLint rules",
      completed: false,
      starred: false,
      priority: "low",
      userId,
    });

    // -----------------------------------------------------------------------
    // 3. Todos — Today (dueDate = today)
    // -----------------------------------------------------------------------
    await ctx.db.insert("todos", {
      title: "Review pull requests",
      completed: false,
      starred: false,
      priority: "high",
      dueDate: now,
      projectId: workId,
      userId,
    });

    await ctx.db.insert("todos", {
      title: "Buy groceries",
      completed: false,
      starred: true,
      priority: "medium",
      dueDate: now,
      projectId: personalId,
      userId,
    });

    // -----------------------------------------------------------------------
    // 4. Todos — Upcoming (dueDate in the future)
    // -----------------------------------------------------------------------
    await ctx.db.insert("todos", {
      title: "Write project proposal",
      description: "Outline goals, timeline, and resource needs",
      completed: false,
      starred: true,
      priority: "high",
      dueDate: now + day * 2,
      projectId: workId,
      userId,
    });

    await ctx.db.insert("todos", {
      title: "Schedule dentist appointment",
      completed: false,
      starred: false,
      priority: "low",
      dueDate: now + day * 5,
      projectId: personalId,
      userId,
    });

    await ctx.db.insert("todos", {
      title: "Plan weekend trip",
      completed: false,
      starred: false,
      priority: "low",
      dueDate: now + day * 7,
      projectId: personalId,
      userId,
    });

    // -----------------------------------------------------------------------
    // 5. Todos — Completed (for testing the completed filter later)
    // -----------------------------------------------------------------------
    await ctx.db.insert("todos", {
      title: "Set up Convex project",
      completed: true,
      starred: false,
      priority: "high",
      userId,
    });

    return {
      projects: ["Personal", "Work"],
      todosInserted: 8,
    };
  },
});
