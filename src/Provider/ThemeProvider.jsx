import { useState } from "react"
import { ThemeContext } from "../Context/ThemeContext"

export const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState('light')

    const myName  = 'Zeeshan'
    
    return (
        <ThemeContext.Provider value={{theme,myName}}>
            {children}
        </ThemeContext.Provider>
    )
}