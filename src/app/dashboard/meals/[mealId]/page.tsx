import { notFound } from "next/navigation";
import { getMealById } from "@/data/meals";
import { EditMealForm } from "./meal-form";

type EditMealPageProps = {
  params: Promise<{ mealId: string }>;
};

export default async function EditMealPage({ params }: EditMealPageProps) {
  const { mealId } = await params;
  const meal = await getMealById(mealId);

  if (!meal) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 sm:p-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Editar comida</h1>
        <p className="text-muted-foreground text-sm">
          Actualiza los detalles de la comida y los alimentos que la componen.
        </p>
      </div>

      <EditMealForm meal={meal} />
    </div>
  );
}
