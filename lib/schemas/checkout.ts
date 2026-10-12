import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase(),

  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Please enter a valid phone number"
    ),

  address: z
    .string()
    .min(5, "Please enter your full street address")
    .max(100, "Address too long"),

  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City name too long"),

  state: z
    .string()
    .min(2, "Please enter your state/province")
    .max(50, "State name too long"),

  postalCode: z
    .string()
    .regex(/^[A-Z0-9]{3,10}(?:[-\s][A-Z0-9]{3,10})?$/i, "Please enter a valid postal code"),

  country: z
    .string()
    .min(2, "Please select a country"),

  cardName: z
    .string()
    .min(2, "Cardholder name must be at least 2 characters")
    .max(60, "Name too long"),

  cardNumber: z
    .string()
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Please enter a valid 16-digit card number"),

  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry must be in MM/YY format")
    .refine((val) => {
      const [month, year] = val.split("/");
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
      return expiry > new Date();
    }, "Card has expired"),

  cardCvv: z
    .string()
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
