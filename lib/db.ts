type UserWhereUniqueInput = {
  id?: string
  email?: string
}

export const db = {
  user: {
    // Placeholder implementation - extend with real logic when needed
    findUnique: async (_args: { where: UserWhereUniqueInput }) => null,
  },
}
