const request = require('supertest');
const app = require('../app');
const { calculateValue } = require('../src/logic');

describe('Suite de Pruebas de Calidad de Software', () => {

    describe('Pruebas Unitarias - Lógica de Inventario', () => {
        test('Debe calcular correctamente el valor total (10 * 5 = 50)', () => {
            const result = calculateValue(10, 5);
            expect(result).toBe(50);
        });

        test('Debe retornar 0 si se ingresan valores negativos', () => {
            const result = calculateValue(-10, 5);
            expect(result).toBe(0);
        });

        // Validaciones adicionales( Jest )
        test('Extra 1: Debe calcular correctamente artículos promocionales gratuitos (precio 0)', () => {
            const result = calculateValue(0, 150);
            expect(result).toBe(0); // 0 precio * 150 stock = 0
        });

        test('Extra 2: Debe retornar 0 si hay un error de captura con stock negativo', () => {
            const result = calculateValue(120, -5); 
            expect(result).toBe(0); // Cubre la segunda condición del if (stock < 0)
        });
    });


    describe('Pruebas de Integración - API Endpoints', () => {
        test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
            const response = await request(app).get('/health');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('status', 'OK');
        });

        test('GET /items - Debe validar la estructura del inventario', async () => {
            const response = await request(app).get('/items');
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            // Validamos que el primer objeto tenga las propiedades requeridas
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('stock');
        });

        // Validaciones adicionales (Supertest)
        test('Extra 3: GET /ruta-inexistente - Debe retornar status 404', async () => {
            const response = await request(app).get('/endpoint-que-no-existe');
            expect(response.statusCode).toBe(404);
        });

        test('Extra 4: GET /items - El stock del primer item debe ser de tipo numérico', async () => {
            const response = await request(app).get('/items');
            if (response.body.length > 0) {
                expect(typeof response.body[0].stock).toBe('number');
            }
        });
    });
});
