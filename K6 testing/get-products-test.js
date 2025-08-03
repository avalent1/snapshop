import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,              // broj virtualnih korisnika
  duration: '30s',      // trajanje testa
};

export default function () {
  const res = http.get('http://localhost:4000/api/products'); // promijeni port/backend ako treba

  check(res, {
    'status je 200': (r) => r.status === 200,
    'response sadrži proizvode': (r) => r.body.includes('product'), // prilagodi ovisno o stvarnom sadržaju
  });

  sleep(1); // pauza između zahtjeva, simulira ljudsko korištenje
}
