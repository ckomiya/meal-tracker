"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { updateMeal } from "@/data/meals";

const foodItemSchema = z.object({
  foodItemId: z.string().uuid().optional(),
  name: z.string().trim().min(1, "El nombre del alimento es obligatorio"),
  calories: z.number().min(0, "Las calorías no pueden ser negativas"),
  quantity: z.number().min(0.01, "La cantidad debe ser mayor a 0"),
});

const updateMealSchema = z.object({
  mealId: z.string().uuid(),
  name: z.string().trim().min(1, "El nombre de la comida es obligatorio"),
  eatenAt: z.coerce.date(),
  foodItems: z.array(foodItemSchema).min(1, "Agrega al menos un alimento"),
});

export type UpdateMealInput = z.infer<typeof updateMealSchema>;

export async function updateMealAction(input: UpdateMealInput) {
  const parsed = updateMealSchema.parse(input);

  await updateMeal(parsed.mealId, {
    name: parsed.name,
    eatenAt: parsed.eatenAt,
    foodItems: parsed.foodItems,
  });

  redirect("/dashboard");
}
