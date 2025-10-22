import { z } from "zod";

// Facility validation schemas
export const multilingualStringSchema = z.record(
  z.string(),
  z.string().min(1, "This field is required")
);

export const categorySchema = z.object({
  _id: z.string(),
  name: multilingualStringSchema,
  key: z.string().min(1, "Category key is required"),
});

export const priceSchema = z.object({
  _id: z.string(),
  price: z.number().min(0, "Price cannot be negative"),
  payout: z.number().min(0, "Payout cannot be negative"),
  text: multilingualStringSchema,
});

export const activitySchema = z.object({
  time: z.string().min(1, "Time is required"),
  description: multilingualStringSchema,
});

export const workingHoursSchema = z.object({
  day: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z.enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ])
    ),
  activities: z.array(activitySchema),
});

export const facilityFormSchema = z.object({
  _id: z.string(),
  name: multilingualStringSchema,
  address: multilingualStringSchema,
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  website: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal(""))
    .optional(),
  imgs: z.array(z.string().optional().or(z.literal(""))),
  new: z.boolean(),
  popular: z.boolean(),
  location: z.object({
    Lat: z.number(),
    Lon: z.number(),
  }),
  img: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  workingHours: z.array(workingHoursSchema),
  categories: z.array(categorySchema),
  prices: z.array(priceSchema),
  rating: z.object({
    equipmentAverage: z.number(),
    equipmentCount: z.number(),
    hygieneAverage: z.number(),
    hygieneCount: z.number(),
    overallAverage: z.number(),
    overallCount: z.number(),
    staffAverage: z.number(),
    staffCount: z.number(),
  }),
  price: z.number().min(0, "Price cannot be negative"),
});

export type FacilityFormData = z.infer<typeof facilityFormSchema>;
