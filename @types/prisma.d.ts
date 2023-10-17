const userWithBusinessUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { businessUser: true },
});

export type UserWithBusinessUser = Prisma.UserGetPayload<
  typeof userWithBusinessUser
>;
