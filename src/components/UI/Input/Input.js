import React from 'react';
import { Form } from 'react-bootstrap';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import styles from './Input.module.css';
import moment from 'moment';

const input = (props) => {
    let inputElement = null;

    switch(props.config.elementType) {
        case ( 'input' ):
            let fieldValue = props.config.value;
            if (props.config.isDate) {                
                const dateValue = {
                    year: moment(fieldValue).year(),
                    month: moment(fieldValue).month() + 1,
                    day: moment(fieldValue).date(),
                };
                inputElement = <Calendar
                    value={dateValue}
                    shouldHighlightWeekends
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