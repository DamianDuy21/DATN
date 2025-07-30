export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const deepTrimObj = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;

  const trimmed = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "string") {
      trimmed[key] = value.trim();
    } else if (typeof value === "object" && value !== null) {
      trimmed[key] = deepTrimObj(value); // đệ quy
    } else {
      trimmed[key] = value; // giữ nguyên giá trị khác string
    }
  }

  return trimmed;
};
