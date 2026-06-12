"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMealAction } from "./actions";

type FoodItemRow = {
  name: string;
  calories: string;
  quantity: string;
};

function formatDateTimeLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function NewMealForm() {
  const [name, setName] = useState("");
  const [eatenAt, setEatenAt] = useState(() => formatDateTimeLocal(new Date()));
  const [foodItems, setFoodItems] = useState<FoodItemRow[]>([
    { name: "", calories: "", quantity: "1" },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const addFoodItem = () => {
    setFoodItems((items) => [...items, { name: "", calories: "", quantity: "1" }]);
  };

  const removeFoodItem = (index: number) => {
    setFoodItems((items) => items.filter((_, i) => i !== index));
  };

  const updateFoodItem = (index: number, field: keyof FoodItemRow, value: string) => {
    setFoodItems((items) =>
      items.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        await createMealAction({
          name,
          eatenAt: new Date(eatenAt),
          foodItems: foodItems.map((item) => ({
            name: item.name,
            calories: Number(item.calories),
            quantity: Number(item.quantity),
          })),
        });
      } catch (err) {
        if (err instanceof Error && err.message.startsWith("NEXT_REDIRECT")) {
          throw err;
        }
        setError("No se pudo crear la comida. Verifica los datos e inténtalo de nuevo.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalles de la comida</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Desayuno"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="eatenAt">Fecha y hora</Label>
            <Input
              id="eatenAt"
              name="eatenAt"
              type="datetime-local"
              value={eatenAt}
              onChange={(e) => setEatenAt(e.target.value)}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Alimentos</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addFoodItem}>
            <Plus className="h-4 w-4" />
            Agregar alimento
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {foodItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor={`food-name-${index}`}>Nombre</Label>
                <Input
                  id={`food-name-${index}`}
                  value={item.name}
                  onChange={(e) => updateFoodItem(index, "name", e.target.value)}
                  placeholder="Ej. Manzana"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 sm:w-32">
                <Label htmlFor={`food-calories-${index}`}>Calorías</Label>
                <Input
                  id={`food-calories-${index}`}
                  type="number"
                  min="0"
                  step="any"
                  value={item.calories}
                  onChange={(e) => updateFoodItem(index, "calories", e.target.value)}
                  placeholder="0"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 sm:w-32">
                <Label htmlFor={`food-quantity-${index}`}>Cantidad</Label>
                <Input
                  id={`food-quantity-${index}`}
                  type="number"
                  min="0.01"
                  step="any"
                  value={item.quantity}
                  onChange={(e) => updateFoodItem(index, "quantity", e.target.value)}
                  placeholder="1"
                  required
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFoodItem(index)}
                disabled={foodItems.length === 1}
                aria-label="Eliminar alimento"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {error ? <p className="text-destructive text-sm">{error}</p> : null}

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar comida"}
        </Button>
      </div>
    </form>
  );
}
