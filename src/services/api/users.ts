export const getUsers = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  
  // Mock a large dataset of 500 users for virtualization testing
  const allUsers = Array.from({ length: 500 }).map((_, index) => {
    const original = data[index % data.length];
    return {
      ...original,
      id: index + 1,
      name: `${original.name} ${index + 1}`,
      email: `user${index + 1}@example.com`,
    };
  });

  const filteredUsers = search.trim()
    ? allUsers.filter(u => 
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      )
    : allUsers;

  const startIndex = (page - 1) * limit;
  return {
    data: filteredUsers.slice(startIndex, startIndex + limit),
    totalCount: filteredUsers.length
  };
};
