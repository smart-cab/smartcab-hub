import React from "react";
import Header from "./Header.js";
import MySwitch from "./Switch.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function ControlPage() {

    return (
        <div>
            <Header />
            <div style={ {marginLeft: "70px"} }>
                <Container fluid="md">
                    <MySwitch />
                </Container>
            </div>
        </div>

    );
}


export default ControlPage;
