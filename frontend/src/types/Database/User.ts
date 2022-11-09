type groupData={
  id:string;
}
export type User = {
    id: string;
    firstName: string;
    lastName:string;
    email:string;
    group?:groupData;
  };
  