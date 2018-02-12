const mysql = require('mysql');

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

if (!host) throw new Error('MYSQL_HOST must be defined');
if (!user) throw new Error('MYSQL_USER must be defined');
if (!password) throw new Error('MYSQL_PASSWORD must be defined');
if (!database) throw new Error('MYSQL_DATABASE must be defined');

const pool = mysql.createPool({
  host, user, password, database
});

function getConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err || !connection) return reject(err || new Error('Unknown error getting MySQL Connection'));

      resolve(connection);
    });
  });
}

function returnConnection(connection) {
  connection.release();
}

async function createContainer(path, type) {
  const 
}
function removeContainer(path) {}

function getContainerContents(path) {}

function getMediaById(id) {}
function createMediaInContainer(path, media) {}
function deleteMediaInContainer(path) {}

