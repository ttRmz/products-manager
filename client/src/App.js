import React from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { EditModal } from "./components/EditModal";
import { ProductsTable } from "./components/ProductsTable";
import { removeProduct } from "./core/removeProduct";
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

      {edit && <EditModal product={edit} onClose={() => setEdit(null)} />}
    </Container>
  );
}

export default App;
