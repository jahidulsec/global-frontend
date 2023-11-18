const ButtonClose = ({onClick}) => {

  return (
    <button 
        type='button' 
        className='btn-close' 
        onDoubleClick={onClick}
    >
        <span className="ri-close-line"></span>
    </button>
  )
}

export default ButtonClose