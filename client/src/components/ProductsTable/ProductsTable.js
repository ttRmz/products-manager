import React from "react";
import { Table } from "react-bootstrap";
import { ProductsTableHead } from "./ProductsTableHead";
import { ProductsTableRow } from "./ProductsTableRow";

export function ProductsTable({ onRemove, onEdit, products }) {
  return (
    <Table striped bordered hover>
      <ProductsTableHead />

      <tbody>
        {products.map(product => (
          <ProductsTableRow
            onEdit={onEdit}
            key={product.id_produit}
            onRemove={onRemove}
            product={product}
          />
        ))}
      </tbody>
    </Table>
  );
}
