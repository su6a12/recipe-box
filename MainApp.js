// older version of babel was throwing 'keys not defined' error
// switching to 5.x.x fixed the issue
var recipes = localStorage['su6a12_recipes'] ? JSON.parse(localStorage['su6a12_recipes']) : []

const MainApp = React.createClass({
  // set initial flag for modal to false
  getInitialState () {
    return {
      isModalOpen: false
    }
  },
  openModal () {
    this.setState({isModalOpen: true})
  },
  closeModal () {
    this.setState({isModalOpen: false})
  },
  // handler to get recipe info from user
  handleAddRecipe () {
    this.closeModal()
    // if no recipe title supplied, use generic placeholder
    let title = document.getElementById('recipe-title').value || 'No Title'
    // separate each ingredient by a comma and remove any whitespaces around each word
    let ingredients = document.getElementById('recipe-ingredients').value.split(',').map((each) => each.trim())
    // check if recipe title already in list
    // yes, then update ingredients list with new list
    // no, add new recipe to recipe list
    for(var i = 0; i < recipes.length; i++) {
      // flag to check if we've encountered the new recipe
      var isInList = false
      if (recipes[i]['title'] === title) {
        recipes[i]['ingredients'] = ingredients
        isInList = true
        break;
      }
    }
    // if new recipe wasn't detected in recipe list
    if (!isInList) {
      recipes.push({title, ingredients})
      localStorage.setItem('su6a12_recipes', JSON.stringify(recipes))
    }
  },
  render () {
    return (
      <div>
        <RecipeList/>
        <button onClick={() => this.openModal()}>Add Recipe</button>
        <AddRecipeModal 
          isAddModalOpen={this.state.isModalOpen}
          onClose={() => this.closeModal()} 
          onAdd={() => this.handleAddRecipe()} />
      </div>
    )
  }
})

const AddRecipeModal = React.createClass({
  closeAddModal (e) {
    e.stopPropagation()
    this.props.onClose()
  },
  addRecipe () {
    this.props.onAdd()
  },
  render () {
    if (this.props.isAddModalOpen === false) {
      return null
    }
    return (
      <div>
        <div className='modal-style'>
          <div className='modal-title'>Add a Recipe</div>
            <label for='recipe-title'>Recipe</label>
            <input id='recipe-title' type='text' placeholder='Recipe Name' />
            <label for='recipe-ingredients'>Ingredients</label>
            <textarea id='recipe-ingredients' type='textarea' placeholder='Separate, By, Commas' rows='10' cols='50'/>
            <button onClick={() => this.addRecipe()}>Add</button>
            <button onClick={e => this.closeAddModal(e)}>Close</button>
        </div>
        <div className='modal-background' onClick={e => this.closeAddModal(e)}></div>
      </div>
    )
  }
})

const RecipeList = React.createClass({
  render () {
    let recipeList = recipes.map((recipe, index) => {
      return (
        <Recipe 
          recipe={recipe}
          index={index}
          key={index} />
      )
    })
    return (
      <ul>
        {recipeList}
      </ul>
    )
  }
})

const Recipe = React.createClass({
  getInitialState () {
    return {
      isIngredientsShowing: false,
      isChangeModalOpen: false
    }
  },
  closeChangeModal () {
    this.setState({isChangeModalOpen: false})
  },
  openEditModal () {
    this.setState({isChangeModalOpen: true})

  },
  deleteRecipe () {
    recipes.splice(this.props.index, 1);
    localStorage.setItem('su6a12_recipes', JSON.stringify(recipes))

    // instead of passing state back to recipe list
    // I rerender the entire page including list of recipes
    ReactDOM.render(<MainApp />, document.getElementById('mainApp'));
  },
  handleEditRecipe (list) {
    recipes[this.props.index]['ingredients'] = list
  },
  handleSlider () {
    this.setState({isIngredientsShowing: !this.state.isIngredientsShowing})
  },
  render () {
    return (
      <div>
        <li onClick={() => this.handleSlider()}>
          <div className='title'>{this.props.recipe.title}</div>
          <IngredientsList 
            isOpen={this.state.isIngredientsShowing}
            recipe={this.props.recipe}
            index={this.props.index}
            onEditClick={() => this.openEditModal()}
            onDeleteClick={() => this.deleteRecipe()}/>
          <ChangeRecipeModal 
            isChangeModalOpen={this.state.isChangeModalOpen}
            onCloseModal={() => this.closeChangeModal()}
            onEditModal={() => this.handleEditRecipe()}
            recipe={this.props.recipe}/>
        </li>
      </div>
    )
  }
})

const IngredientsList = React.createClass({
  openEditModalClick (e) {
    e.stopPropagation()
    this.props.onEditClick()
  },
  deleteRecipeClick (e) {
    e.stopPropagation()
    this.props.onDeleteClick()
  },
  render () {
    if (this.props.isOpen === false) {
      return null
    }
    let ingredientsList = this.props.recipe.ingredients.map((ingredient, index) => {
      return (
        <div 
          className='ingredient'
          key={index}>{ingredient}</div>
      )
    })
    return (
      <div>
        {ingredientsList}
        <button onClick={e => this.openEditModalClick(e)}>Edit</button>
        <button onClick={e => this.deleteRecipeClick(e)}>Delete</button>
      </div>
    )
  }
})

const ChangeRecipeModal = React.createClass({
  editRecipe (e) {
    e.stopPropagation(e)
    this.props.onEditModal(document.getElementById('recipe-ingredients').value)
  },
  closeModal (e) {
    e.stopPropagation()
    this.props.onCloseModal(e)
  },
  render () {
    if (this.props.isChangeModalOpen === false) {
      return null
    }
    let ingredientsList = this.props.recipe.ingredients.toString()
    return (
      <div>
        <div className='modal-style'>
          <div className='modal-title'>Edit Recipe</div>
          <label for='recipe-title'>Recipe</label>
          <input id='recipe-title' type='text' value={this.props.recipe.title} />
          <label for='recipe-ingredients'>Ingredients</label>
          <textarea id='recipe-ingredients' type='textarea' rows='10' cols='50'>{ingredientsList}</textarea>
          <button onClick={e => this.editRecipe(e)}>Edit</button>
          <button onClick={e => this.closeModal(e)}>Close</button>
        </div>
        <div className='modal-background' onClick={e => this.closeModal(e)}></div>
      </div>
    )
  }
})

ReactDOM.render(<MainApp />, document.getElementById('mainApp'));
