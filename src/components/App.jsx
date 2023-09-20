import { Component } from 'react';
import { Form } from './Form/Form';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  createUser = data => {
    const contact = {
      ...data,
      id: nanoid(),
    };
    if (this.state.contacts.find(el => el.name === data.name)) {
      alert(data.name + ' is already in contacts.');
      return;
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, contact],
    }));
  };

  deleteUser = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  handleSearch = e => {
    this.setState(prev => ({
      filter: e.target.value,
    }));
  };
  getVisibleName = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase(normalizedFilter))
    );
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleName = this.getVisibleName();
    return (
      <>
        <h1>Phonebook</h1>
        <Form createUser={this.createUser} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} handleSearch={this.handleSearch} />
        <ContactList contacts={visibleName} deleteUser={this.deleteUser} />
      </>
    );
  }
}
