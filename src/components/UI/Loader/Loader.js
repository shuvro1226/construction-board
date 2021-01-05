import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Loader.module.css';

const loader = (props) => (
    <div className={styles.Loader}>
        <FontAwesomeIcon icon="cog" className="fa-spin" />
    </div>
)

export default loader;