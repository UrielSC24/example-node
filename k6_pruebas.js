import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuración de la prueba de carga
export const options = {
    stages: [
        { duration: '30s', target: 20 }, // Rampa de subida: hasta 20 usuarios virtuales en 30s
        { duration: '1m', target: 20 },  // Mantenimiento: 20 usuarios constantes por 1 minuto
        { duration: '30s', target: 0 },  // Rampa de bajada: vuelve a 0 usuarios
    ],
    // Configuración para enviar métricas a Grafana Cloud
    cloud: {
        projectID: 6994623, // Tu ID de proyecto exacto (tomado de tus capturas)
        name: 'Prueba de Carga - Node.js API'
    }
};

export default function loadTest() {
    // Apuntamos al puerto 3001, que es el que usa tu archivo bin/www
    // Nota: El puerto por defecto en bin/www es 3000, cámbialo si es necesario.
    const baseUrl = 'http://localhost:3000';

    // Endpoint 1: Verificación de estado de salud
    let resHealth = http.get(`${baseUrl}/health`);
    check(resHealth, {
        'Health Check es status 200': (r) => r.status === 200,
    });

    sleep(1); // Simula el tiempo de espera del usuario

    // Endpoint 2: Obtención de inventario
    let resItems = http.get(`${baseUrl}/items`);
    check(resItems, {
        'Items endpoint es status 200': (r) => r.status === 200,
        'Items retorna datos': (r) => r.body.length > 0,
    });

    sleep(1);
}
