import React from "react";
import { API_URL } from "./constants";

export function useProducts() {
  const [result, setResult] = React.useState([]);

  function load() {
    const request = new XMLHttpRequest();
    request.open("GET", `${API_URL}/products`, false);
    request.send();

    try {
      const { result } = JSON.parse(request.responseText);
      setResult(result.products);
    } catch (error) {
      console.log("useProducts -> error", error);
    }
  }

  React.useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products: result, reload: load };
}
