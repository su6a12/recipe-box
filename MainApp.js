// older version of babel was throwing 'keys not defined' error
// switching to 5.x.x fixed the issue
const AddRecipeModal = React.createClass({
  close (e) {
    e.preventDefault()
    this.props.onClose()
  },
  render () {
    if (this.props.isOpen === false) {
      return null
    }
    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      zIndex: '100',
      background: 'yellow',
      padding: '20px',
      borderRadius: '5px'
    }
    let modalBackground = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '99',
      background: 'rgba(0,0,0,0.3)'
    }
    return (
      <div>
        <div style={modalStyle}>{this.props.children}</div>
        <div style={modalBackground} onClick={e => this.close(e)}></div>
      </div>
    )
  }
});

const MainApp = React.createClass({
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
  addRecipe () {
    this.closeModal()
    let title = document.getElementById('recipe-title').value
    let ingredients = document.getElementById('recipe-ingredients').value.split(',').map((each) => each.trim())
    
  },
  render () {
    return (
      <div>
        <button id='main-add' onClick={() => this.openModal()} value='Add'>Add Recipe</button>
        <AddRecipeModal 
          isOpen={this.state.isModalOpen}
          onClose={() => this.closeModal()}>
          <form>
            <div className='modal-title'>Add a Recipe</div>
            <label for='recipe-title'>Recipe</label>
            <input id='recipe-title' type='text' placeholder='Recipe Name' size='50' />
            <label for='recipe-ingredients'>Ingredients</label>
            <textarea id='recipe-ingredients' type='textarea' placeholder='Separate, By, Commas' rows='10' cols='50'/>
            <button onClick={() => this.addRecipe()}>Add Recipe</button>
            <button onClick={() => this.closeModal()}>Close</button>
          </form>
        </AddRecipeModal>
      </div>
    )
  }
});

ReactDOM.render(<MainApp />, document.getElementById('app'));
