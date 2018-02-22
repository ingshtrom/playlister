import { List, Record } from 'immutable';

const PlaylistRecord = Record({
  id: null,
  fullPath: null,
  name: null,
  type: 'PLAYLIST',
  content: List(),
  isLocked: false,
  eventStart: null,
  eventEnd: null,
  createdBy: null,
  createdOn: null,
  updatedOn: null,
  updatedBy: null,
  deletedBy: null,
  deletedOn: null,
  parentId: null,
});

class Playlist extends PlaylistRecord {
  constructor(fromObject) {
    const record = super(fromObject);
    return record.set('content', List(record.get('content')));
  }
}

export default Playlist;

