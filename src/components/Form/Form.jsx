// import { nanoid } from 'nanoid';
import { Component } from 'react';
const INITIAL_STATE = {
  name: '',
  number: '',
};

export class Form extends Component {
  state = INITIAL_STATE;
  handleGhange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.createUser(this.state);
    this.setState(INITIAL_STATE);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={this.state.name}
            name="name"
            pattern="[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleGhange}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            value={this.state.number}
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleGhange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
