import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './WOEditForm.module.css';

const editWOForm = (props) => {

    return (
        <Form className={styles.WOEditForm}>
            {props.children}
        </Form>
    )
} 

export default editWOForm;