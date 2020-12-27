import React from 'react';
import { Form } from 'react-bootstrap';
import moment from 'moment';
import styles from './WOEditForm.module.css';

const editWOForm = (props) => {

    const editForm = Object.keys(props.workingOrderFields).map(field => {
        let formGroupClass = '';
        if (props.workingOrderFields[field].type === 'hidden') {
            formGroupClass = 'd-none';
        }

        const fieldPlaceholder = "Enter " + props.workingOrderFields[field].displayText;
        let formControl = null;
        switch (props.workingOrderFields[field].type) {

            case 'text':
                let fieldValue = props.workingOrderFields[field].value;
                if (props.workingOrderFields[field].isDate) {
                    fieldValue = moment(fieldValue).format('DD.MM.YYYY');
                }
                formControl = <Form.Control 
                    type={props.workingOrderFields[field].type} 
                    placeholder={fieldPlaceholder} 
                    value={fieldValue} 
                    onChange={props.onFieldChanged} />
                break;

            case 'textarea':
                formControl = <Form.Control 
                    as={props.workingOrderFields[field].type} 
                    rows={3}
                    placeholder={fieldPlaceholder} 
                    value={props.workingOrderFields[field].value} 
                    onChange={props.onFieldChanged} />
                break;

            case 'select':
                let options = props.statusList.map(status => {
                    return <option key={status.displayText} value={status.status}>{status.displayText}</option>
                });

                formControl = <Form.Control 
                    as="select"
                    value={props.workingOrderFields[field].value}
                    onChange={props.onFieldChanged}>
                        {options}
                    </Form.Control>
                break;

            default:
                break;
        }

        
        const formField = <Form.Group key={field} controlId={field} className={formGroupClass}>
            <Form.Label>{props.workingOrderFields[field].displayText}</Form.Label>
            {formControl}
        </Form.Group>

        return formField;
    });

    return (
        <Form className={styles.WOEditForm}>
            {editForm}
        </Form>
    )
} 

export default editWOForm;