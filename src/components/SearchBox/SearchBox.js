import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Wrapper from '../../hoc/Wrapper/Wrapper';
import styles from './SearchBox.module.css';

const searchBox = (props) => (
    <Wrapper>
        <InputGroup className={styles.SearchField}>
            <InputGroup.Append>
                <InputGroup.Text>                    
                    <FontAwesomeIcon icon="search" />
                </InputGroup.Text>
            </InputGroup.Append>
            <Form.Control                
                placeholder="Seach working orders"
                onChange={props.searchTaskBoard}
            />               
        </InputGroup>
          
    </Wrapper>
)

export default searchBox;