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
      isWallet: boolean;
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
          bought: {
            uid: string;
            time: Date;
          };
          dues: [
            {
              _id?: string;
              uid: string;
              amount: number;
            }
          ];
        }
      ];
    }
  ];
  _id?: string;
}
