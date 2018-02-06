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
    super(fromObject);
    this.set('content', List(fromObject.content));
  }
}

export default Playlist;

