import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const create = mutation({
  args: {
    // structure
    /*
    { name: string; color: string; userId: Id<"users">; archived: boolean; }
    */
    name: v.string(),
    color: v.string(),
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

    // 3. Create project
    const projectId = await ctx.db.insert("projects", {
      name: args.name,
      color: args.color,
      userId: userId._id, // from ctx.auth, not args
      archived: false,
    });

    return projectId;
  },
});

export const archive = mutation({
  args: {
    id: v.id("projects"),
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

    // 3. get the project and check project.userId === userId._id
    const project = await ctx.db.get(args.id);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.userId !== userId._id) {
      throw new Error("Forbidden");
    }

    // 4. Archive project
    await ctx.db.patch(args.id, { archived: true });
  },
});

export const remove = mutation({
  args: {
    id: v.id("projects"),
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

    // 3. get the project and check project.userId === userId._id
    const project = await ctx.db.get(args.id);

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.userId !== userId._id) {
      throw new Error("Forbidden");
    }

    // 4. Delete project
    await ctx.db.delete(args.id);
  },
});
