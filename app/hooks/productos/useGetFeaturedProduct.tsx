"use client";

import { useState, useEffect } from "react";
import type { Producto, ApiResponse } from "@/components/types/producto";

export function UseGetFeaturedProduct() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos?filters[destacado][$eq]=true&populate=imagenes`;
        
        console.log("Fetching from URL:", url);
        
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const json: ApiResponse = await res.json();
        
        console.log("=== DEBUGGING API RESPONSE ===");
        console.log("Respuesta completa:", JSON.stringify(json, null, 2));
        console.log("Tipo de json.data:", typeof json.data);
        console.log("Es array json.data:", Array.isArray(json.data));
        console.log("Número de productos:", json.data?.length || 0);
        
        if (json.data && json.data.length > 0) {
          console.log("Primer producto:", JSON.stringify(json.data[0], null, 2));
          console.log("Estructura del primer producto:");
          console.log("- id:", json.data[0]?.id);
          console.log("- attributes:", json.data[0]);
          console.log("- imagenes:", json.data[0]?.imagenes);
        }
        console.log("=== FIN DEBUG ===");
        
        setResult(json);
      } catch (err: any) {
        console.error("Error en el fetch:", err);
        setError(err.message || "Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, result, error };

}
