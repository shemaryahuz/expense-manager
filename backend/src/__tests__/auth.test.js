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

describe("auth routes", () => {
    const app = createTestServer();

    describe("POST /api/auth/login", () => {
        it("should return 400 if email is missing", async () => {
            const response = await request(app).post("/api/auth/login").send({
                password: "password"
            });
            expect(response.status).toBe(400);
        });
    });

    describe("POST /api/auth/login", () => {
        it("should return 400 if password is missing", async () => {
            const response = await request(app).post("/api/auth/login").send({
                email: "email"
            });
            expect(response.status).toBe(400);
        });
    });

    describe("POST /api/auth/signup", () => {
        it("should return 400 if name is missing", async () => {
            const response = await request(app).post("/api/auth/signup").send({
                email: "email",
                password: "password"
            });
            expect(response.status).toBe(400);
        });
    });

    describe("POST /api/auth/signup", () => {
        it("should return 400 if email is missing", async () => {
            const response = await request(app).post("/api/auth/signup").send({
                name: "name",
                password: "password"
            });
            expect(response.status).toBe(400);
        });
    });

    describe("POST /api/auth/signup", () => {
        it("should return 400 if password is missing", async () => {
            const response = await request(app).post("/api/auth/signup").send({
                name: "name",
                email: "email",
            });
            expect(response.status).toBe(400);
        });
    });

    describe("POST /api/auth/logout", () => {
        it("should return 200", async () => {
            const response = await request(app).post("/api/auth/logout").send({});
            expect(response.status).toBe(200);
        });
    });
});