/* eslint-disable @typescript-eslint/no-explicit-any */
export function flattenObject(obj: any, parentKey = "", res: any = {}): any {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      flattenObject(obj[key], parentKey ? `${parentKey}_${key}` : key, res);
    } else {
      res[parentKey ? `${parentKey}_${key}` : key] = obj[key];
    }
  }
  return res;
}
