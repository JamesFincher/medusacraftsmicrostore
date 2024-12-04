import { loadEnv, defineConfig } from '@medusajs/framework/utils'
import { Modules } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  modules: [
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.CACHE_REDIS_URL,
      }
    },
      {
        resolve: "@medusajs/medusa/event-bus-redis",
        options: {
          redisUrl: process.env.EVENTS_REDIS_URL,
        },
      },
      {
        resolve: "@medusajs/medusa/workflow-engine-redis",
        options: {
          redis: {
            url: process.env.WE_REDIS_URL,
          },
        },
      },
      {
        resolve: "@medusajs/medusa/notification",
        options: {
          providers: [
            // ...
            {
              resolve: "@medusajs/medusa/notification-sendgrid",
              id: "sendgrid",
              options: {
                channels: ["email"],
                api_key: process.env.SENDGRID_API_KEY,
                from: process.env.SENDGRID_FROM,
              },
            },
          ],
        },
      },
  ],
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL,

  },
  projectConfig: {
    workerMode: process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server",
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret"
    }
  }
})
