import { Record } from 'immutable';

const ImageRecord = Record({
  id: null,
  name: null,
  playlistIndex: 0,
  url: null,
  type: 'IMAGE',
  createdOn: null,
  createdBy: null,
  updatedOn: null,
  updatedBy: null,
  deletedOn: null,
  deletedBy: null,
  containerId: null,
  isBeingPreviewed: false,
});

export default ImageRecord;
