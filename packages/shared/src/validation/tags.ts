import { z } from 'zod';
import { CUISINE_TAGS, DIETARY_TAGS } from '../types/tags.js';

export const cuisineTagSchema = z.enum(CUISINE_TAGS);
export const dietaryTagSchema = z.enum(DIETARY_TAGS);
