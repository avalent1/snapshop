import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 50, // broj virtualnih korisnika
  duration: '30s', // trajanje testa
};

export default function () {
  const res = http.get('http://localhost:4000/api/products'); // promijeni URL ovisno o backendu
  check(res, {
    'status je 200': (r) => r.status === 200,
  });
  sleep(1); // simulacija korisničkog vremena čekanja
}
