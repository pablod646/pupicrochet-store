import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies }) => {
    cookies.delete('sessionid', { path: '/' });
    throw redirect(303, '/auth');
  },
};
