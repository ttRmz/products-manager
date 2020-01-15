import { API_URL } from "./constants";

export function addProduct(variables, callback) {
  const request = new XMLHttpRequest();
  const json = JSON.stringify(variables);

  request.onreadystatechange = () => {
    request.readyState === 4 && callback();
  };

  request.open("POST", `${API_URL}/products`, false);
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.send(json);
}
