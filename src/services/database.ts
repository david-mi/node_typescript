import { usersMock } from "../mock/users.js"

export async function getUserById(userId: string) {
  const foundUser = usersMock.find((user) => user.id === userId)

  return foundUser
    ? Promise.resolve(foundUser)
    : Promise.reject(new Error("User not found !"))
}

export const databaseServices = {
  getUserById
}