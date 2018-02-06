import { List, Record } from 'immutable';

const FolderRecord = Record({
  fullUrl: null,
  name: null,
  type: 'FOLDER',
  content: List(),
  createdOn: null,
  updatedOn: null
});

class Folder extends FolderRecord {
  constructor(fromObject) {
    const record = super(fromObject);
    return record.set('content', List(record.get('content')));
  }
}

export default Folder;

