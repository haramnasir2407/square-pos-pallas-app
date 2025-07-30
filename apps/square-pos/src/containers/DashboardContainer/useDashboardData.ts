import { API_CONFIG } from "@/shared/constants/api";
import type {
  CatalogObject,
  InventoryData,
  Item,
  ProductCatalog,
} from "@/shared/types/catalog";

// ? the data fetching logic can be added to service

export interface DashboardDataReturn {
  products: ProductCatalog;
  inventoryData: InventoryData;
}

export default async function useDashboardData(session: {
  accessToken: string;
}): Promise<DashboardDataReturn> {
  // * Fetch products server side
  let products = null;
  try {
    const response = await fetch(
      `${API_CONFIG.SQUARE_BASE_URL}/v2/catalog/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Square-Version": `${API_CONFIG.SQUARE_VERSION}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          object_types: [
            "ITEM",
            "IMAGE",
            "CATEGORY",
            "TAX",
            "DISCOUNT",
            "PRICING_RULE",
            "PRODUCT_SET",
          ],
          include_related_objects: true,
        }),
      }
    );
    if (response.ok) {
      products = await response.json();
    }
  } catch (e) {
    // fail silently, fallback to client fetch
  }

  /**
   * Extract item and variation IDs from products.
   */
  const items: Item[] =
    (products?.objects as CatalogObject[])?.filter(
      (obj): obj is Item => obj.type === "ITEM"
    ) || [];

  const variationIds = items?.flatMap(
    (item: Item) => item.item_data?.variations?.map((v) => v.id) ?? []
  );

  // * Fetch inventory server side
  let inventoryData = null;
  try {
    const response = await fetch(
      `${API_CONFIG.SQUARE_BASE_URL}/v2/inventory/counts/batch-retrieve`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Square-Version": `${API_CONFIG.SQUARE_VERSION}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          catalog_object_ids: variationIds,
        }),
      }
    );
    if (response.ok) {
      inventoryData = await response.json();
    }
  } catch (e) {
    // fail silently, fallback to client fetch
  }

  return { products, inventoryData };
}
