/**
 * JSON Escape
 * Escape/unescape JSON strings
 *
 * Online tool: https://devtools.at/tools/json-escape
 *
 * @packageDocumentation
 */

function escapeJsonString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")      // Backslash must be first
    .replace(/"/g, '\\"')         // Double quotes
    .replace(/\n/g, "\\n")        // Newline
    .replace(/\r/g, "\\r")        // Carriage return
    .replace(/\t/g, "\\t")        // Tab
    .replace(/\b/g, "\\b")        // Backspace
    .replace(/\f/g, "\\f")        // Form feed
    .replace(/[\x00-\x1F\x7F-\x9F]/g, (char) => {
      // Escape other control characters as Unicode
      const code = char.charCodeAt(0);
      return "\\u" + code.toString(16).padStart(4, "0");
    });
}

function unescapeJsonString(str: string): string {
  try {
    // Use JSON.parse with quotes around the string to leverage native unescaping
    return JSON.parse('"' + str + '"');
  } catch {
    throw new Error("Invalid escape sequences");
  }
}

function validateJsonString(str: string): boolean {
  try {
    JSON.parse('"' + str + '"');
    return true;
  } catch {
    return false;
  }
}

function createJsonPreview(str: string, mode: "escape" | "unescape"): string {
  try {
    const processedStr = mode === "escape" ? escapeJsonString(str) : str;
    const jsonObject = { text: processedStr };
    return JSON.stringify(jsonObject, null, 2);
  } catch {
    return "";
  }
}

// Export for convenience
export default { encode, decode };
