import { Record } from 'immutable';

const VideoRecord = Record({
  id: null,
  name: null,
  type: 'VIDEO',
  blobUrl: null,
  createdBy: null,
  createdOn: null,
  updatedOn: null
});

export default VideoRecord;

