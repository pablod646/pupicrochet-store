import pino from 'pino';
import { dev } from '$app/environment';

const logger = pino({
  level: dev ? 'trace' : 'info',
  ...(dev
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      }
    : {}),
});

export default logger;