const request = require('supertest');
const app = require('../app');
const { calculateValue } = require('../src/logic');

describe('Suite de Pruebas de Calidad de Software', () => {

    describe('Pruebas Unitarias - Lógica de Inventario', () => {
        // Función parametrizada para evitar duplicar bloques de lógica en los test unitarios
        const testCalculate = (p, s, expected) => {
            expect(calculateValue(p, s)).toBe(expected);
        };

        test('Cálculos básicos y casos borde', () => {
            testCalculate(10, 5, 50);
            testCalculate(-10, 5, 0);
            testCalculate(0, 150, 0);
            testCalculate(120, -5, 0);
        });
    });

    describe('Pruebas de Integración - API Endpoints', () => {
        // Helper único para validaciones de API: esto elimina las duplicaciones de Sonar
        const checkApiResponse = async (endpoint, options = {}) => {
            const { isArray = true, requiredProps = [], expectedStatus = 200 } = options;
            const response = await request(app).get(endpoint);
            
            expect(response.statusCode).toBe(expectedStatus);
            
            if (expectedStatus === 200 && isArray) {
                expect(Array.isArray(response.body)).toBe(true);
                if (response.body.length > 0) {
                    requiredProps.forEach(prop => {
                        expect(response.body[0]).toHaveProperty(prop);
                    });
                }
            }
            return response;
        };

        test('GET /health - Estado del sistema', () => 
            checkApiResponse('/health', { isArray: false })
        );

        test('GET /metrics - Obtención de métricas de Prometheus', async () => {
            const response = await request(app).get('/metrics');
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toMatch(/text\/plain/);
        });

        test('GET /items - Estructura de inventario', () => 
            checkApiResponse('/items', { requiredProps: ['id', 'stock'] })
        );

        test('GET /orders - Estructura de órdenes', () => 
            checkApiResponse('/orders', { requiredProps: ['id', 'customer', 'total', 'status'] })
        );

        test('GET /users - Respuesta de recurso de usuarios', async () => {
            const response = await request(app).get('/users');
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('respond with a resource');
        });

        test('Manejo de rutas inexistentes', () => 
            checkApiResponse('/endpoint-que-no-existe', { expectedStatus: 404 })
        );
    });
});
