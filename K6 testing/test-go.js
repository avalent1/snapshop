import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  cloud: {
    projectID: 3790745,
    // Test runs with the same name groups test runs together
    name: 'Go API Test',
  },
  stages: [
    { duration: '30s', target: 50 }, // ramp-up
    { duration: '1m', target: 50 },  // hold
    { duration: '30s', target: 100 }, // stress
    { duration: '1m', target: 100 },  // hold at max load
    { duration: '30s', target: 0 },    // ramp-down
  ],
};

// TESTNI JWT TOKEN
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTQ0Nzg3OTcsImlkIjoyfQ.jG4wNTkIA1eGAUsh1GoG3F97d4mbU-_fW_i__IaOlJk';

export default function () {
  const url = 'http://localhost:4001/api/cart/get'; // promijeni port za Go backend ako treba

  const payload = JSON.stringify({}); // nema podataka, userId dolazi iz tokena

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status je 200': (r) => r.status === 200,
    'response sadrži cartData': (r) => r.body.includes('cartData'),
    'response nije prazan': (r) => r.body.length > 10,
  });

  sleep(1);
}