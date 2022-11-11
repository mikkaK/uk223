type groupData = {
  id: string | null;
};
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  group?: groupData;
};
