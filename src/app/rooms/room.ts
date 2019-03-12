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
  items: [
    {
      itemName: string;
      addedBy: {
        uid: string;
        time: Date;
      };
      enabled: boolean;
      _id?: string;
    }
  ];
  _id?: string;
}
