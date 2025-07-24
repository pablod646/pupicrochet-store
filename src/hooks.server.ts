import { prisma } from '$lib/server/prisma';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('sessionid');

	if (sessionId) {
		const user = await prisma.user.findUnique({
			where: { id: sessionId },
			select: { id: true, email: true, name: true, role: true }
		});
		if (user) {
			event.locals.user = user;
		}
	}

	return resolve(event);
};
