import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Toolbar.module.css';
import SearchBox from '../../SearchBox/SearchBox';

const toolbar = (props) => {

    let createAction = null;
    if (props.hasEditAccess && window.location.pathname === '/') {
        createAction = (
            <Button variant="primary" onClick={props.showCreateWOModal} className={styles.Button}>
                <FontAwesomeIcon icon="plus" /> Add New Task
            </Button>
        )
    }

    let searchBox = null;
    if (window.location.pathname === '/') {
        searchBox = <SearchBox searchTaskBoard={props.searchTaskBoard} />;
    }

    return (
        <Navbar fixed="top" bg="light" expand="lg" className={styles.Navbar}>
            <NavLink to="/" className={styles.Logo}>CB</NavLink>
            <NavLink to="/projects" className={styles.NavLink}>Projects</NavLink>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="ml-auto">
                    {searchBox}
                    {createAction}
                    <Button variant="danger" onClick={props.logout} className={styles.Button}>
                        <FontAwesomeIcon icon="sign-out-alt" />
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default toolbar;