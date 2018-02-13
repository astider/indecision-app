import React from 'react'

import Header from './Header'
import AddOption from './AddOption'
import Options from './Options'
import OptionModal from './OptionModal'
import Action from './Action'

export default class IndecisionApp extends React.Component {

  state = {
    options: [],
    selectedOption: undefined
  }

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  }

  clearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
  }

  handlePick = () => {
    const randNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randNum];
    //alert(option);
    this.setState(() => ({ selectedOption: option }))
  }

  handleAddOption = (option) => {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }

    this.setState(prevState => ({ options: prevState.options.concat(option) }));
  }

  componentDidMount() {
    try {
      const storedOptions = JSON.parse(localStorage.getItem("options"));
      if (storedOptions) {
        this.setState(prevState => ({ options: storedOptions }));
      }
    } catch (e) {
      console.error("localStorage parsing error");
    }

    console.log(`component did mount`);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
      console.log(`data updated!`);
    }
  }

  

  render() {
    const subtitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>          
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          clearSelectedOption={this.clearSelectedOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};
