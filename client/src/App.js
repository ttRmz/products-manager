import React from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { Modal } from "./components/Modal";
import { ProductsTable } from "./components/ProductsTable";
import { addProduct } from "./core/addProduct";
import { MODAL_FIELDS } from "./core/constants";
import { removeProduct } from "./core/removeProduct";
import { updateProduct } from "./core/updateProduct";
import { useProducts } from "./core/useProducts";

function App() {
  const [selectedPoduct, setSelectedPoduct] = React.useState(null);
  const [create, setCreate] = React.useState(false);

  const { products, reload } = useProducts();

  function handleRemoveProduct(id) {
    removeProduct(id, reload);
  }

  function handleSetEditingProduct(product) {
    setSelectedPoduct(product);
  }

  function handleAddProduct(product) {
    const variables = formatVariables(product);
    addProduct(variables, () => {
      reload();
      handleCloseModal();
    });
  }

  function handleUpdateProduct(product) {
    const { id_produit } = product;

    const variables = formatVariables(product);
    updateProduct({ id_produit, ...variables }, () => {
      reload();
      handleCloseModal();
    });
  }

  function handleCloseModal() {
    setSelectedPoduct(null);
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

      {(selectedPoduct || create) && (
        <Modal
          edit={!!selectedPoduct}
          values={selectedPoduct}
          onClose={handleCloseModal}
          onSubmit={selectedPoduct ? handleUpdateProduct : handleAddProduct}
        />
      )}
    </Container>
  );
}

export default App;

function formatVariables(product) {
  return MODAL_FIELDS.reduce(
    (acc, key) =>
      Object.keys(product).includes(key) && { ...acc, [key]: product[key] },
    {}
  );
}
