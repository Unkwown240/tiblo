import React, { useState, useEffect, createContext } from 'react';
import axiosObj from './components/axios';


const AppContext = createContext();

const AppProvider = ({ children }) => {
  
  const [state, setState] = useState({
       data: {},
       ItemsList:[],
       selected: {},
       mode: "light",
       email: "",
       user: {},
       rank: {},
       slugify: function(string) {
        const a =
          'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
        const b =
          'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
        const p = new RegExp(a.split('').join('|'), 'g');
    
        return string
          .toString()
          .toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, '-and-') // Replace & with 'and'
          .replace(/[^\w\-]+/g, '') // Remove all non-word characters
          .replace(/\-\-+/g, '-') // Replace multiple - with single -
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, ''); // Trim - from end of text
      }

  });



  return (
    <AppContext.Provider value={{
         ...state, 
         setState: (data) => setState({...state, ...data})
       }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };