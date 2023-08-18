import React from 'react';
import { useMyContext } from '../../../Providers/MyContextProvider';
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";



const Result = () => {

   const { maxX, minX, maxY, minY, maxZ, minZ, userInput_maxX, userInput_maxY, userInput_maxZ, userInput_minX, userInput_minY, userInput_minZ, projectName, projectDescription, client, contractor, csvFile, valueOfX, valueOfY, valueOfZ, } = useMyContext();



   const exportPDF = () => {
      let element = (
         <div className="space-y-4 w-[700px]  border-2 p-8 bg-slate-100 rounded-md">


            {/* For PDF */}
            <div className='p-5'>
               <div>
                  <h3 className="text-lg font-semibold">Result</h3>
                  <div className=' w-full space-y-3 p-3'>
                     <p>Project Name: {projectName}</p>
                     <p>Project Description: {projectDescription}</p>
                     <p>Client: {client}</p>
                     <p>Contractor: {contractor}</p>
                  </div>
               </div>

               {/* Display other Step 1 details */}
               {csvFile ? <div>
                  <h3 className="text-lg font-semibold ">Result Details</h3>
                  <div className="grid grid-cols-2 gap-4 p-3">
                     <p>Max X: {isNaN(maxX) ? 'N/A' : maxX}</p>
                     <p>Min X: {isNaN(minX) ? 'N/A' : minX}</p>
                     <p>Max Y: {isNaN(maxY) ? 'N/A' : maxY}</p>
                     <p>Min Y: {isNaN(minY) ? 'N/A' : minY}</p>
                     <p>Max Z: {isNaN(maxZ) ? 'N/A' : maxZ}</p>
                     <p>Min Z: {isNaN(minZ) ? 'N/A' : minZ}</p>
                  </div>
               </div> :
                  <div>
                     <h3 className="text-lg font-semibold ">Result Details</h3>
                     <div className="grid grid-cols-2 gap-4 p-3">
                        <p>Max X: {userInput_maxX}</p>
                        <p>Min X: {userInput_minX}</p>
                        <p>Max Y: {userInput_maxY}</p>
                        <p>Min Y: {userInput_minY}</p>
                        <p>Max Z: {userInput_maxZ}</p>
                        <p>Min Z: {userInput_minZ}</p>
                     </div>
                  </div>
               }
            </div>
         </div>
      );
      const doc = new jsPDF("p", "pt", "letter");
      doc.html(ReactDOMServer.renderToString(element), {
         callback: function (doc) {
            doc.save('sample.pdf');
         }
      });
   };





   return (
      <div className='mx-auto grid md:grid-cols-2 place-items-center '>
         <div className='mx-auto relative mt-2 '>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 absolute right-4 md:right-14 top-3 md:top-6" onClick={exportPDF}>Download PDF</button>
            {/* <h2>This Result Page</h2> */}
            <div className="space-y-4 md:w-[700px] border-2 p-4 md:p-8 rounded-md md:ml-2">
               <h2 className='ml-2 md:ml-8'>Track Record Result</h2>
               <div className="divider bg-black h-[2px] mb-3 "></div>
               <div className='md:p-5 md:my-5'>
                  <div>
                     <h3 className="text-xl font-semibold bg-gray-300 p-1 pl-3">Details</h3>
                     <div className='font-medium w-full space-y-2 p-3 '>
                        <p>Project Name: <span className='font-normal'>{projectName}</span></p>
                        <p>Project Description: <span className=' font-normal'>{projectDescription}</span></p>
                        <p>Client:  <span className=' font-normal'>{client}</span></p>
                        <p>Contractor:  <span className=' font-normal'>{contractor}</span></p>
                     </div>
                  </div>

                  {/* Display other Step 1 details */}
                  {csvFile ? <div>
                     <h3 className="text-xl font-semibold bg-gray-300 p-1 pl-3">Result of Data</h3>
                     <div className="font-medium grid grid-cols-2 gap-3 p-3">
                        <p>Max X: <span className='font-normal'>{isNaN(maxX) ? 'N/A' : maxX}</span></p>
                        <p>Min X: <span className='font-normal'>{isNaN(minX) ? 'N/A' : minX}</span></p>
                        <p>Max Y: <span className='font-normal'>{isNaN(maxY) ? 'N/A' : maxY}</span></p>
                        <p>Min Y: <span className='font-normal'>{isNaN(minY) ? 'N/A' : minY}</span></p>
                        <p>Max Z: <span className='font-normal'>{isNaN(maxZ) ? 'N/A' : maxZ}</span></p>
                        <p>Min Z: <span className='font-normal'>{isNaN(minZ) ? 'N/A' : minZ}</span></p>
                     </div>
                  </div> :

                     <div>
                        <h3 className="text-lg font-semibold bg-gray-300 p-1 pl-3">Result of Data</h3>
                        <div className="grid grid-cols-2 gap-4 p-3">
                           <p>Max X: {userInput_maxX}</p>
                           <p>Min X: {userInput_minX}</p>
                           <p>Max Y: {userInput_maxY}</p>
                           <p>Min Y: {userInput_minY}</p>
                           <p>Max Z: {userInput_maxZ}</p>
                           <p>Min Z: {userInput_minZ}</p>
                        </div>
                     </div>
                  }
               </div>
            </div>
         </div>


         {csvFile &&
            <div className='mx-auto mb-10 mt-2'>
               <h1 className='text-3xl  text-center mb-3'>Input Values</h1>
               <div className="divider bg-black h-1 mb-2"></div>
               <div className="overflow-x-auto md:w-[600px] md:h-[400px] scroll-my-5  ">
                  <table className="table table-xs w-full">
                     <thead >
                        <tr className='grid grid-cols-3  '>
                           {/* <th>#</th> */}
                           <th>X-Index</th>
                           <th>Y-Index</th>
                           <th>Z-Index</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className='grid grid-cols-3 place-items-center gap-5 p-2 '>
                           {/* <th></th> */}
                           <td>{valueOfX.map(item => <ul>{item}</ul>)}</td>
                           <td>{valueOfY.map(item => <ul>{item}</ul>)}</td>
                           <td>{valueOfZ.map(item => <ul>{item}</ul>)}</td>

                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         }

      </div>
   );
};

export default Result;
