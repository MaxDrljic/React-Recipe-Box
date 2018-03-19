import React, { Component } from "react";
import "./App.css";

import Panel from "react-bootstrap/lib/Panel";
import PanelGroup from "react-bootstrap/lib/PanelGroup";
import Button from "react-bootstrap/lib/Button";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Modal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";

class App extends Component {
  state = {
    recipes: [
      
    ],
    showAdd: false,
    showEdit: false,
    currentIndex: 0,
    newestRecipe: { recipeName: "", ingredients: [] }
  };

  // Deletes a recipe

  deleteRecipe(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    this.setState({ recipes });
  }

  // Updates a recipe(newestRecipe.recipeName)

  updateNewRecipe(recipeName, ingredients) {
    this.setState({
      newestRecipe: { recipeName: recipeName, ingredients: ingredients }
    });
  }

  // Saves a new recipe to recipes

  saveNewRecipe() {
    let recipes = this.state.recipes.slice();
    recipes.push({
      recipeName: this.state.newestRecipe.recipeName,
      ingredients: this.state.newestRecipe.ingredients
    });

    this.setState({ recipes });
    this.setState({ newestRecipe: { recipeName: "", ingredients: [] } });
    this.close();
  }

  // Closes a modal

  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false });
    }
    if (this.state.showEdit) {
      this.setState({ showEdit: false });
    }
  };

  // Open a modal

  open = (state, currentIndex) => {
    this.setState({ [state]: true });
    this.setState({ currentIndex });
  };

  // Updates recipeName of a recipe
  updateRecipeName(recipeName, currentIndex) {
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = {recipeName: recipeName, ingredients: recipes[currentIndex].ingredients};
    this.setState({recipes});
  }

  // Update ingredients of a recipe
  updateIngredients(ingredients, currentIndex) {
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = {recipeName: recipes[currentIndex].recipeName, ingredients: ingredients};
    this.setState({recipes});
  }

  componentDidMount() {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    this.setState({recipes});
  }

  render() {
    const { recipes, newestRecipe, currentIndex } = this.state;
    return (
      <div className="App container">
        {recipes.length > 0 && (
          <div>
            <PanelGroup accordion id="accordion-group" defaultActiveKey="2">
              {recipes.map((recipe, index) => (
                <Panel eventKey={index} key={index}>
                  <Panel.Heading>
                    <Panel.Title toggle>{recipe.recipeName}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    <ul>
                      {recipe.ingredients.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <ButtonToolbar>
                      <Button
                        bsStyle="danger"
                        onClick={event => this.deleteRecipe(index)}
                      >
                        Delete Recipe
                      </Button>
                      <Button
                        bsStyle="default"
                        onClick={event => this.open("showEdit", index)}
                      >
                        Edit Recipe
                      </Button>
                    </ButtonToolbar>
                  </Panel.Body>
                </Panel>
              ))}
            </PanelGroup>
            <Modal show={this.state.showEdit} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Add Recipe</Modal.Title>
                <Modal.Body>

                  <FormGroup controlId="formBasicText">
                    <ControlLabel>Recipe Name</ControlLabel>
                    <FormControl
                      type="text"
                      value={recipes[currentIndex].recipeName}
                      placeholder="Enter Text"
                      onChange={event =>
                        this.updateRecipeName(event.target.value, currentIndex)
                      }
                    />
                  </FormGroup>

                  <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Ingredients</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      onChange={event =>
                        this.updateIngredients(event.target.value.split(","), currentIndex)}
                      placeholder="Enter Ingredients (Separate by Commas)"
                      value={recipes[currentIndex].ingredients}>

                    </FormControl>  
                  </FormGroup>

                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={event => this.saveNewRecipe()}>
                    Save New Recipe
                  </Button>
                </Modal.Footer>
              </Modal.Header>
            </Modal>
          </div>
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
                  onChange={event =>
                    this.updateNewRecipe(
                      event.target.value,
                      newestRecipe.ingredients)}>
                </FormControl>      
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Ingredients Name</ControlLabel>
                  <FormControl
                    type="textarea"
                    value={newestRecipe.recipeName}
                    placeholder="Enter Ingredients (Separate by Commas)"
                    onChange={event =>
                      this.updateNewRecipe(
                        newestRecipe.recipeName,
                        event.target.value.split(",")
                      )
                    }
                    value={newestRecipe.ingredients}
                  />
                </FormGroup>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={event => this.saveNewRecipe()}>
                Save New Recipe
              </Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>
        <Button bsStyle="primary" onClick={event => this.open("showAdd", currentIndex)}>
          Add Recipe
        </Button>
      </div>
    );
  }
}

export default App;
