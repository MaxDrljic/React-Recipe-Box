import React, { Component } from 'react';
import './App.css';

import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

class App extends Component {

  state = {
    recipes: [
        {recipeName: 'EatMe1', ingredients: ['Tomato', 'Potato', 'Cucumber']},
        {recipeName: 'EatMe2', ingredients: ['Tomato', 'Potato', 'Cucumber']},
        {recipeName: 'EatMe3', ingredients: ['Tomato', 'Potato', 'Cucumber']}
    ],
    showAdd: false,
    newestRecipe: {recipeName: "", ingredients: []}
  };

  // Deletes a recipe

  deleteRecipe(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    this.setState({recipes});
  }

  // Updates a recipe(newestRecipe.recipeName)

  updateNewRecipe(recipeName, ingredients) {
    this.setState({newestRecipe: {recipeName: recipeName, ingredients: ingredients }});
  }

  // Saves a new recipe to recipes

  saveNewRecipe() {
    let recipes = this.state.recipes.slice();
    recipes.push({recipeName: this.state.newestRecipe.recipeName, ingredients: this.state.newestRecipe.ingredients});

    this.setState({recipes});
    this.setState({newestRecipe: {recipeName: '', ingredients: []}});
    this.close();
  }

  // Closes a modal

  close = () => {
    if (this.state.showAdd) {
      this.setState({showAdd: false})
    }
  };

  // Open a modal

  open = (state) => {
    this.setState({[state]: true});
  }

  render() {
    const { recipes, newestRecipe } = this.state;
    return (
      <div className="App container">
      {recipes.length > 0 && (
        <PanelGroup 
          accordion
          id="accordion-group"
          defaultActiveKey="2"
          >
          {recipes.map((recipe, index) =>(
            <Panel eventKey={index} key = {index}>
              <Panel.Heading>
                <Panel.Title toggle>{recipe.recipeName}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <ul>
                  {recipe.ingredients.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ButtonToolbar>
                  <Button bsStyle="danger" onClick={(event) => this.deleteRecipe(index)}>Delete Recipe</Button>
                  <Button bsStyle="default">Edit Recipe</Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>
          ))}
        </PanelGroup>
      )}
        
        <Modal show={this.state.showAdd} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
            <Modal.Body>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Recipe Name</ControlLabel>
                <FormControl
                  type="text"
                  value={newestRecipe.recipeName}
                  placeholder="Enter Recipe Name"
                  onChange={(event) => this.updateNewRecipe(event.target.value, newestRecipe.ingredients)}
                  >
                </FormControl>
                  <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Ingredients Name</ControlLabel>
                  <FormControl
                    type="textarea"
                    value={newestRecipe.recipeName}
                    placeholder="Enter Ingredients (Separate by Commas)"
                    onChange={(event) => this.updateNewRecipe(newestRecipe.recipeName, event.target.value.split(','))}
                    value={newestRecipe.ingredients}
                    >
                  </FormControl>
                </FormGroup>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={(event) => this.saveNewRecipe()}></Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>
        <Button bsStyle="primary" onClick={(event) => this.open('showAdd')}>Add Recipe</Button>
      </div>
    );
  }
}

export default App;
