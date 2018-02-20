const fetch = require('node-fetch');

async function fetchDelete(url) {
  return await fetch(url, { method: 'DELETE' });
}

async function fetchGet(url) {
  return await fetch(url, { method: 'GET' });
}

async function fetchPost(url, body) {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

async function fetchPut(url, body) {
  return await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

module.exports.delete = fetchDelete;
module.exports.get    = fetchGet;
module.exports.post   = fetchPost;
module.exports.put    = fetchPut;

