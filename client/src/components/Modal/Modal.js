import React from "react";
import { Button, Form, Modal as BootstrapModal } from "react-bootstrap";
import { DATA_STRUCTURE, MODAL_FIELDS } from "../../core/constants";

const FIELDS = DATA_STRUCTURE.filter(field => MODAL_FIELDS.includes(field.key));

const INITIAL_STATE = FIELDS.reduce(
  (acc, curr) => ({ ...acc, [curr.key]: "" }),
  {}
);

export function Modal({ edit, values, onClose, onSubmit }) {
  const [product, setPropduct] = React.useState(values || INITIAL_STATE);

  return (
    <BootstrapModal show onHide={onClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          {edit ? `Edit ${values.libelle}` : "Add new product"}
        </BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>
        <Form>
          {FIELDS.map(field => {
            const handleChangeField = event => {
              setPropduct({ ...product, [field.key]: event.target.value });
            };

            return (
              <Form.Group key={field.key} controlId={field.key}>
                <Form.Label>{field.label}</Form.Label>

                <Form.Control
                  value={product[field.key]}
                  onChange={handleChangeField}
                  placeholder={field.label}
                />
              </Form.Group>
            );
          })}
        </Form>
      </BootstrapModal.Body>

      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onSubmit(product)}>
          {edit ? "Save changes" : "Add"}
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}
