import { List, Record } from 'immutable';

const PlaylistRecord = Record({
  fullUrl: null,
  name: null,
  type: 'PLAYLIST',
  content: List(),
  createdBy: null,
  createdOn: null,
  updatedOn: null
});

class Playlist extends PlaylistRecord {
  constructor(fromObject) {
    const record = super(fromObject);
    return record.set('content', List(record.get('content')));
  }
}

export default Playlist;

