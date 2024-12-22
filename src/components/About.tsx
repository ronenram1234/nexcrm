

import { FunctionComponent } from "react";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {  


return (
  <div className="container">
  <h2>About</h2>
  <p>Welcome to the user guide. Here is the full document:</p>
  
  <Worker workerUrl="//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js">
    <div className="h-[600px]">
      <Viewer fileUrl="/About.pdf" />
    </div>
  </Worker>
</div>
  )
};

export default About;
