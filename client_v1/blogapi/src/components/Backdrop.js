import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../AppContext';

export default function Backdrop(props) {
    const { selected } = useContext(AppContext)
    return (
        <div className='preview-backdrop' id='preview'>
            <div className="modal">
                <div className="head-box">
                    <h1>{selected.title}</h1>
                    <a id='close-btn' href="#"><i className="fi fi-br-cross"></i></a>
                </div>
                <div className="content-box" dangerouslySetInnerHTML={{ __html: selected.content }}>
                </div>
                {props.editbtn?<div className="edit-save-box">
                    <Link to={`/dash/blogs/edit/${selected.slug}`} className='edit-btn' onClick={() => {
                        document.getElementById("close-btn").click();
                    }}>Edit</Link>
                    <a href="#" className='save-btn'>Save</a>
                </div>:null}
            </div>
        </div>
    )
}
