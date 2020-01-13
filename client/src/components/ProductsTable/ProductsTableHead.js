import React from "react";
import { DATA_STRUCTURE } from "../../core/constants";

export const ProductsTableHead = () => (
  <thead>
    <tr>
      {DATA_STRUCTURE.map(({ key, label }) => (
        <th key={key}>{label}</th>
      ))}
      <th></th>
    </tr>
  </thead>
);
