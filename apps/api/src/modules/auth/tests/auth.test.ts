import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../../../app.js';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const app = createApp();

describe('POST /api/auth/register', () => {
  it('registers a new user successfully', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'new-user@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe('new-user@example.com');
    expect(response.body.token).toBeTypeOf('string');
    expect(response.body.user.passwordHash).toBeUndefined();
  });

  it('rejects registration with a duplicate email', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'duplicate@example.com',
      password: 'password123',
    });

    const response = await request(app).post('/api/auth/register').send({
      email: 'duplicate@example.com',
      password: 'anotherPassword123',
    });

    expect(response.status).toBe(409);
  });

  it('rejects registration with invalid input', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'not-an-email',
      password: 'short',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe('POST /api/auth/login', () => {
  it('logs in successfully with valid credentials', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'login-user@example.com',
      password: 'password123',
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'login-user@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTypeOf('string');
    expect(response.body.user.email).toBe('login-user@example.com');
  });

  it('rejects login with an invalid password', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'wrong-password@example.com',
      password: 'password123',
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'wrong-password@example.com',
      password: 'incorrect-password',
    });

    expect(response.status).toBe(401);
  });

  it('rejects login for a non-existent account', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'does-not-exist@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(401);
  });
});
