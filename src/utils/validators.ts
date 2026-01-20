import { z } from 'zod';

// Email validation
export const emailSchema = z.string().email('Invalid email address');

// Password validation
export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password must be less than 100 characters');

// User validation
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['admin', 'auditor']),
});

// Item validation
export const itemSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  expectedQuantity: z.number().min(0, 'Quantity must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  barcodes: z.array(z.string()).min(0),
});

// Task validation
export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  assignedTo: z.string().optional(),
  items: z.array(
    z.object({
      itemId: z.string(),
      expectedQuantity: z.number().min(0),
    })
  ).min(1, 'At least one item is required'),
  dueDate: z.date(),
});

// Submit task validation
export const submitTaskSchema = z.object({
  taskId: z.string().min(1),
  items: z.array(
    z.object({
      itemId: z.string(),
      countedQuantity: z.number().min(0),
      notes: z.string().optional(),
    })
  ).min(1),
});

// Generic validators
export const isValidEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success;
};

export const isValidPassword = (password: string): boolean => {
  return passwordSchema.safeParse(password).success;
};

export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  try {
    schema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path) {
          errors[err.path.join('.')] = err.message;
        }
      });
      return { success: false, errors };
    }
    return { success: false, errors: { _form: 'Validation failed' } };
  }
};
