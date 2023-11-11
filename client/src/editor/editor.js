import React, { useState, useEffect } from 'react';
import ReactQill from 'react-quill';
import {Container} from '@mui/material';
import ReactHtmlParser from 'react-html-parser';
import 'highlight.js/styles/default.css'; // Import the highlight.js styles here
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import cpp from 'highlight.js/lib/languages/cpp'
import 'react-quill/dist/quill.snow.css';
import './App.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);


const toolbarOptions = [[{ 'header': [1, 2, 3, 4, false] }],,['bold', 'italic'], ['link', 'image'],['blockquote', 'code-block']];
  const module = {
    toolbar: toolbarOptions,
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },
  };

function App() {
  const [value,setValue] = useState("");
  const [displayContent,setDisplayContent] = useState("");

  const handleSubmit =()=>{
    setDisplayContent(prevContent => prevContent + value);
    setValue("");
  }
  console.log(displayContent);
  return (
    <Container>
      <ReactQill theme='snow' value={value} onChange={setValue} modules={module}/>
      <button onClick={handleSubmit}>Submit</button>
      <div className="content">
        {ReactHtmlParser(displayContent)}
      </div>
    </Container>
  );
}

export default App;
