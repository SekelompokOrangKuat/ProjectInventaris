import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { Box } from "@mui/material";

const PDF = (props) => {
   const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);  
  }
  return (
      <Box 
        maxWidth='100vw' 
        sx={{display:'flex', flexDirection:'column', alignItems:'center', backgroundColor:'themeGrey.main'}}
      >
        <Document
          file={props.file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          options={{workerSrc: "/pdf.worker.js"}}
        >
          {Array.from(
            new Array(numPages),
            (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderMode="svg"
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={1.5}
              />
            ),
          )}
        </Document>
      </Box>
  );
}
export default PDF;