import { NextRequest, NextResponse } from "next/server";
import { Rules } from "./rules";
import { Document, Model } from "mongoose";
import { RuleMethod } from "../interfaces";

export async function validate<T extends Document>(
  request: NextRequest,
  validator: Function,
  params?: any
): Promise<{ hasError?: boolean; errors?: any; data: any }> {
  // console.log(request.method);

  const data = await request.json();
  const { schema, message } = await validator(request);

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
            }) => {
              rulePromises.push(
                (async () => {
                  const executeRule = await Rules(
                    rule.method,
                    data?.[item],
                    rule.model,
                    rule.property,
                    rule.where,
                    rule.whereNot
                  );
                  if (executeRule?.error) {
                    errors.push({
                      [item]: {
                        ...executeRule,
                        message: message?.[item] ?? executeRule?.message,
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

  if (errors.length) return { hasError: true, errors, data: null };

  return { data };
}
