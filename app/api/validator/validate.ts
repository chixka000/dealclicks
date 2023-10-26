import { NextRequest, NextResponse } from "next/server";

export async function validate(
  request: NextRequest,
  validator: Function
): Promise<{hasError?: boolean, errors?: any, data: any}> {
  const data = await request.json();
  const { schema, message } = validator();

  let errors: Array<any> = [];

  await Promise.all(
    Object.keys(schema).map(async (item) => {
      const hasError = errors.find((error) => error?.[item]);

      if (!hasError) {
        // validate field if required
        if (
          schema?.[item]?.required !== undefined &&
          schema?.[item]?.required
        ) {
          if (!data?.[item] || data?.[item]?.trim() === "") {
            errors.push({
              [item]: {
                error: true,
                type: "REQUIRED",
                message: message?.[item] ?? `${item} is required`,
              },
            });
          }
        }

        // validate field rules
        if (data?.[item] && schema?.[item]?.rules && schema?.[item]?.rules?.length) {
          const rulePromises: Promise<void>[] = []; // Specify the type

          schema?.[item]?.rules.forEach((rule: Function) => {
            rulePromises.push(
              (async () => {
                const executeRule = await rule(data?.[item]);
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
          });

          await Promise.all(rulePromises);
        }
      }
    })
  );

  if (errors.length) return { hasError: true, errors, data: null };

  return { data };
}
