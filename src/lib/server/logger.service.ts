import pino from 'pino';
import { dev } from '$app/environment';

const logger = pino({
  level: dev ? 'trace' : 'info',
  transport: dev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      }
    : undefined,
});

export default logger;
