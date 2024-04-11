'use server';

import { removeAuthentication } from './authentications';

export default async function logout() {
  await removeAuthentication();
  return { success: true, message: 'You logout' };
}
