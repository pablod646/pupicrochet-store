import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
  const { user } = await parent();

  if (!user || user.role !== 'ADMIN') {
    throw redirect(303, '/'); // Redirect to home or a forbidden page
  }

  return {};
};
