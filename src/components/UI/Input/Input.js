import React from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    switch(props.config.elementType) {
        case ( 'input' ):
            let fieldValue = props.config.value;
            if (props.config.isDate) {
                let timeStamp = Date.parse(fieldValue);
                fieldValue = new Date(timeStamp);//moment(props.config.value).toDate();
                // https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/default-values
                inputElement = <DatePicker
                    className="form-control"
                    wrapperClassName={styles.DatePickerWrapper}
                    selected={fieldValue}
                    startDate={fieldValue}
                    dateFormat="dd-MM-yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    onChange={props.changed} />
            } else {
                inputElement = <Form.Control 
                    {...props.config.elementConfig} 
                    value={fieldValue}
                    onChange={props.changed} />
            }
            
            break;
        case ( 'textarea' ):
            inputElement = <Form.Control 
                as="textarea"
                rows={3}
                {...props.config.elementConfig} 
                value={props.config.value} 
                onChange={props.changed} />
            break;
        case ( 'select' ):
            inputElement = <Form.Control 
                as="select"
                className={styles.FormSelect}
                value={props.config.value} 
                onChange={props.changed}>
                {props.statusList.map(option => (
                    <option key={option.displayText} value={option.status}>{option.displayText}</option>
                ))}
            </Form.Control>
            break;
        default:
            break;
    }

    let formGroupClass = '';
    if (props.config.elementConfig && props.config.elementConfig.type === 'hidden') {
        formGroupClass = 'd-none';
    }

    return (
        <Form.Group className={formGroupClass}>
            <Form.Label>{props.config.displayText}</Form.Label>
            {inputElement}
        </Form.Group>
    );
}

export default input;