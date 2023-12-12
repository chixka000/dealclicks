import { NextRequest } from "next/server";
import { SchemaField } from "@/app/backend/shared/interfaces/validator";
import { validatorHandler } from "@/app/backend/shared/validator/rules/validation";
import { formDataToJson } from "@/app/backend/shared/utils/formdataToJson";

export default class SchemaValidator {
  async validate(
    request: NextRequest,
    validator: Function,
    params?: { id: string }
  ) {
    let data: any;
    try {
      data = await request.formData();

      data = formDataToJson(data);
    } catch (error) {
      data = await request.json();
    }

    const properties: {
      schema: { [key: string]: SchemaField };
      message: { [key: string]: { [key: string]: string } };
    } = await validator(request, data, params);

    const errors = await validatorHandler(
      data,
      properties.schema,
      properties.message
    );

    if (errors.length) throw { code: 422, errors };

    return data;
  }
}
