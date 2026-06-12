import { getFoodItems } from "@/data/meals";
import { NewMealForm } from "./meal-form";

export default async function NewMealPage() {
  const foodItemOptions = await getFoodItems();

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 sm:p-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Nueva comida</h1>
        <p className="text-muted-foreground text-sm">
          Registra una nueva comida y los alimentos que la componen.
        </p>
      </div>

      <NewMealForm foodItemOptions={foodItemOptions} />
    </div>
  );
}
