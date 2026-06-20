import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.optional(v.number()),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const todoId = await ctx.db.insert("todos", {
      title: args.title,
      description: args.description,
      priority: args.priority,
      dueDate: args.dueDate,
      projectId: args.projectId,
      userId: userId._id,
      completed: false,
      starred: false,
    });

    return todoId;
  },
});

export const toggleComplete = mutation({
  args: {
    todoId: v.id("todos"),
  },
  handler: async (ctx, args) => {
    // 1. Auth check
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    // 2. Get user
    const userId = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!userId) {
      throw new Error("Unauthorized");
    }
    // 3. Get todo with ctx.db.get(args.todoId)
    const todo = await ctx.db.get(args.todoId);

    if (!todo) {
      throw new Error("Todo not found");
    }
    // 4. Check todo exists AND todo.userId === user._id
    if (todo.userId !== userId._id) {
      throw new Error("Forbidden");
    }
    // 5. ctx.db.patch(args.todoId, { completed: !todo.completed })
    await ctx.db.patch(args.todoId, { completed: !todo.completed });
  },
});

export const toggleStar = mutation({
  args: {
    todoId: v.id("todos"),
  },
  handler: async (ctx, args) => {
    // 1. Auth check
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // 2. Get user
    const userId = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // 3. Get todo with ctx.db.get(args.todoId)
    const todo = await ctx.db.get(args.todoId);

    if (!todo) {
      throw new Error("Todo not found");
    }

    // 4. Check todo exists AND todo.userId === user._id
    if (todo.userId !== userId._id) {
      throw new Error("Forbidden");
    }

    // 5. ctx.db.patch(args.todoId, { starred: !todo.starred })
    await ctx.db.patch(args.todoId, { starred: !todo.starred });
  },
});

export const update = mutation({
  args: {
    todoId: v.id("todos"),
    updates: v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      priority: v.optional(
        v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
      ),
      dueDate: v.optional(v.number()),
      projectId: v.optional(v.id("projects")),
    }),
  },
  handler: async (ctx, args) => {
    // 1. Auth check
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // 2. Get user
    const userId = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // 3. Get todo with ctx.db.get(args.todoId)
    const todo = await ctx.db.get(args.todoId);

    if (!todo) {
      throw new Error("Todo not found");
    }

    // 4. Check todo exists AND todo.userId === user._id
    if (todo.userId !== userId._id) {
      throw new Error("Forbidden");
    }

    // 5. ctx.db.patchawait ctx.db.patch(args.todoId, args.updates);
    await ctx.db.patch(args.todoId, args.updates);
  },
});

export const remove = mutation({
  args: {
    todoId: v.id("todos"),
  },
  handler: async (ctx, args) => {
    // 1. Auth check
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // 2. Get user
    const userId = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // 3. Get todo with ctx.db.get(args.todoId)
    const todo = await ctx.db.get(args.todoId);

    if (!todo) {
      throw new Error("Todo not found");
    }

    // 4. Check todo exists AND todo.userId === user._id
    if (todo.userId !== userId._id) {
      throw new Error("Forbidden");
    }

    // 5. ctx.db.delete(args.todoId)
    await ctx.db.delete(args.todoId);
  },
});
