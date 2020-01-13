import React from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { ProductsTable } from "./components/ProductsTable";
import { useProducts } from "./core/useProducts";
import { removeProduct } from "./core/removeProduct";
import { EditModal } from "./components/EditModal";

function App() {
  const [edit, setEdit] = React.useState(null);

  const { products, reload } = useProducts();

  function handleRemoveProduct(id) {
    removeProduct(id, reload);
  }

  function handleEditProduct(product) {
    console.log("TCL: handleEditProduct -> product", product);
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
        onEdit={handleEditProduct}
        products={products}
      />

      {edit && <EditModal product={edit} onClose={() => setEdit(null)} />}
    </Container>
  );
}

export default App;
