import { API_URL } from "./constants";

export function useProducts() {
  const request = new XMLHttpRequest();

  function load() {
    request.open("GET", `${API_URL}/products`, false);
    request.send();
  }
  load();

  try {
    const { result } = JSON.parse(request.responseText);
    return { products: result.products, reload: load };
  } catch (error) {
    return { error };
  }
}
