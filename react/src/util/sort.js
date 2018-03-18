class Sort {
  static Options = [
    'Name ASC',
    'Name DESC',
    'Type ASC',
    'Type DESC',
    'Updated ASC',
    'Updated DESC',
    'Created ASC',
    'Created DESC',
  ];

  static Sort(type, items) {
    const sorter = Sort.GetSorter(type);

    return sorter(items);
  }

  static GetSorter(option) {
    switch (option) {
      case Sort.Options[1]:
        return Sort.NameDESC;
      case Sort.Options[2]:
        return Sort.TypeASC;
      case Sort.Options[3]:
        return Sort.TypeDESC;
      case Sort.Options[4]:
        return Sort.UpdatedASC;
      case Sort.Options[5]:
        return Sort.UpdatedDESC;
      case Sort.Options[6]:
        return Sort.CreatedASC;
      case Sort.Options[7]:
        return Sort.CreatedDESC;
      default:
        return Sort.NameASC;
    }
  }

  static NameASC(items) {
    return items.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  static NameDESC(items) {
    return items.sort((a, b) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
  }

  static TypeASC(items) {
    return items.sort((a, b) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      return 0;
    });
  }

  static TypeDESC(items) {
    return items.sort((a, b) => {
      if (a.type > b.type) return -1;
      if (a.type < b.type) return 1;
      return 0;
    });
  }

  static UpdatedASC(items) {
    return items.sort((a, b) => {
      const dateA = new Date(a.updatedOn).getTime();
      const dateB = new Date(b.updatedOn).getTime();
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
  }

  static UpdatedDESC(items) {
    return items.sort((a, b) => {
      const dateA = new Date(a.updatedOn).getTime();
      const dateB = new Date(b.updatedOn).getTime();
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return 0;
    });
  }

  static CreatedASC(items) {
    return items.sort((a, b) => {
      const dateA = new Date(a.createdOn).getTime();
      const dateB = new Date(b.createdOn).getTime();
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
  }

  static CreatedDESC(items) {
    return items.sort((a, b) => {
      const dateA = new Date(a.createdOn).getTime();
      const dateB = new Date(b.createdOn).getTime();
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return 0;
    });
  }
}

export default Sort;
