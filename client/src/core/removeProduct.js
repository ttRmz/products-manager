import { API_URL } from "./constants";

export function removeProduct(id, callback) {
  const request = new XMLHttpRequest();

  request.open("DELETE", `${API_URL}/products/${id}`, false);
  request.send();
  callback();
}
