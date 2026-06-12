"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createMeal } from "@/data/meals";

const foodItemSchema = z.object({
  name: z.string().trim().min(1, "El nombre del alimento es obligatorio"),
  calories: z.number().min(0, "Las calorías no pueden ser negativas"),
  quantity: z.number().min(0.01, "La cantidad debe ser mayor a 0"),
});

const createMealSchema = z.object({
  name: z.string().trim().min(1, "El nombre de la comida es obligatorio"),
  eatenAt: z.coerce.date(),
  foodItems: z.array(foodItemSchema).min(1, "Agrega al menos un alimento"),
});

export type CreateMealInput = z.infer<typeof createMealSchema>;

export async function createMealAction(input: CreateMealInput) {
  const parsed = createMealSchema.parse(input);

  await createMeal(parsed);

  redirect("/dashboard");
}
