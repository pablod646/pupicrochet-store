import { json } from '@sveltejs/kit';
import type { ApiSuccessResponse, ApiErrorResponse } from '$lib/types/api.types';

export function jsonSuccess<T>(data: T, init?: ResponseInit): Response {
  const body: ApiSuccessResponse<T> = {
    success: true,
    data,
  };
  return json(body, init);
}

export function jsonError(message: string, status: number, code?: string): Response {
  const body: ApiErrorResponse = {
    success: false,
    error: {
      message,
      code,
    },
  };
  return json(body, { status });
}
