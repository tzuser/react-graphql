import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import CodeMirror from './codemirror';

// const Markdown = styled(ReactMarkdown)`
//   img {
//     width: 100%;
//   }
//   pre {
//     overflow: auto;
//     border: 1px solid #ccc;
//     padding: 2px;
//   }

//   blockquote {
//     color: #666;
//     margin: 0;
//     padding-left: 3em;
//     border-left: 0.5em #eee solid;
//   }

//   tr {
//     border-top: 1px solid #c6cbd1;
//     background: #fff;
//   }

//   th,
//   td {
//     padding: 6px 13px;
//     border: 1px solid #dfe2e5;
//   }

//   table tr:nth-child(2n) {
//     background: #f6f8fa;
//   }
// `;

class Markdown extends React.Component {
  render() {
    return (
      <form className="editor pure-form">
        <CodeMirror
          mode="markdown"
          theme="monokai"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </form>
    );
  }
}
export default Markdown;

/*`
.page-header {
  color: #fff;
  background: #191818;
  margin: 0;
  padding: 10px 20px;
}

.editor-pane {
  position: fixed;
  top: 57px;
  left: 0;
  bottom: 0;
  width: 50%;
  height: auto;
  overflow: auto;
  box-shadow: -10px 2px 6px 10px rgba(0, 0, 0, 0.4);
}

.result-pane > div {
  position: fixed;
  top: 57px;
  right: 0;
  left: 50%;
  bottom: 0;
  overflow: auto;
  padding: 10px;
  padding-left: 20px;
  color: #444;
  font-family: Georgia, Palatino, 'Palatino Linotype', Times, 'Times New Roman', serif;
  font-size: 16px;
  line-height: 1.5em;
}

.editor textarea {
  padding: 20px;
}

.editor-pane textarea {
  min-height: 500px;
}

.markdown-controls {
  position: relative;
  z-index: 5;
  text-align: right;
  color: #fff;
  float: right;
}

.markdown-controls form {
  background-color: rgba(39, 40, 34, 0.5);
  margin-right: 20px;
}

.markdown-controls legend {
  border-bottom: 0;
  color: #fff;
  font-size: 1.25em;
  margin: 0;
  padding: 10px 0 0 0;
}

.CodeMirror {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;

  font-size: 16px;
}
`*/
