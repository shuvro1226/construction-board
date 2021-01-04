import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './Toolbar.module.css';

const toolbar = (props) => (
    <Navbar fixed="top" bg="light" expand="lg">
        <NavLink to="/" className={styles.Logo}>CB</NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className="ml-auto">
                <Button variant="primary">Add New Task</Button>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default toolbar;