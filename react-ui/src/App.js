import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import WebFont from "webfontloader";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const theme = {
  primaryColor: "rgb(238, 172, 93)",
  secondaryColor: "rgb(38, 72, 93)",
  highlight: "rgba(255, 232, 213, 0.3)",
};

const GlobalStyle = createGlobalStyle`
    body {
    background: ${(props) => props.theme.primaryColor};
    font-family: "Montserrat", sans-serif;
    font-size: 100%;
  }
`;

const Canvas = styled.div`
  margin: 2rem auto 0;
  width: min(24rem, 95%);
  padding: 2rem 1.5rem 4rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.08);
  position: relative;
`;

const Header = styled.h2`
  margin: 0 0 2rem;
  text-align: center;
  font-size: 2rem;
  font-family: "Inter", sans-serif;
  font-weight: 700;
`;

const SectionsTitle = styled.h3`
  margin-top: 3.5rem;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.5rem 0;
  text-align: center;
  border-radius: 0.3rem;
  color: rgb(38, 72, 93);
  font-weight: 700;
`;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  useEffect(() => {
    personService.getAll().then((initialBook) => setPersons(initialBook));

    WebFont.load({
      google: {
        families: ["Inter:400,700,900", "Montserrat:400,500,700,900"],
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Canvas>
        <GlobalStyle />
        <Header>Phonebook</Header>
        <Notification message={message} />
        <Filter handleFilterChange={handleFilterChange} value={filter} />
        <SectionsTitle>Add a new person</SectionsTitle>
        <PersonsForm
          persons={persons}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          name={newName}
          number={newNumber}
          setPersons={setPersons}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          setMessage={setMessage}
        />
        <SectionsTitle>Numbers</SectionsTitle>
        <Persons
          persons={persons}
          setPersons={setPersons}
          filter={filter}
          setMessage={setMessage}
        />
      </Canvas>
    </ThemeProvider>
  );
};

export default App;
