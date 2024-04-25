export const isAdmin = (userId) => {
  console.log(userId);
  const adminArray = ["65857b4b9234a1d9e280f1b2"];
  return adminArray.includes(userId);
};
