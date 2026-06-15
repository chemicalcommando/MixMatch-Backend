import { UserModel, type UserDocument } from './user.model.js';

export const userRepository = {
  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email: email.toLowerCase() });
  },

  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id);
  },

  async create(email: string, passwordHash: string): Promise<UserDocument> {
    return UserModel.create({ email: email.toLowerCase(), passwordHash });
  },
};
