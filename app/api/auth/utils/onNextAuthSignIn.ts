import { Profile, User, Account } from 'next-auth';

export const onNextAuthSignIn = async (
  user: User,
  account: Account,
  profile: Profile
) => {
  console.log('onNextAuthSignIn', { user, account, profile });
};
