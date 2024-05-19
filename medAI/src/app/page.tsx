// Landing
import * as React from "react";
import { Typper } from "@/components/components/typper";
import { CardWithForm } from "@/components/components/card";
import Navbar from "@/components/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="pt-[4rem]"> {/* Ajusta el padding-top para que coincida con la altura de la navbar */}
        <Typper />
        <div className="p-20 items-center justify-center">
          <CardWithForm />
        </div>
      </div>
    </div>
  );
}
