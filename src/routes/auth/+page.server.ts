import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcrypt';

export const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email || !password) {
      return fail(400, { email, message: 'Missing email or password' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return fail(400, { email, message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return fail(400, { email, message: 'Invalid credentials' });
    }

    cookies.set('sessionid', user.id, { path: '/', httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7 });

    throw redirect(303, '/');
  },
};
