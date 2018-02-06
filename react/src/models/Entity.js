import { List, Record } from 'immutable';

const EntityRecord = Record({
  fullUrl: null,
  name: null,
  type: null,
  content: List(),
  createdOn: null,
  updatedOn: null
});

export default EntityRecord;

