// import { NextRequest } from "next/server";
// import { IProduct, IProductValidator } from "../interfaces/product";
// import { IUser } from "../../user/interfaces";
// import { authorize } from "../../shared/utils/getDataFromToken";
// import Product from "../models/product";
// import Store from "../../store/models/store";

// export async function productValidator(
//   request: NextRequest,
//   data: IProduct,
//   params?: { id: string }
// ): Promise<{ schema: IProductValidator; message: any; user: IUser }> {
//   try {
//     const user = await authorize(request);

//     if (!user)
//       throw new Error(`You don't have permission to execute this request.`);

//     const method = request.method;

//     const schema: IProductValidator = {
//       name: {
//         type: "string",
//         required: true,
//         rules: [
//           {
//             method: "unique",
//             model: "Product",
//             where: { storeId: data.storeId },
//             whereNot:
//               method === "PATCH" || method === "PUT"
//                 ? { _id: { $ne: params!.id } }
//                 : {},
//           },
//           {
//             method: "minLength",
//             property: "productName",
//           },
//         ],
//       },
//       description: {
//         type: "string",
//         required: false,
//         rules: [{ method: "minLength", property: "description", size: 10 }],
//       },
//       price: {
//         type: "number",
//         required: false,
//       },
//       storeId: {
//         type: "string",
//         required: true,
//         rules: [
//           {
//             method: "exists",
//             model: "Store",
//             where: { _id: data.storeId, owner: user._id },
//           },
//         ],
//       },
//       variants: {
//         type: "array",
//         children: {
//           name: {
//             type: "string",
//             required: true,
//             rules: [
//               {
//                 method: "minLength",
//               },
//             ],
//           },
//           sizes: {
//             type: 'array',
//             required: true,
//             children: {
              
//             }
//           }
//         },
//       },
//     };

//     const message = {};

//     return { schema, message, user };
//   } catch (error) {
//     throw new Error(`You don't have permission to execute this request.`);
//   }
// }
