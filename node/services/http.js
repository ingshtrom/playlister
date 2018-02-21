const fetch = require('node-fetch');
const FormData = require('form-data');

async function fetchDelete(url) {
  return await fetch(url, { method: 'DELETE' });
}

async function fetchGet(url) {
  return await fetch(url, { method: 'GET' });
}

async function fetchPost(url, body) {
  const headers = {};
  if (body instanceof FormData) {
    headers['Content-Length'] = await getFormLength(body);
  } else if (typeof body === 'object') {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  return await fetch(url, {
    method: 'POST',
    body,
    headers
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

// function postForm(url, form) {
//   return new Promise((resolve, reject) => {
//     form.submit(url, (err, res) => {
//       if (err) {
//         return reject(err);
//       }

//       resolve(res);
//     });
//   });
// }

function getFormLength(form) {
  return new Promise((resolve, reject) => {
    form.getLength((err, length) => {
      if (err) {
        return reject(err);
      }

      resolve(length);
    });
  });
}

module.exports.delete   = fetchDelete;
module.exports.get      = fetchGet;
module.exports.post     = fetchPost;
module.exports.put      = fetchPut;
// module.exports.postForm = postForm;

