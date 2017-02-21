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

export default AddRecipeModal
