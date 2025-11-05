import { z } from 'zod';

export const calculatorSchema = z.object({
  // Step 1: Medication
  medicationId: z.string().min(1, 'Veuillez sélectionner un médicament'),
  quantity: z
    .number()
    .min(1, 'La quantité doit être au moins 1')
    .max(1000, 'La quantité ne peut pas dépasser 1000'),
  duration: z
    .number()
    .min(1, 'La durée doit être au moins 1 jour')
    .max(365, 'La durée ne peut pas dépasser 365 jours'),

  // Step 2: Insurance
  insuranceType: z.enum(['cnops', 'cnss', 'private', 'none'], {
    errorMap: () => ({ message: "Veuillez sélectionner un type d'assurance" }),
  }),
  insuranceNumber: z.string().optional(),
  hasChronicDisease: z.boolean().default(false),

  // Step 3: Personal (optional for anonymous calculations)
  email: z
    .string()
    .email('Email invalide')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(/^(\+212|0)[5-7]\d{8}$/, 'Numéro de téléphone marocain invalide')
    .optional()
    .or(z.literal('')),
  region: z.string().min(1, 'Région requise'),

  // Step 4: Preferences
  receiveAlerts: z.boolean().default(true),
  saveHistory: z.boolean().default(false),
  shareData: z.boolean().default(false),
});

export type CalculatorFormData = z.infer<typeof calculatorSchema>;
