export interface Room {
  roomName: string;
  description: string;
  created: {
    uid: string;
    time: Date;
  };
  permissions: [
    {
      uid: string;
      addedBy: {
        uid: string;
        time: Date;
      };
      level: Number;
      _id?: string;
    }
  ];
  noteItems: [
    {
      value: string;
      addedBy: {
        uid: string;
        time: Date;
      };
      _id?: string;
    }
  ];
  listItems: [
    {
      _id?: string;
      listName: string;
      addedBy: {
        uid: string;
        time: Date;
      };
      items: [
        {
          _id?: string;
          itemName: string;
          addedBy: {
            uid: string;
            time: Date;
          };
          enabled: boolean;
        }
      ];
    }
  ];
  _id?: string;
}
