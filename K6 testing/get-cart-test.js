import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:4000/api/cart/get'; // zamijeni port ako testiraš Go backend

  const payload = JSON.stringify({
    userId: 1 // promijeni u stvaran testni user ID
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status je 200': (r) => r.status === 200,
    'response nije prazan': (r) => r.body.length > 2, // pretpostavka da se vraća barem []
    'response sadrži proizvod': (r) => r.body.includes('product') || r.body.includes('title'),
  });

  sleep(1);
}
