import { jest, describe, expect, it } from '@jest/globals';

jest.unstable_mockModule('../config/supabase.js', () => ({
    supabase: {
        auth: {
            signUp: jest.fn(),
            signInWithPassword: jest.fn(),
            signOut: jest.fn(),
            getSession: jest.fn(),
        },
        from: jest.fn(() => ({
            select: jest.fn().mockReturnThis(),
            insert: jest.fn().mockReturnThis(),
            update: jest.fn().mockReturnThis(),
            delete: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn(),
        })),
    },
}));

const { default: request } = await import("supertest");
const { default: express } = await import("express");

const { default: routes } = await import("../routes/routes.js");
const { default: middlewares } = await import("../middlewares/middlewares.js");

const createTestServer = () => {
    const app = express();
    middlewares(app);
    app.use("/api", routes);
    return app;
};

describe("categories routes", () => {
    const app = createTestServer();

    describe("GET /api/categories", () => {
        it("should return 401 without authentication", async () => {
            const response = await request(app).get("/api/categories");
            expect(response.statusCode).toBe(401);
        });
    });

    describe("POST /api/categories", () => {
        it("should return 401 without authentication", async () => {
            const response = await request(app).post("/api/categories");
            expect(response.statusCode).toBe(401);
        });
    });

    describe("PUT /api/categories/:id", () => {
        it("should return 401 without authentication", async () => {
            const response = await request(app).put("/api/categories/1");
            expect(response.statusCode).toBe(401);
        });
    });

    describe("DELETE /api/categories/:id", () => {
        it("should return 401 without authentication", async () => {
            const response = await request(app).delete("/api/categories/1");
            expect(response.statusCode).toBe(401);
        });
    });
});