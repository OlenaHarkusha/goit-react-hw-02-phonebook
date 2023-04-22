import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleInput = e => {
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  isInContacts = name => {
    return this.state.contacts.some(item =>
      item.name.toLowerCase().includes(name)
    );
  };

  addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    if (this.isInContacts(normalizedName)) {
      alert(`${name} is already in Contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        {
          name,
          number,
          id: nanoid(),
        },
      ],
    }));
  };

  deleteContact = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== e.target.id
      ),
    }));
  };
  // handleSubmit = e => {
  //   e.preventDefault();
  //   const name = e.target.name.value;
  //   const number = e.target.number.value;

  //   const normalizedName = name.toLowerCase();

  //   if (this.isInContacts(normalizedName)) {
  //     alert(`${name} is already in Contacts`);
  //     return;
  //   }
  //   this.setState(prevState => ({
  //     contacts: [
  //       ...prevState.contacts,
  //       {
  //         name,
  //         number,
  //         id: nanoid(),
  //       },
  //     ],
  //   }));
  // };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h1>Contacts</h1>
        <Filter value={this.state.filter} onChange={this.handleInput} />
        <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}
