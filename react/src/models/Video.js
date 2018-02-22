import { Record } from 'immutable';

const VideoRecord = Record({
  id: null,
  name: null,
  playlistIndex: 0,
  url: null,
  type: 'VIDEO',
  createdOn: null,
  createdBy: null,
  updatedOn: null,
  updatedBy: null,
  deletedOn: null,
  deletedBy: null,
  containerId: null
});

export default VideoRecord;

