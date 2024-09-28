import React, { useState } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import DashBlogEdit from './DashBlogEdit';
import ProfileSideComponent from './ProfileSideComponent';
import axios from 'axios';
import { Link } from 'react-router-dom';

const data_slicer = (data) => {
    const l = []
    for (let i = 0; i < data.length; i=i+2) {
        const d = data.slice(i, i+2);
        l.push(d)
    }
    return l
};
const extractContent = (s) => {
    var span = document.createElement('span');
    span.innerHTML = s;
    if(span.textContent.length<=250 || span.innerText.length<=250){
        return span.textContent || span.innerText;
    }
    else{
        return span.textContent.slice(0,250)+"......" || span.innerText.slice(0,250)+"......";
    }
  };

export default function DashBlogs() {
    const { data, setState, mode } = useContext(AppContext)
    const [search, setSearch] = useState('')
    const user = 1
    const [data_sliced, setData_sliced] = useState([])
    const requestFunc = async () => {
        const Data = await axios.get(`http://127.0.0.1:8000/api/`)
        setState({data: Data.data});
        setData_sliced(data_slicer(Data.data))
    }
    useEffect(() => {
        requestFunc()
    }, [search]);
    const profileBoxStyle = {light:{textColor: "black", backgroundColor: "white"},dark:{color: "white", backgroundColor: "rgb(2,2,42)"}}
    const dupProfileBoxStyle = {...(mode==="light" ? profileBoxStyle.light : profileBoxStyle.dark)}
    const dupBoxStyle = {...(mode==="light" ? {textColor: "black", backgroundColor: "rgba(0,0,0,0.1)"} : {textColor: "white", backgroundColor: "#ffffff12"})}
    const dupTileStyle = {...(mode==="light" ? {textColor: "black", backgroundColor: "rgba(0,0,0,0.1)"} : {textColor: "white", backgroundColor: "#ffffff12"})}
    const { path } = useRouteMatch();
    const searchBlog = () => {
        setData_sliced(data_slicer(data.filter(elem => elem.title.indexOf(search) !== -1)))
    }
    const deleteBlog = async (e) => {
        const res = await axios.get(`api/admin/delete/${e.target.key}/`)
        requestFunc()
    }
    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }
    return (
        <div className="cont">
            <Route exact path={`${path}`}>
            <div className="box-1" style={dupBoxStyle}>
                <h2>Dash-Blogs</h2>
                <div className="search-grid-box">
                    <input placeholder="Search your blogs here" type="text" value={search} onChange={handleSearchChange} className='search-box'/>
                    <a onClick={searchBlog}><i className="fi fi-rr-search"></i></a>
                </div>
                <div className="blogs-box">
                    {data_sliced===[]?<p className='no-blogs'>No Blogs Found</p>
                    :data_sliced.map((item, index) => {
                        return(<div className="row" key={index}>
                        <a href="#preview" className="box" style={dupProfileBoxStyle} key={item[0].id} onClick={() => {setState({selected:item[0]});}}>
                                <div className="head">
                                    <div className="heading" key={item[0].id+"a"}>{item[0].title}</div>
                                    <div className="function-box">
                                        <div className="status-box" style={dupTileStyle} key={item[0].id+"b"}>{item[0].status}</div>
                                        <Link to={`/dash/blog/edit/${item[0].slug}`}><p className="status-box hoverstyle" style={dupTileStyle}><span>Edit</span></p></Link>
                                        <i className="fi fi-rr-trash" key={item[0].id} onClick={deleteBlog}></i>
                                    </div>
                                </div>
                                <div className="data" key={item[0].id+"c"}>{item[0].content?extractContent(item[0].content):"No content in this blog."}</div>
                                </a>
                            {item.length==2?
                            <a href="#preview" className="box" style={dupProfileBoxStyle} key={item[1].id} onClick={() => {setState({selected:item[1]});}}>
                                <div className="head">
                                    <div className="heading" key={item[1].id+"a"}>{item[1].title}</div>
                                    <div className="function-box">
                                        <div className="status-box"key={item[1].id+"b"}>{item[1].status}</div>
                                        <Link to={`/dash/blog/edit/${item[1].slug}`}><i className="fi fi-rr-pen-circle"></i></Link>
                                        <i className="fi fi-rr-trash" key={item[1].id} onClick={deleteBlog}></i>
                                    </div>
                                </div>
                                <div className="data" key={item[1].id+"c"}>{item[1].content?extractContent(item[1].content):"No content in this blog."}</div>
                                </a>
                                :null}
                        </div>)
                    })}
                </div>
            </div>
            </Route>
            <Route path={`${path}/edit`}><DashBlogEdit/></Route>
        </div>
    )
}
