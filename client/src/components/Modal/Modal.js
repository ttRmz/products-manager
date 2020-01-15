import React from "react";
import { Button, Form, Modal as BootstrapModal } from "react-bootstrap";
import {
  DATA_STRUCTURE,
  EDITABLE_FIELDS,
  CREATE_FIELDS
} from "../../core/constants";

const getFields = config =>
  DATA_STRUCTURE.filter(field => config.includes(field.key));

export function Modal({ product: initialValues, onClose, onSubmit }) {
  const [product, setPropduct] = React.useState(initialValues || {});

  const fields = getFields(initialValues ? EDITABLE_FIELDS : CREATE_FIELDS);

  return (
    <BootstrapModal show onHide={onClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          {initialValues ? `Edit ${initialValues.libelle}` : "Add new product"}
        </BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>
        <Form>
          {fields.map(field => {
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
          {initialValues ? "Save changes" : "Add"}
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}
