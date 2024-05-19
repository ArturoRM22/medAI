import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const preventionThemes = [
  {
    title: "Lavado de manos",
    description: "Instrucciones para un adecuado lavado de manos.",
  },
  {
    title: "Uso de mascarillas",
    description: "Cómo usar correctamente las mascarillas para prevenir contagios.",
  },
  {
    title: "Distanciamiento social",
    description: "Consejos para mantener el distanciamiento social y prevenir la propagación de enfermedades.",
  },
];

export function CardWithForm() {
  return (
    <div className="grid grid-cols-1  gap-6">
      {preventionThemes.map((theme, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle>{theme.title}</CardTitle>
            <CardDescription>{theme.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  {/* Aquí puedes agregar campos de formulario relacionados con el tema si es necesario */}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* Puedes agregar contenido al pie de cada carta si es necesario */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
