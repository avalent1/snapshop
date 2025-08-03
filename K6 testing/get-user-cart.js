// cart-load-test.js
import http from 'k6/http';
import { sleep, check } from 'k6';

// Konfiguracija testa
export let options = {
  stages: [
    { duration: '30s', target: 50 },   // 100 korisnika u 30 sekundi
    { duration: '1m', target: 50 },    // 500 korisnika u 1 minuti
    { duration: '1m', target: 100 },   // 1000 korisnika u 1 minuti
    { duration: '30s', target: 0 },     // smanji na 0 korisnika
  ],
};

// Pretpostavimo da ti token izgleda ovako — tu stavi pravi token:
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTQ0Nzg3OTcsImlkIjoyfQ.jG4wNTkIA1eGAUsh1GoG3F97d4mbU-_fW_i__IaOlJk';

// Base URL tvojeg backenda
const BASE_URL = 'http://localhost:4000/api/cart/get';  // ili production URL

export default function () {
  // Poziv prema GET /api/cart/get
  let res = http.get(`${BASE_URL}/api/cart/get`, {
    headers: {
      'Authorization': `Bearer ${token}`,  // ako treba token
      'Content-Type': 'application/json',
    },
  });

  // Provjera da je response OK
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has cartData': (r) => JSON.parse(r.body).cartData !== undefined,
  });

  sleep(1); // mala pauza između requesta
}
