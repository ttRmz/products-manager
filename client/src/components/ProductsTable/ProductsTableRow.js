import React from "react";
import { Button } from "react-bootstrap";
import { DATA_STRUCTURE } from "../../core/constants";
import "./ProductsTableRow.css";

export function ProductsTableRow({ product, onEdit, onRemove }) {
  return (
    <tr>
      {DATA_STRUCTURE.map(({ key }) => (
        <td key={key}>{product[key]}</td>
      ))}
      <td>
        <Button
          className="ProductsTableRow__button"
          variant="outline-dark"
          onClick={() => onEdit(product)}
        >
          Edit
        </Button>
        <Button
          className="ProductsTableRow__button"
          variant="outline-danger"
          onClick={() => onRemove(product.id_produit)}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
}
