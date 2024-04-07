import request from 'supertest';
import {app, server} from './index.js';

describe("Get /cafes", () => {
    it('should respond with status 200', async () => {
        const response = await request(server).get('/cafes').send();
        expect(response.status).toBe(200);
    });

    it('should respond with array', async () => {
        const response = await request(server).get('/cafes').send();
        expect(response.body).toBeInstanceOf(Array);
    });
});


describe("DELETE /cafes/:id", () => {
    it('should respond with a 404 status when trying to delete a non-existent cafe', async () => {
        const nonExistentId = 'non-existent-id';
        const response = await request(server).delete(`/cafes/${nonExistentId}`);
        expect(response.status).toBe(404);
    });
});

describe("POST /cafes", () => {
    it('should add a new cafe and respond with a 201 status', async () => {
        const newCafe = {
            name: 'Test Cafe',
            location: 'Test Location',
        };
        const response = await request(server).post('/cafes').send(newCafe);
        expect(response.status).toBe(201);
    });
});

describe("PUT /cafes/:id", () => {
    it('should respond with a 400 status if id in params does not match id in payload', async () => {
        const existingId = 'existing-id';
        const updatedCafe = {
            id: 'different-id', 
            name: 'Updated Cafe',
            location: 'Updated Location',
        };
        const response = await request(server).put(`/cafes/${existingId}`).send(updatedCafe);
        expect(response.status).toBe(400);
    });
});

