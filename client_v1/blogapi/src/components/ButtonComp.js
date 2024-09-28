import React from 'react'
import { AppContext } from '../AppContext';
import { useContext } from 'react'

export default function ButtonComp() {
    const { setState } = useContext(AppContext)
    const handleDarkMode = (e) => {
        const NewMode = e.target.checked ? "dark" : "light"
        setState({mode: NewMode})
    }
    return (
        <div className="button r" id="button-3">
            <input type="checkbox" id='darkModeBtn' className="checkbox" onClick={handleDarkMode}/>
            <div className="knobs"></div>
            <div className="layer"></div>
        </div>
    )
}
