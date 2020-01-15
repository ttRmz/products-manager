import React from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { EditModal } from "./components/EditModal";
import { ProductsTable } from "./components/ProductsTable";
import { EDITABLE_FIELDS } from "./core/constants";
import { removeProduct } from "./core/removeProduct";
import { updateProduct } from "./core/updateProduct";
import { useProducts } from "./core/useProducts";

function App() {
  const [edit, setEdit] = React.useState(null);
  const { products, reload } = useProducts();

  function handleRemoveProduct(id) {
    removeProduct(id, reload);
  }

  function handleSetEditingProduct(product) {
    setEdit(product);
  }

  function handleUpdateProduct(product) {
    const { id_produit } = product;

    const variables = EDITABLE_FIELDS.reduce(
      (acc, key) =>
        Object.keys(product).includes(key) && { ...acc, [key]: product[key] },
      {}
    );
    updateProduct({ id_produit, ...variables }, reload);
  }

  return (
    <Container>
      <Jumbotron>
        <h1>PHP API PROJECT!</h1>
        <Button variant="primary" onClick={reload}>
          Refresh list
        </Button>
      </Jumbotron>

      <ProductsTable
        onRemove={handleRemoveProduct}
        onEdit={handleSetEditingProduct}
        products={products}
      />

      {edit && (
        <EditModal
          product={edit}
          onClose={() => setEdit(null)}
          onSubmit={handleUpdateProduct}
        />
      )}
    </Container>
  );
}

export default App;
