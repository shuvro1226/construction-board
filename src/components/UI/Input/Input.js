import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import 'rc-time-picker/assets/index.css';
import DatePicker from 'react-modern-calendar-datepicker';
import styles from './Input.module.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

const input = (props) => {
    let inputElement = null;
    let disabled = false;
    if (!props.isCreateWO && props.config.disabledOnEdit) {
        disabled = true;
    }
    switch(props.config.elementType) {
        case ( 'input' ):
            let fieldValue = props.config.value;
            if (props.config.isDate) {
                const dateValue = {
                    year: moment(fieldValue).year(),
                    month: moment(fieldValue).month() + 1,
                    day: moment(fieldValue).date(),
                };
                const formatInputValue = () => {
                    return `${moment(fieldValue).format('DD.MM.YYYY')}`;
                };
                inputElement = <DatePicker
                    value={dateValue}
                    formatInputText={formatInputValue}
                    shouldHighlightWeekends
                    inputClassName={styles.DatePickerWrapper}
                    wrapperClassName={styles.DatePicker}
                    onChange={props.changed} 
                />
            } else if (props.config.isTime) {
                inputElement = <TimePicker 
                    defaultValue={moment()}
                    value={moment(fieldValue, 'HH:mm')} 
                    showSecond={false}
                    className={styles.TimePickerWrapper}
                    minuteStep={15}
                    use12Hours={false}
                    allowEmpty={false}
                    onChange={props.changed} 
                />
            } else {
                inputElement = <Form.Control
                    {...props.config.elementConfig} 
                    value={fieldValue}
                    onChange={props.changed}
                />;    
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
                disabled={disabled}
                onChange={props.changed}>
                    <option value="-1">{props.config.defaultOption}</option>
                {props.config.defaultOptions ? props.config.defaultOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.displayText}</option>
                )) : null}
            </Form.Control>            
            break;
        default:
            break;            
    }

    if (props.linkedTo !== '' && !props.isCreateWO) {
        inputElement = <InputGroup className="mb-3">
            {inputElement}
            <InputGroup.Append>
                <InputGroup.Text>
                    <Link to={props.linkedTo}>
                        <FontAwesomeIcon icon="link" />
                    </Link>
                </InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
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