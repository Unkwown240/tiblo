import React from 'react'
import { Link, useParams, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { useState, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react'; 

export default function DashBlogEdit(props) {
    const { data } = useContext(AppContext)
    const slugs = []
    const { path } = useRouteMatch()
    for (let i = 0; i < data.length; i++) {
        slugs.push(data[i].slug);
    }
    return (
        <Route exact path={`${path}/:blogname`}>
            <Edit data={data} slugs={slugs}/>
        </Route>
    )
}

function Edit(props){
    const history = useHistory()
    const { blogname } = useParams();
    let editData = props.data[props.slugs.indexOf(blogname)];
    editData?null:editData = {"id":null,"heading":"", "content":[], "user":null,"slug":null}
    const data = editData.content
    const [Value, setValue] = useState(editData.title)
    const handleChange = e => {
        setValue(e.target.value)
    }
    const handleEditorChange = (e) => {}
    var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const handleCancel = () => {
        history.push("/dash/blogs")
    }
    const handleSave = () => {
        const newContent = tinymce.editors[0].getContent();
        //update request here
        history.push("/dash/blogs");
    }
    return(
        <div className="box-1">
            <h2 className='edit-blogs-head'><Link to="/dash/blogs">Dash-blogs</Link> &gt; Edit</h2>
            {props.slugs.indexOf(blogname)!=-1?
            <><div className="info-box">
                <div className="blog-heading">
                    <h4>Heading -</h4>
                    <input type="text" value={Value} onChange={handleChange}/>
                </div>
                <div className="creation-date">
                    <h4>Date of creation -</h4>
                    <p>12-1-22</p>
                </div>
                </div>
            <div className="scroll-content-box" id='scrollContentBox'>
            <div className="scroll-box">
                    <Editor
                        id="hello"
                        apiKey="6113uch64ujltwvzvs6rdrrzaetvsx84ycdk4r8w3j1ajj8b"
                        initialValue={data}
                        init={{
                            selector: 'textarea#full-featured',
                            plugins: 'print preview powerpaste casechange importcss searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export',
                            tinydrive_token_provider: 'URL_TO_YOUR_TOKEN_PROVIDER',
                            tinydrive_dropbox_app_key: 'YOUR_DROPBOX_APP_KEY',
                            tinydrive_google_drive_key: 'YOUR_GOOGLE_DRIVE_KEY',
                            tinydrive_google_drive_client_id: 'YOUR_GOOGLE_DRIVE_CLIENT_ID',
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
                            content_style: `.mymention{ color: gray; } @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'); body { font-family: Montserrat; }`,
                            contextmenu: 'link image imagetools table configurepermanentpen',
                            a11y_advanced_options: true,
                            font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Montserrat=Montserrat; Karla=Karla; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
                            skin:  'oxide',//'oxide-dark'
                            content_css:  'default',//'dark'
                          }}
                        onChange={handleEditorChange}
                    />
                </div>
                </div>
            <div className="control-btns-box">
                <Link to="#" onClick={handleCancel} className="cancel-btn">Cancel</Link>
                <Link to="#" onClick={handleSave} className="save-btn">Save Changes</Link>
            </div></>:
            <div className='warning-text'>No Such Blog Found!</div>
            }
        </div>  
    )
}