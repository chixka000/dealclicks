import SchemaValidator from "@/app/backend/shared/validator/SchemaValidator";
import { Schema } from "@/app/backend/shared/validator/schema/Schema";

const schemaValidator = new SchemaValidator();

const validate = schemaValidator.validate;
export { Schema, validate };
