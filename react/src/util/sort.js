const Options = [
  'Name ASC',
  'Name DESC',
  'Type ASC',
  'Type DESC',
  'Updated ASC',
  'Updated DESC',
  'Created ASC',
  'Created DESC',
];

function Sort(primaryType, secondaryType, items) {
  if (!items) return items;

  const primarySorter = GetSorter(primaryType);
  const secondarySorter = GetSorter(secondaryType);
  return items.sort((a, b) => {
    const sorter = primarySorter(a, b);

    if (sorter === 0) return secondarySorter(a, b);
    return sorter;
  });
}

function GetSorter(option) {
  switch (option) {
    case Options[1]:
      return NameDESC;
    case Options[2]:
      return TypeASC;
    case Options[3]:
      return TypeDESC;
    case Options[4]:
      return UpdatedASC;
    case Options[5]:
      return UpdatedDESC;
    case Options[6]:
      return CreatedASC;
    case Options[7]:
      return CreatedDESC;
    default:
      return NameASC;
  }
}

function NameASC(a, b) {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}

function NameDESC(a, b) {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA > nameB) return -1;
  if (nameA < nameB) return 1;
  return 0;
}

function TypeASC(a, b) {
  if (a.type < b.type) return -1;
  if (a.type > b.type) return 1;
  return 0;
}

function TypeDESC(a, b) {
  if (a.type > b.type) return -1;
  if (a.type < b.type) return 1;
  return 0;
}

function UpdatedASC(a, b) {
  const dateA = new Date(a.updatedOn).getTime();
  const dateB = new Date(b.updatedOn).getTime();
  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
}

function UpdatedDESC(a, b) {
  const dateA = new Date(a.updatedOn).getTime();
  const dateB = new Date(b.updatedOn).getTime();
  if (dateA > dateB) return -1;
  if (dateA < dateB) return 1;
  return 0;
}

function CreatedASC(a, b) {
  const dateA = new Date(a.createdOn).getTime();
  const dateB = new Date(b.createdOn).getTime();
  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
}

function CreatedDESC(a, b) {
  const dateA = new Date(a.createdOn).getTime();
  const dateB = new Date(b.createdOn).getTime();
  if (dateA > dateB) return -1;
  if (dateA < dateB) return 1;
  return 0;
}

module.exports.Options = Options;
module.exports.Sort = Sort;
module.exports.GetSorter = GetSorter;
module.exports.NameASC = NameASC;
module.exports.NameDESC = NameDESC;
module.exports.TypeASC = TypeASC;
module.exports.TypeDESC = TypeDESC;
module.exports.UpdatedASC = UpdatedASC;
module.exports.UpdatedDESC = UpdatedDESC;
module.exports.CreatedASC = CreatedASC;
module.exports.CreatedDESC = CreatedDESC;

