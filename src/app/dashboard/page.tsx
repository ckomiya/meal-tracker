"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Meal = {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  time: string;
};

const placeholderMeals: Meal[] = [
  {
    id: "1",
    name: "Avena con frutas",
    type: "breakfast",
    calories: 350,
    time: "08:00",
  },
  {
    id: "2",
    name: "Pollo a la plancha con arroz",
    type: "lunch",
    calories: 620,
    time: "13:00",
  },
  {
    id: "3",
    name: "Yogur con nueces",
    type: "snack",
    calories: 180,
    time: "17:00",
  },
  {
    id: "4",
    name: "Ensalada con salmón",
    type: "dinner",
    calories: 480,
    time: "20:30",
  },
];

const mealTypeLabels: Record<Meal["type"], string> = {
  breakfast: "Desayuno",
  lunch: "Almuerzo",
  dinner: "Cena",
  snack: "Snack",
};

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 sm:p-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Selecciona una fecha para ver las comidas registradas.
        </p>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate
              ? selectedDate.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Selecciona una fecha"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        </PopoverContent>
      </Popover>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Comidas del día</h2>

        {placeholderMeals.length === 0 ? (
          <Card>
            <CardContent className="text-muted-foreground py-10 text-center text-sm">
              No hay comidas registradas para esta fecha.
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {placeholderMeals.map((meal) => (
              <Card key={meal.id}>
                <CardHeader className="flex-row items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <CardTitle>{meal.name}</CardTitle>
                    <CardDescription>{meal.time}</CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {mealTypeLabels[meal.type]}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {meal.calories} kcal
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
