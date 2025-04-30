interface User {
    id : number;
    name : string | number;
    status : "online" | "offline" | "busy" ;
    available : boolean;
    images : string;
}

export const users : User[] = [
    {
      id: 1,
      name: "John Doe",
      status: "online",
      available: true,
      images: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
    },
    {
      id: 2,
      name: "Jane Doe",
      status: "offline",
      available: false,
      images: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
    },
    {
      id: 3,
      name: "Bob Smith",
      status: "busy",
      available: false,
      images: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
    },
    {
      id: 4,
      name: "Alice Johnson",
      status: "online",
      available: true,
      images: "https://images.unsplash.com/photo-1517841905247-7e5b8455bb3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
    },
    {
      id: 5,
      name: "Mike Brown",
      status: "offline",
      available: false,
      images: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
    }
  ];

