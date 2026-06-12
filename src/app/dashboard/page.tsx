import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getMealsForDate } from "@/data/meals";
import { DashboardDatePicker } from "./date-picker";

function parseDateParam(value: string | undefined): Date {
  if (!value) return new Date();

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return new Date();

  return new Date(year, month - 1, day);
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  const selectedDate = parseDateParam(date);
  const meals = await getMealsForDate(selectedDate);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 sm:p-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Selecciona una fecha para ver las comidas registradas.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/meals/new">Log New Meal</Link>
        </Button>
      </div>

      <DashboardDatePicker selectedDate={selectedDate} />

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Comidas del día</h2>

        {meals.length === 0 ? (
          <Card>
            <CardContent className="text-muted-foreground py-10 text-center text-sm">
              No hay comidas registradas para esta fecha.
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {meals.map((meal) => (
              <Link key={meal.id} href={`/dashboard/meals/${meal.id}`}>
                <Card className="transition-colors hover:bg-muted/50">
                  <CardHeader className="flex-row items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <CardTitle>{meal.name}</CardTitle>
                      <CardDescription>
                        {meal.eatenAt.toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {meal.calories} kcal
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
