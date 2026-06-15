import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { AuthResponse } from '@discoverly/shared';
import { env } from '../../../shared/config/env.js';
import { AppError } from '../../../shared/errors/app-error.js';
import { userRepository } from '../../users/repositories/user.repository.js';
import { toPublicUser } from '../../users/services/user.service.js';
import type { JwtPayload } from '../types/auth.types.js';

const PASSWORD_SALT_ROUNDS = 10;

function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export const authService = {
  async register(email: string, password: string): Promise<AuthResponse> {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw AppError.conflict('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
    const user = await userRepository.create(email, passwordHash);
    const publicUser = toPublicUser(user);

    return {
      user: publicUser,
      token: signToken({ sub: publicUser.id, email: publicUser.email }),
    };
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw AppError.unauthorized('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw AppError.unauthorized('Invalid email or password');
    }

    const publicUser = toPublicUser(user);

    return {
      user: publicUser,
      token: signToken({ sub: publicUser.id, email: publicUser.email }),
    };
  },

  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    } catch {
      throw AppError.unauthorized('Invalid or expired token');
    }
  },
};
