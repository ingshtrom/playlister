# node api

## setup .env for local dev

```
  echo 'BASE_URL=http://localhoset:3001>' > .env # for api testing
  echo 'PORT=3001' >> .env
  echo 'MYSQL_HOST=[mysql_host]' >> .env
  echo 'MYSQL_USER=[mysql_user]' >> .env
  echo 'MYSQL_PASSWORD=[mysql_password]' >> .env
  echo 'MYSQL_DATABASE=[mysql_database]' >> .env
  echo 'AZURE_STORAGE_CONNECTION_STRING=[connection_string]' >> .env
  echo 'BLOB_MEDIA_CONTAINER=[container_name]' >> .env
  echo 'UPLOAD_DIRECTORY=[some directory]' >> .env # where tmp media is uploaded to before processing
```

# API

see the `API.apiblueprint` file

# Image Processing

* the lack of a url on the Media row in the DB means that it has not had the media associated with it processed
* The `api` and the `process_media` containers share a data volume, and that is where files uploaded are temporarily stored
* The `api` also will write a file with the same exact file path name as the tmp file, but with ".txt" extended onto it. This file contains the media id to associate the processed media with
* The `process_media` searches a predefined directory for files to process. It uses a regex to filter out non-media files. It is safe to assume it only accepts git/jpg/jpeg/png/mp4/mov/avi files.

