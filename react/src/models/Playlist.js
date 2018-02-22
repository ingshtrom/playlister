import { List, Record } from 'immutable';

const PlaylistRecord = Record({
  id: null,
  fullPath: null,
  name: null,
  type: 'PLAYLIST',
  mediaContent: List(),
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
    return record.set('mediaContent', List(record.get('mediaContent')));
  }
}

export default Playlist;

