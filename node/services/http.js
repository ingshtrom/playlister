const fetch = require('node-fetch');
const FormData = require('form-data');

let token = '';

async function getAccessToken() {
  if (token) return token;

  const result = await fetch('https://northview-playlister.auth0.com/oauth/token', {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'gnEseVcXCDl42NVpJUh6xfE8HzIdAc77',
      client_secret: '50gWXYQ8MtlJSO_iEdzPY6b9SVUUyEut0kACikJKU4sC1tlLG-pmPP2cXMthYkGN',
      audience: 'playlister-api',
      grant_type: 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res = await result.json();

  console.log('result', res);

  token = res.access_token;

  return token;
}

async function fetchDelete(url) {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
}

async function fetchGet(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
}

async function fetchPost(url, body) {
  const headers = {};
  if (body instanceof FormData) {
    headers['Content-Length'] = await getFormLength(body);
  } else if (typeof body === 'object') {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  headers.Authorization = `Bearer ${await getAccessToken()}`;

  return fetch(url, {
    method: 'POST',
    body,
    headers,
  });
}

async function fetchPut(url, body) {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
}

function getFormLength(form) {
  return new Promise((resolve, reject) => {
    form.getLength((err, length) => {
      if (err) {
        return reject(err);
      }

      return resolve(length);
    });
  });
}

module.exports.delete = fetchDelete;
module.exports.get = fetchGet;
module.exports.post = fetchPost;
module.exports.put = fetchPut;

