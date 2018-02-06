import { Record } from 'immutable';

const ImageRecord = Record({
  id: null,
  name: null,
  type: 'IMAGE',
  blobUrl: null,
  createdBy: null,
  createdOn: null,
  updatedOn: null
});

export default ImageRecord;
