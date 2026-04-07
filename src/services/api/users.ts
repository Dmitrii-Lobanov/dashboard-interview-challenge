export const getUsers = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filter?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  page?: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  limit?: number,
) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};
