import React from 'react';
import ProfileSideComponent from './ProfileSideComponent';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { Editor } from '@tinymce/tinymce-react'; 
import axiosObj from './axios';


export default function DashAddNewBlog() {
    const { mode, setState } = useContext(AppContext)
    const { slugify } = useContext(AppContext)
    const date = new Date();
    const data = "Enter Blog-Content here"
    const [Value, setValue] = useState("Enter Blog-Heading here")
    const handleChange = e => {
        setValue(e.target.value)
    }
    const profileBoxStyle = {light:{textColor: "black", backgroundColor: "white"},dark:{color: "white", backgroundColor: "rgb(2,2,42)"}}
    const dupProfileBoxStyle = {...(mode==="light" ? profileBoxStyle.light : profileBoxStyle.dark)}
    const dupBoxStyle = {...(mode==="light" ? {textColor: "black", backgroundColor: "rgba(0,0,0,0.1)"} : {textColor: "white", backgroundColor: "#ffffff12"})}
    const handleEditorChange = (e) => {}
    var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const handleCancel = () => {
        history.push("/dash/blogs")
    }
    
    const handleSave = (e) => {
        const newContent = tinymce.editors[0].getContent();
        e.preventDefault();
        const author = 1
        const slug = slugify(Value)
        axiosObj.post(`admin/create/${author}/`,{
            title: Value,
            content: newContent,
            author,
            category: 2,
            slug: slug
        }).then(res => {
            console.log(res)
        })
    }
    return(
        <div className='cont'>
        <div className="box-1" style={dupBoxStyle}>
            <h2 className='edit-blogs-head'>Dash-Add-New-Blog</h2>
            <div className="info-box">
                <div className="blog-heading">
                    <h4>Heading -</h4>
                    <input type="text" style={dupProfileBoxStyle} value={Value} onChange={handleChange}/>
                </div>
                <div className="creation-date">
                    <h4>Date of creation -</h4>
                    <p>{date.toDateString()}</p>
                </div>
                </div>
            <div className="scroll-content-box" style={dupProfileBoxStyle} id='scrollContentBox'>
            <div className="scroll-box">
                    <Editor
                        id="hello"
                        apiKey="6113uch64ujltwvzvs6rdrrzaetvsx84ycdk4r8w3j1ajj8b"
                        initialValue={data}
                        init={{
                            selector: 'textarea#full-featured',
                            plugins: 'print preview powerpaste casechange importcss searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export',
                            mobile: {
                              plugins: 'print preview powerpaste casechange importcss searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable'
                            },
                            menu: {
                              tc: {
                                title: 'Comments',
                                items: 'addcomment showcomments deleteallconversations'
                              }
                            },
                            menubar: 'file edit view insert format tools table tc help',
                            toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                            autosave_ask_before_unload: true,
                            autosave_interval: '30s',
                            autosave_prefix: '{path}{query}-{id}-',
                            autosave_restore_when_empty: false,
                            autosave_retention: '2m',
                            image_advtab: true,
                            importcss_append: true,
                            templates: [
                                  { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                              { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                              { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                            ],
                            template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                            template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                            height: 600,
                            image_caption: true,
                            quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                            noneditable_noneditable_class: 'mceNonEditable',
                            toolbar_mode: 'sliding',
                            spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
                            tinycomments_mode: 'embedded',
                            content_style: '.mymention{ color: gray; }',
                            contextmenu: 'link image imagetools table configurepermanentpen',
                            a11y_advanced_options: true,
                            skin: useDarkMode ? 'oxide-dark' : 'oxide',
                            content_css: useDarkMode ? 'dark' : 'default',
                          }}
                        onChange={handleEditorChange}
                    />
                </div>
                </div>
            <div className="control-btns-box">
                <Link to="#" onClick={handleCancel} className="cancel-btn">Cancel</Link>
                <Link to="#" onClick={handleSave} className="save-btn">Save Changes</Link>
            </div>
        </div>  
        </div>
    )
}
