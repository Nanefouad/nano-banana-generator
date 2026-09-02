import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis;

// In-memory store fallback when real database is not connected
const memoryStore = {
  users: new Map(),
  accounts: new Map(),
  sessions: new Map(),
  creations: new Map(),
  verificationTokens: new Map(),
};

function matchesWhere(item, where) {
  if (!where) return true;
  if (where.OR && Array.isArray(where.OR)) {
    return where.OR.some((subWhere) => matchesWhere(item, subWhere));
  }
  for (const [k, v] of Object.entries(where)) {
    if (k === "OR") continue;
    if (v !== undefined && item[k] !== v) return false;
  }
  return true;
}

function createInMemoryModel(collectionKey) {
  const collection = memoryStore[collectionKey];

  return {
    async findFirst({ where } = {}) {
      for (const item of collection.values()) {
        if (matchesWhere(item, where)) return { ...item };
      }
      return null;
    },
    async findUnique({ where } = {}) {
      for (const item of collection.values()) {
        if (matchesWhere(item, where)) return { ...item };
      }
      return null;
    },
    async findMany({ where, orderBy } = {}) {
      const results = [];
      for (const item of collection.values()) {
        if (matchesWhere(item, where)) results.push({ ...item });
      }
      if (orderBy?.createdAt === "desc") {
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      return results;
    },
    async create({ data } = {}) {
      const id = data.id || `mock_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const now = new Date();
      const record = {
        id,
        createdAt: now,
        credits: 10,
        ...data,
      };
      collection.set(id, record);
      return { ...record };
    },
    async update({ where, data } = {}) {
      let targetId = where?.id;
      if (!targetId) {
        for (const [id, item] of collection.entries()) {
          if (matchesWhere(item, where)) {
            targetId = id;
            break;
          }
        }
      }
      const existing = (targetId && collection.get(targetId)) || { id: targetId || "mock_user" };
      const updated = { ...existing };
      for (const [key, val] of Object.entries(data || {})) {
        if (val && typeof val === "object" && val.increment !== undefined) {
          updated[key] = (updated[key] || 0) + val.increment;
        } else if (val && typeof val === "object" && val.decrement !== undefined) {
          updated[key] = Math.max(0, (updated[key] || 0) - val.decrement);
        } else {
          updated[key] = val;
        }
      }
      if (targetId) {
        collection.set(targetId, updated);
      }
      return { ...updated };
    },
    async delete({ where } = {}) {
      let targetId = where?.id;
      if (!targetId) {
        for (const [id, item] of collection.entries()) {
          if (matchesWhere(item, where)) {
            targetId = id;
            break;
          }
        }
      }
      if (targetId) {
        const item = collection.get(targetId);
        collection.delete(targetId);
        return item || {};
      }
      return {};
    },
  };
}

function createMockPrisma() {
  console.warn("[AI Studio] Database not connected — using in-memory mock store");
  const models = {
    user: createInMemoryModel("users"),
    User: createInMemoryModel("users"),
    account: createInMemoryModel("accounts"),
    Account: createInMemoryModel("accounts"),
    session: createInMemoryModel("sessions"),
    Session: createInMemoryModel("sessions"),
    creation: createInMemoryModel("creations"),
    Creation: createInMemoryModel("creations"),
    verificationToken: createInMemoryModel("verificationTokens"),
    VerificationToken: createInMemoryModel("verificationTokens"),
  };

  const noOp = {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (d) => d?.data ?? {},
    update: async (d) => d?.data ?? {},
    delete: async () => ({}),
  };

  return new Proxy(models, {
    get: (target, prop) => {
      if (prop in target) return target[prop];
      if (typeof prop === "string" && !prop.startsWith("$")) {
        return noOp;
      }
      return undefined;
    },
  });
}

let prismaClient;

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "") {
  prismaClient = globalForPrisma.prisma || createMockPrisma();
} else {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    prismaClient =
      globalForPrisma.prisma ||
      new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      });
  } catch (err) {
    console.warn("[AI Studio] Failed to initialize Prisma client, falling back to mock:", err.message);
    prismaClient = createMockPrisma();
  }
}

export const prisma = prismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
