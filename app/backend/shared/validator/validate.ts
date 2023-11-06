import { NextRequest } from "next/server";
import { Document, Model } from "mongoose";
import { IUser } from "../../user/interfaces";
import { RuleMethod } from "../interfaces/validator";
import Rules from "./rules";

export async function validate<T extends Document>(
  request: NextRequest,
  validator: Function,
  params?: { id: string }
): Promise<{ hasError?: boolean; errors?: any; data: any; user?: IUser }> {
  // console.log(request.method);

  const data = await request.json();
  const { schema, message, user } = await validator(request, data, params);

  let errors: Array<any> = [];

  await Promise.all(
    Object.keys(schema).map(async (item) => {
      const hasError = errors.find((error) => error?.[item]);
      const type = schema?.[item]?.type || "string";

      if (!hasError) {
        // validate field if required
        if (
          schema?.[item]?.required !== undefined &&
          schema?.[item]?.required
        ) {
          if (data?.[item] === undefined) {
            errors.push({
              [item]: {
                error: true,
                type: "REQUIRED",
                message: message?.[item] ?? `${item} is required`,
              },
            });
          } else if (
            typeof data?.[item] === type &&
            data?.[item]?.trim() === ""
          ) {
            errors.push({
              [item]: {
                error: true,
                type: "REQUIRED",
                message: message?.[item] ?? `${item} is required`,
              },
            });
          }
        }

        // validate type
        if (data?.[item]) {
          if (typeof data?.[item] !== type) {
            errors.push({
              [item]: {
                error: true,
                type: "VALUE_TYPE",
                message: message?.[item] ?? `${item} should be of type ${type}`,
              },
            });
          }
        }

        // validate field rules
        if (
          data?.[item] &&
          schema?.[item]?.rules &&
          schema?.[item]?.rules?.length
        ) {
          const rulePromises: Promise<void>[] = []; // Specify the type

          schema?.[item]?.rules.forEach(
            (rule: {
              method: RuleMethod;
              value: any;
              model: Model<T>;
              property: any;
              where?: any;
              whereNot?: any;
              size?: number;
            }) => {
              rulePromises.push(
                (async () => {
                  const rules = new Rules();

                  const executeRule = await rules[rule.method]({
                    value: data?.[item],
                    model: rule.model,
                    property: rule.property,
                    where: rule.where,
                    whereNot: rule.whereNot,
                    size: rule.size,
                  });

                  if (executeRule?.error) {
                    errors.push({
                      [item]: {
                        ...executeRule,
                        message:
                          message?.[`rules.${rule.method}`] ??
                          executeRule?.message,
                      },
                    });
                  }
                })()
              );
            }
          );

          await Promise.all(rulePromises);
        }
      }
    })
  );

  if (errors.length) return { hasError: true, errors, data: null, user };

  return { data, user };
}
