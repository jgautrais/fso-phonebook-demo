import React from "react";
import personService from "../services/persons";
import styled from "styled-components";

const Div = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  & p {
    text-align: left;
    text-transform: lowercase;
    margin-bottom: 0.5rem;
    font-weight: 500;
    padding-left: 18%;
    &:first-letter {
      text-transform: uppercase;
    }
  }
`;

const InputField = styled.input`
  border-radius: 0.3rem;
  padding: 0.3rem 0.4rem;
  border: none;
  background: ${(props) => props.theme.highlight};
  &:focus,
  &:not(:placeholder-shown) {
    background: white;
  }
`;

const Input = ({ data, handleChange, value }) => {
  return (
    <Div>
      <p>{data}:</p>{" "}
      <InputField placeholder=" " value={value} onChange={handleChange} />
    </Div>
  );
};

const Button = ({ label }) => {
  const Button = styled.button`
    margin-top: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    appearance: none;
    padding: 0.5rem 3rem;
    font-size: 0.8rem;
    font-weight: 700;
    background: ${(props) => props.theme.secondaryColor};
    color: white;
    transition: transform 0.2s ease;
    &:hover {
      background: ${(props) => props.theme.primaryColor};
      color: ${(props) => props.theme.secondaryColor};
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    }
    &:active {
      transform: scale(0.965);
    }
  `;

  return (
    <Div>
      <Button type="submit">{label}</Button>
    </Div>
  );
};

const PersonsForm = ({
  persons,
  handleNameChange,
  name,
  handleNumberChange,
  number,
  setPersons,
  setNewName,
  setNewNumber,
  setMessage,
}) => {
  const addName = (event) => {
    event.preventDefault();

    if (name.length < 3) {
      alert("Name should be at least 3 characters");
      return;
    } else if (
      persons.map((x) => x.name).includes(name) &&
      persons.map((x) => x.number).includes(number)
    ) {
      alert(`${name} is already added to the phonebook`);
      return;
    } else if (persons.map((x) => x.name).includes(name)) {
      const person = persons.filter((x) => x.name === name)[0];
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {
        const id = person.id;
        const changedPerson = { ...person, number: number };
        personService
          .update(id, changedPerson)
          .then((response) => {
            setPersons(persons.map((x) => (x.id !== +id ? x : response.data)));
            setNewName("");
            setNewNumber("");
            const message = {
              text: `Updated ${response.data.name}'s number`,
              type: "success",
            };
            setMessage(message);
            setTimeout(() => setMessage(null), 3500);
          })
          .catch((error) => {
            const message = {
              text: `Information of ${changedPerson.name} has already been removed from server`,
              type: "error",
            };
            setMessage(message);
            setTimeout(() => setMessage(null), 3500);
            personService.getAll().then((book) => setPersons(book));
            console.log(error);
          });
      }

      return;
    }

    const newPerson = {
      name: name,
      number: number,
    };

    personService.create(newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
      const message = {
        text: `Added ${response.data.name}`,
        type: "success",
      };
      setMessage(message);
      setTimeout(() => setMessage(null), 3500);
    });
  };

  return (
    <form onSubmit={addName}>
      <Input data="name" handleChange={handleNameChange} value={name} />
      <Input data="number" handleChange={handleNumberChange} value={number} />
      <Button label="add" />
    </form>
  );
};

export default PersonsForm;
