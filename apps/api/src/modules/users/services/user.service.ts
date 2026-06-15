import type { UserDocument } from '../repositories/user.model.js';
import type { PublicUser } from '../types/user.types.js';

export function toPublicUser(user: UserDocument): PublicUser {
  return {
    id: user._id.toString(),
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
