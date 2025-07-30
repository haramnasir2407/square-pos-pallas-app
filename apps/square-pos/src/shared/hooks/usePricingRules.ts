import type {
  PricingRule,
  UsePricingRulesReturn,
} from "@/shared/types/catalog";
import { useEffect, useState } from "react";

export function usePricingRules(accessToken: string): UsePricingRulesReturn {
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setPricingRules([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    async function fetchPricingRules() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/pricing-rules", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPricingRules(data.objects || []);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error("Failed to fetch pricing rules:", error);
        setError(error.message || "Failed to fetch pricing rules");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPricingRules();
  }, [accessToken]);

  return {
    pricingRules,
    isLoading,
    error,
  };
}
