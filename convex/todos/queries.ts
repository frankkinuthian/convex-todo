import { v } from "convex/values";
import { query } from "../_generated/server";

// listInbox
export const listInbox = query({
  args: {},
  handler: async (ctx) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", userIdentity.tokenIdentifier),
      )
      .unique();
    if (!user) return null;

    return await ctx.db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("completed"), false))
      .filter((q) => q.eq(q.field("dueDate"), undefined))
      .collect();
  },
});

// listToday
export const listToday = query({
  args: {},
  handler: async (ctx) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", userIdentity.tokenIdentifier),
      )
      .unique();
    if (!user) return null;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const start = startOfToday.getTime();

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const end = endOfToday.getTime();

    return await ctx.db
      .query("todos")
      .withIndex("by_user_and_due", (q) =>
        q.eq("userId", user._id).gte("dueDate", start).lte("dueDate", end),
      )
      .filter((q) => q.eq(q.field("completed"), false))
      .collect();
  },
});

// listUpcoming
export const listUpcoming = query({
  args: {},
  handler: async (ctx) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", userIdentity.tokenIdentifier),
      )
      .unique();
    if (!user) return null;

    const startOfTomorrow = new Date();
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
    startOfTomorrow.setHours(0, 0, 0, 0);
    const start = startOfTomorrow.getTime();

    return await ctx.db
      .query("todos")
      .withIndex("by_user_and_due", (q) =>
        q.eq("userId", user._id).gte("dueDate", start),
      )
      .filter((q) => q.eq(q.field("completed"), false))
      .collect();
  },
});

// listStarred
export const listStarred = query({
  args: {},
  handler: async (ctx) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", userIdentity.tokenIdentifier),
      )
      .unique();
    if (!user) return null;

    return await ctx.db
      .query("todos")
      .withIndex("by_user_and_starred", (q) =>
        q.eq("userId", user._id).eq("starred", true),
      )
      .filter((q) => q.eq(q.field("completed"), false))
      .collect();
  },
});

// listByProject
export const listByProject = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", userIdentity.tokenIdentifier),
      )
      .unique();
    if (!user) return null;

    return await ctx.db
      .query("todos")
      .withIndex("by_user_and_project", (q) =>
        q.eq("userId", user._id).eq("projectId", args.projectId),
      )
      .filter((q) => q.eq(q.field("completed"), false))
      .collect();
  },
});
