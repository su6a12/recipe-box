// older version of babel was throwing 'keys not defined' error
// switching to 5.x.x fixed the issue
var recipes = localStorage['su6a12_recipes'] ? JSON.parse(localStorage['su6a12_recipes']) : []

console.log(recipes)

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
        <button id='main-add' onClick={() => this.openModal()} value='Add'>Add Recipe</button>
        <AddRecipeModal 
          isOpen={this.state.isModalOpen}
          onClose={() => this.closeModal()} 
          onAdd={() => this.handleAddRecipe()} />
      </div>
    )
  }
})

const AddRecipeModal = React.createClass({
  closeModal (e) {
    e.preventDefault()
    this.props.onClose()
  },
  addRecipe () {
    this.props.onAdd()
  },
  render () {
    if (this.props.isOpen === false) {
      return null
    }
    return (
      <div>
        <div className='modal-style'>
          <div className='modal-title'>Add a Recipe</div>
            <label for='recipe-title'>Recipe</label>
            <input id='recipe-title' type='text' placeholder='Recipe Name' size='50' />
            <label for='recipe-ingredients'>Ingredients</label>
            <textarea id='recipe-ingredients' type='textarea' placeholder='Separate, By, Commas' rows='10' cols='50'/>
            <button onClick={() => this.addRecipe()}>Add Recipe</button>
            <button onClick={e => this.closeModal(e)}>Close</button>
        </div>
        <div className='modal-background' onClick={e => this.closeModal(e)}></div>
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
      isChangeModalOpen: false
    }
  },
  openChangeModal () {
    this.setState({isChangeModalOpen: true})
  },
  closeChangeModal () {
    this.setState({isChangeModalOpen: false})
  },
  handleChangeModal () {
    return
  },
  render () {
    let ingredientsList = this.props.recipe.ingredients.map((ingredient) => {
      return (
        <div className='ingredient'>{ingredient}</div>
      )
    })
    return (
      <div>
        <li onClick={() => this.handleChangeModal()}>
          {this.props.recipe.title}
          {ingredientsList}
        </li>
        <ChangeRecipeModal 
          isOpen={this.state.isChangeModalOpen}
          onClose={() => this.closeChangeModal()}
          onOpen={() => this.openChangeModal()} />
      </div>
    )
  }
})

const ChangeRecipeModal = React.createClass({
  render () {
    return <div></div>
  }
})

ReactDOM.render(<MainApp />, document.getElementById('mainApp'));
