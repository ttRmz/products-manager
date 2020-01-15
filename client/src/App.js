import React from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { Modal } from "./components/Modal";
import { ProductsTable } from "./components/ProductsTable";
import { addProduct } from "./core/addProduct";
import { CREATE_FIELDS, EDITABLE_FIELDS } from "./core/constants";
import { removeProduct } from "./core/removeProduct";
import { updateProduct } from "./core/updateProduct";
import { useProducts } from "./core/useProducts";

function App() {
  const [edit, setEdit] = React.useState(null);
  const [create, setCreate] = React.useState(false);

  const { products, reload } = useProducts();

  function handleRemoveProduct(id) {
    removeProduct(id, reload);
  }

  function handleSetEditingProduct(product) {
    setEdit(product);
  }

  function handleAddProduct(product) {
    const variables = formatVariables(CREATE_FIELDS, product);
    addProduct(variables, reload);
  }

  function handleUpdateProduct(product) {
    const { id_produit } = product;

    const variables = formatVariables(EDITABLE_FIELDS, product);
    updateProduct({ id_produit, ...variables }, reload);
  }

  function handleCloseModal() {
    setEdit(null);
    setCreate(false);
  }

  return (
    <Container>
      <Jumbotron>
        <h1>PHP API PROJECT!</h1>
        <Button
          className="Jumbotron__button"
          variant="success"
          onClick={() => setCreate(true)}
        >
          Add product
        </Button>
        <Button
          className="Jumbotron__button"
          variant="primary"
          onClick={reload}
        >
          Refresh list
        </Button>
      </Jumbotron>

      <ProductsTable
        onRemove={handleRemoveProduct}
        onEdit={handleSetEditingProduct}
        products={products}
      />

      {(edit || create) && (
        <Modal
          product={edit}
          onClose={handleCloseModal}
          onSubmit={edit ? handleUpdateProduct : handleAddProduct}
        />
      )}
    </Container>
  );
}

export default App;

function formatVariables(fields, product) {
  fields.reduce(
    (acc, key) =>
      Object.keys(product).includes(key) && { ...acc, [key]: product[key] },
    {}
  );
}
