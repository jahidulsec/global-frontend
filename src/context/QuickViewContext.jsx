import { createContext, useContext, useState } from "react";


const QuickViewContext = createContext(undefined)

export const QuickViewProvider = ({children}) => {

    const [product, setProduct] = useState('')

    return (
        <QuickViewContext.Provider
            value={{
                product,
                onProduct: (product) => {setProduct(product)}
            }}
        >
            {children}
        </QuickViewContext.Provider>
    )
} 


export const useQuickViewContext = () => useContext(QuickViewContext)