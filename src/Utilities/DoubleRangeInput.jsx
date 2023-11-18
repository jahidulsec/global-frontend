import React, { useEffect, useState } from 'react'

const DoubleRangeInput = ({min_value, max_value, minPrice, maxPrice, onMinPrice, onMaxPrice}) => {

    const [minRange, setMinRange] = useState()
    const [maxRange, setMaxRange] = useState()

    useEffect(() => {
        onMinPrice(min_value)
        onMaxPrice(max_value)
        setMinRange(min_value)
        setMaxRange(max_value)
    }, [min_value, max_value])

  return (
    <div className="range">
        <div className="range-slider">
            <span 
                className="range-selected"
                style={
                    {
                        left: `${100 - (maxRange - minPrice) * 100 / (maxRange - minRange) }%`, 
                        right: `${100 - (maxPrice - minRange) * 100 / (maxRange - minRange) }%`
                    }
                }
            ></span>
        </div>
        <div className="range-input">
            <input 
                type="range" 
                className="min" 
                min={minRange} 
                max={maxRange} 
                value={minPrice}  
                step="10"
                onChange={(e) => {
                    onMinPrice(prev => {
                        if ((parseInt(e.target.value) + 100) < maxPrice) {
                            return e.target.value
                        } else {
                            return parseInt(maxPrice) - 100
                        }
                    })
                }}
            />
            <input 
                type="range" 
                className="max" 
                min={minRange} 
                max={maxRange}
                value={maxPrice} 
                step="10"
                onChange={(e) => {
                    onMaxPrice(prev => {
                        if ((parseInt(e.target.value) - 100) > minPrice) {
                            return e.target.value
                        } else {
                            return parseInt(minPrice) + 100
                        }
                    })
                }}
            />
        </div>
        <div className="range-price">      
            <label htmlFor="min">Min</label>
            <input type="number" name="min" value={minPrice}/>      
            <label htmlForp="max">Max</label>
            <input type="number" name="max" value={maxPrice}/>      
        </div>
    </div> 
  )
}

export default DoubleRangeInput