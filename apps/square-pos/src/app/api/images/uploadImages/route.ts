// import FormData from "form-data";
// import { promises as fsPromises } from "fs"; // research this
// import fs from "fs";
// import { type NextRequest, NextResponse } from "next/server";
// import path from "path";
// import { v4 as uuidv4 } from "uuid";
// import { apiFetch } from "@/shared/utils/apiFetch";
// import { API_CONFIG } from "@/shared/constants/api";

// const IMAGES_DIR = path.join(process.cwd(), "images_jpg");
// const OUT_JSON = path.join(process.cwd(), "square_image_ids.json");
// const DATA_PATH = path.join(process.cwd(), "data.json");

// // * helper to get product info by SKU
// function getProductInfoBySku(sku: string, products: any[]): { title?: string } {
//   return products.find((p) => p.sku === sku) || {};
// }

// async function uploadImage(filePath: string, fileName: string, accessToken: string, products: any[]) {
//   const sku = fileName.split('_')[0];
//   const product = getProductInfoBySku(sku, products);
//   const title = product.title || sku;

//   const form = new FormData();
//   form.append("file", fs.createReadStream(filePath));
//   form.append(
//     "request",
//     JSON.stringify({
//       image: {
//         image_data: {
//           caption: title,
//           name: title,
//         },
//         type: "IMAGE",
//         id: `#${sku}`,
//       },
//       idempotency_key: uuidv4(),
//       is_primary: true,
//       // object_id: "PR23EJW6JXOLAB2OMNKWOHBY", // set it to associate immediately
//     }),
//     { contentType: "application/json" }
//   );

//   try {
//     const data = await apiFetch(
//       `${API_CONFIG.SQUARE_BASE_URL}/v2/catalog/images`,
//       {
//         method: "POST",
//         body: form as any, // node-fetch supports FormData
//         headers: {
//           ...form.getHeaders(),
//           Accept: "application/json",
//         },
//       },
//       accessToken
//     );
//     return data.image?.id;
//   } catch (err: any) {
//     console.error("Failed to upload", fileName, err instanceof Error ? err.message : err);
//     return null;
//   }
// }

// export async function POST(req: NextRequest) {
//   const accessToken = req.headers.get("authorization")?.replace("Bearer ", "");
//   if (!accessToken) {
//     return NextResponse.json({ error: "Missing Authorization header" }, { status: 401 });
//   }

//   let files: string[] = [];
//   let products: any[] = [];
//   try {
//     files = fs.readdirSync(IMAGES_DIR).filter((f) => f.endsWith(".jpg"));
//     const data = JSON.parse(await fsPromises.readFile(DATA_PATH, "utf-8"));
//     products = data.products || [];
//   } catch (err) {
//     return NextResponse.json({ error: "images_jpg directory or data.json not found" }, { status: 500 });
//   }

//   const mapping: Record<string, string> = {};
//   for (const file of files) {
//     const filePath = path.join(IMAGES_DIR, file);
//     const imageId = await uploadImage(filePath, file, accessToken, products);
//     if (imageId) {
//       mapping[file] = imageId;
//     }
//   }

//   await fsPromises.writeFile(OUT_JSON, JSON.stringify(mapping, null, 2));
//   return NextResponse.json({ mapping });
// } 