import React from 'react';
import personService from '../services/persons';
import styled from 'styled-components';

const Button = styled.button`
  border-radius: 0.2rem;
  padding: 0.2rem 0.5rem;
  margin-left: 0.5rem;
  border: none;
  appearance: none;
  font-size: 0.55rem;
  font-weight: 500;
  background: white;
  color: ${(props) => props.theme.secondaryColor};
  transition: transform 0.2s ease;
  &:hover {
    background: rgb(238, 72, 93);
    color: white;
  }
  &:active {
    transform: scale(0.965);
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  height: min-content;
  & p {
    margin: 0 0 0.4rem;
  }
  & span {
    font-style: italic;
    font-weight: 400;
    margin-left: 0.7rem;
    font-size: 0.8rem;
    & a {
      color: black;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Persons = ({ persons, setPersons, filter }) => {
  const personsToShow = persons.filter((x) =>
    x.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (event) => {
    event.preventDefault();
    let id = event.target.id;
    let person = persons.filter((x) => x.id === id)[0];
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(event.target.id).then((response) => {
        setPersons(persons.filter((x) => x.id !== id));
      });
    }
  };

  return (
    <div>
      {personsToShow.map((x) => (
        <Div key={x.id} style={{ margin: 0 }}>
          <p>
            {x.name}
            <span>
              <a href={`tel:${x.number}`}>{x.number}</a>
            </span>
          </p>
          <Button id={x.id} onClick={handleDelete}>
            delete
          </Button>
        </Div>
      ))}
    </div>
  );
};

export default Persons;
