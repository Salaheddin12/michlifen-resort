import {useState} from "react";
import {Navbar,Button,Nav} from "react-bootstrap";


export default function nav (){
  return (
    <Navbar collapseOnSelect expand="lg">
    <Navbar.Brand href="/">Michlifen Resort</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto ml-4">
      <Nav.Link  href="/">Home</Nav.Link>
      <Nav.Link  href="/rooms">Rooms</Nav.Link>
      <Nav.Link  href="/about">About Us</Nav.Link>
    </Nav>
      {/* <Button className="mr-sm-2" style={{backgroundColor:'#1565c0'}}>Sign Up</Button>
      <Button  style={{backgroundColor:'#0d47a1'}}>Login</Button> */}
    </Navbar.Collapse>
  </Navbar>
  );
};
