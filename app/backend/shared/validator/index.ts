import SchemaValidator from "./SchemaValidator";
import { Schema } from "./schema/Schema";

const schemaValidator = new SchemaValidator();

const validate = schemaValidator.validate;
export { Schema, validate };
