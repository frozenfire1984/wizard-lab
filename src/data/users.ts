interface User {
  id: number,
  name: string,
  role: string,
  active?: boolean,
}

const users: User[] = [
  {
    id: 1,
    name: "John",
    role: "SEO",
    active: true
  },
  {
    id: 2,
    name: "Anna",
    role: "Designer"
  },
  {
    id: 3,
    name: "Daniel",
    role: "Programmer"
  },
]

export { users, type User }