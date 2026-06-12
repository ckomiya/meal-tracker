import { auth } from "@clerk/nextjs/server";
import { and, eq, gte, lt } from "drizzle-orm";
import db from "@/db";
import { meals, mealFoodItems, foodItems } from "@/db/schema";

export type MealWithCalories = {
  id: string;
  name: string;
  eatenAt: Date;
  calories: number;
};

export async function getMealsForDate(date: Date): Promise<MealWithCalories[]> {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const rows = await db
    .select({
      id: meals.id,
      name: meals.name,
      eatenAt: meals.eatenAt,
      calories: foodItems.calories,
      quantity: mealFoodItems.quantity,
    })
    .from(meals)
    .leftJoin(mealFoodItems, eq(mealFoodItems.mealId, meals.id))
    .leftJoin(foodItems, eq(foodItems.id, mealFoodItems.foodItemId))
    .where(
      and(
        eq(meals.userId, userId),
        gte(meals.eatenAt, startOfDay),
        lt(meals.eatenAt, endOfDay)
      )
    );

  const mealsById = new Map<string, MealWithCalories>();

  for (const row of rows) {
    const existing = mealsById.get(row.id);
    const calories = (row.calories ?? 0) * (row.quantity ?? 1);

    if (existing) {
      existing.calories += calories;
    } else {
      mealsById.set(row.id, {
        id: row.id,
        name: row.name,
        eatenAt: row.eatenAt,
        calories,
      });
    }
  }

  return Array.from(mealsById.values());
}

export type MealWithFoodItems = {
  id: string;
  name: string;
  eatenAt: Date;
  foodItems: {
    id: string;
    name: string;
    calories: number;
    quantity: number;
  }[];
};

export async function getMealById(mealId: string): Promise<MealWithFoodItems | null> {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const rows = await db
    .select({
      id: meals.id,
      name: meals.name,
      eatenAt: meals.eatenAt,
      foodItemId: foodItems.id,
      foodItemName: foodItems.name,
      calories: foodItems.calories,
      quantity: mealFoodItems.quantity,
    })
    .from(meals)
    .leftJoin(mealFoodItems, eq(mealFoodItems.mealId, meals.id))
    .leftJoin(foodItems, eq(foodItems.id, mealFoodItems.foodItemId))
    .where(and(eq(meals.id, mealId), eq(meals.userId, userId)));

  if (rows.length === 0) {
    return null;
  }

  const [first] = rows;

  return {
    id: first.id,
    name: first.name,
    eatenAt: first.eatenAt,
    foodItems: rows
      .filter((row) => row.foodItemId !== null)
      .map((row) => ({
        id: row.foodItemId as string,
        name: row.foodItemName as string,
        calories: row.calories as number,
        quantity: row.quantity as number,
      })),
  };
}

export type UpdateMealFoodItem = {
  id?: string;
  name: string;
  calories: number;
  quantity: number;
};

export type UpdateMeal = {
  name: string;
  eatenAt: Date;
  foodItems: UpdateMealFoodItem[];
};

export async function updateMeal(mealId: string, meal: UpdateMeal): Promise<void> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("No autenticado");
  }

  const [existingMeal] = await db
    .select({ id: meals.id })
    .from(meals)
    .where(and(eq(meals.id, mealId), eq(meals.userId, userId)));

  if (!existingMeal) {
    throw new Error("Comida no encontrada");
  }

  await db
    .update(meals)
    .set({
      name: meal.name,
      eatenAt: meal.eatenAt,
      updatedAt: new Date(),
    })
    .where(eq(meals.id, mealId));

  await db.delete(mealFoodItems).where(eq(mealFoodItems.mealId, mealId));

  for (const item of meal.foodItems) {
    const [createdFoodItem] = await db
      .insert(foodItems)
      .values({
        name: item.name,
        calories: item.calories,
      })
      .returning({ id: foodItems.id });

    await db.insert(mealFoodItems).values({
      mealId,
      foodItemId: createdFoodItem.id,
      quantity: item.quantity,
    });
  }
}

export type NewMealFoodItem = {
  name: string;
  calories: number;
  quantity: number;
};

export type NewMeal = {
  name: string;
  eatenAt: Date;
  foodItems: NewMealFoodItem[];
};

export async function createMeal(meal: NewMeal): Promise<{ id: string }> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("No autenticado");
  }

  const [createdMeal] = await db
    .insert(meals)
    .values({
      userId,
      name: meal.name,
      eatenAt: meal.eatenAt,
    })
    .returning({ id: meals.id });

  for (const item of meal.foodItems) {
    const [createdFoodItem] = await db
      .insert(foodItems)
      .values({
        name: item.name,
        calories: item.calories,
      })
      .returning({ id: foodItems.id });

    await db.insert(mealFoodItems).values({
      mealId: createdMeal.id,
      foodItemId: createdFoodItem.id,
      quantity: item.quantity,
    });
  }

  return { id: createdMeal.id };
}
