import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { DATA_STRUCTURE, EDITABLE_FIELDS } from "../../core/constants";

const FIELDS = DATA_STRUCTURE.filter(field =>
  EDITABLE_FIELDS.includes(field.key)
);

export function EditModal({ product: initialValues, onClose, onSubmit }) {
  const [product, setPropduct] = React.useState(initialValues);

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {initialValues.libelle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onSubmit(product)}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
