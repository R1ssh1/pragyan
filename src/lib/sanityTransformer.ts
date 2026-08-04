/**
 * Replaces occurrences of "Prayag" with "Pragyan" in any string recursively.
 * It ignores Sanity internal fields like _ref, _id, and _type to prevent breaking asset URLs.
 */
export function rebrandData<T>(data: T): T {
  // If string, do the replacement
  if (typeof data === "string") {
    // Regex matches "Prayag" as a word, preserving case if we want, but typically it's capitalized.
    // Also handling uppercase "PRAYAG" -> "PRAGYAN".
    return data
      .replace(/\bPrayag\b/g, "Pragyan")
      .replace(/\bPRAYAG\b/g, "PRAGYAN") as unknown as T;
  }

  // If array, recursively map over elements
  if (Array.isArray(data)) {
    return data.map((item) => rebrandData(item)) as unknown as T;
  }

  // If object, recursively transform its keys
  if (data !== null && typeof data === "object") {
    const transformedObj: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        // Do not touch Sanity system references
        if (key === "_ref" || key === "_id" || key === "_type") {
          transformedObj[key] = (data as any)[key];
        } else {
          transformedObj[key] = rebrandData((data as any)[key]);
        }
      }
    }
    return transformedObj as T;
  }

  // Primitives like numbers, booleans, null, undefined
  return data;
}
