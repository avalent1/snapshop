export function genericResponseMapper<T>(response: any): T {
  if (!response.success) {
    throw new Error("Fetch Error: " + response);
  }
  return response;
}
