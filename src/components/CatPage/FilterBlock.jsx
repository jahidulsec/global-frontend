import React from 'react'

const FilterBlock = ({catList}) => {
  return (
    <>
        {
            catList.map(item => (
                <div key={item.name} className="filter-block">
                    <h4>{item.name}</h4>
                    <ul>
                        {
                            item.list.map(i => (
                                <li key={i}>
                                    <input type="checkbox" name={i} id={i} />
                                    <label htmlFor={i}>
                                        <span className="checked"></span> <span>{i}</span>
                                    </label>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            ))
        }
    </>
  )
}

export default FilterBlock