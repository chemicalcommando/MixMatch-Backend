import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../shared/errors/app-error.js';
import { userRepository } from '../../users/repositories/user.repository.js';
import { toPublicUser } from '../../users/services/user.service.js';
import { authService } from '../services/auth.service.js';
import type { AuthenticatedRequest } from '../../../shared/types/express.js';
import { loginSchema, registerSchema } from '../validators/auth.validators.js';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = registerSchema.parse(req.body);
      const result = await authService.register(email, password);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async me(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw AppError.unauthorized();
      }

      const user = await userRepository.findById(req.user.id);
      if (!user) {
        throw AppError.unauthorized();
      }

      res.status(200).json({ user: toPublicUser(user) });
    } catch (error) {
      next(error);
    }
  },
};
