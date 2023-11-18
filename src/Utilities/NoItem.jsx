import React from 'react'

const NoItem = () => {
  return (
    <div className="no-item flexcenter flexcol">
        <img src="/no_item.svg" alt="" />
        <p className='mini-text'>No item to show!</p>
    </div>
  )
}

export default NoItem