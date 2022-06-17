import { useState, useEffect } from "react";

export const useCounter = (componentName) => {
    const [value, setValue] = useState(0);
    
    // useEffect(() => {
    //     localStorage.setItem('value' + componentName, value)
    // }, [value])

    // useEffect(() => {
    //     const localValue = parseInt(localStorage.getItem('value' + componentName));
    //     setValue(localValue || 0)
    // }, [])

    const increment = () => {
        setValue(value + 1)
    }
    const decrement = () => {
        setValue(value - 1)
    }
    return { value, increment, decrement }
}
