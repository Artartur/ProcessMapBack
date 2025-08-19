import { Response } from "express";

export function deleteResponse(res: Response) {
  return res.json({
    success: true,
    message: 'Data succefully deleted'
  })
}

export function internalServerErrorResponse(res: Response) {
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
}

export function notFoundResponse(
  res: Response
) {
  return res.status(404).json({
    success: false,
    error: "Resource not found"
  })
}

export function successfulRequestResponse<T>(
  data: T | null,
  res: Response
) {
  return res.json({
    success: true,
    data: data,
  });
}
