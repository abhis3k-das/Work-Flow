import { z, ZodError } from "zod";

type TreeifiedError = {
  errors: string[];
  properties?: Record<string, { errors: string[] }>;
};

export function getStructuredErrors(zodError: ZodError): string[] {
  const errors: TreeifiedError = z.treeifyError(zodError);
  console.log(errors);
  const zodErrorMsgList: string[] = [];
  if (errors?.properties) {
    Object.entries(errors.properties).map((el) => {
      const [key, val] = el;
      zodErrorMsgList.push(...val.errors);
    });
  }

  return zodErrorMsgList;
}
