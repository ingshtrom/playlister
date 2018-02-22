import { List, Record } from 'immutable';

const FolderRecord = Record({
 id: null,
  fullPath: null,
  name: null,
  type: 'FOLDER',
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

class Folder extends FolderRecord {
  constructor(fromObject) {
    const record = super(fromObject);
    return record.set('content', List(record.get('content')));
  }
}

export default Folder;

