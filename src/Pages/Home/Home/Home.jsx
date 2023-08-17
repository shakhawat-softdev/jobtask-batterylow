
import React, { useContext, useState } from 'react';
import Papa from 'papaparse'; // For parsing CSV files
import { Link } from 'react-router-dom';
import { useMyContext } from '../../../Providers/MyContextProvider';

const Home = () => {

   const { maxX, setMaxX, minX,
      maxY,
      minY,
      maxZ,
      minZ,
      setMinX,
      setMaxY,
      setMinY,
      setMaxZ,
      setMinZ,
      userInput_maxX,
      userInput_maxY,
      userInput_maxZ,
      userInput_minX,
      userInput_minY,
      userInput_minZ,
      setUserInput_MaxX,
      setUserInput_maxY,
      setUserInput_maxZ,
      setUserInput_minX,
      setUserInput_minY,
      setUserInput_minZ,
      projectName, setProjectName,
      projectDescription, setProjectDescription,
      client, setClient,
      contractor, setContractor,
      csvFile, setCsvFile, } = useMyContext();

   // console.log(maxX);


   const [step, setStep] = useState(1);



   const handleCsvFileChange = (event) => {
      const file = event.target.files[0];
      setCsvFile(file);

      Papa.parse(file, {
         complete: (result) => {
            const data = result.data;
            if (data.length < 2) {
               // Invalid CSV data
               return;
            }


            const headers = data[0];
            const values = data.slice(1);

            // console.log(values[0]);

            const xValues = values.map((row) => parseFloat(row[headers.indexOf('X')])).filter(val => isNaN(val) === false);
            const yValues = values.map((row) => parseFloat(row[headers.indexOf('Y')])).filter(val => isNaN(val) === false);
            const zValues = values.map((row) => parseFloat(row[headers.indexOf('Z')])).filter(val => isNaN(val) === false);


            console.log("Value of X index: ", xValues);
            console.log("Value of Y index: ", yValues);
            console.log("Value of Z index: ", zValues);

            setMaxX(Math.max(...xValues));
            setMinX(Math.min(...xValues));
            setMaxY(Math.max(...yValues));
            setMinY(Math.min(...yValues));
            setMaxZ(Math.max(...zValues));
            setMinZ(Math.min(...zValues));
         },
      });
   };

   const handleSubmitStep1 = (event) => {
      event.preventDefault();
      setStep(2);
   };

   return (
      <div className="p-8 grid place-content-center ">

         {step === 1 && (

            <div className='border-2 p-8 bg-slate-100 rounded-md'>
               <h2 className="text-xl font-semibold mb-4">Prototype for XYZ Company</h2>
               <form onSubmit={handleSubmitStep1} className="space-y-4 ">
                  <div className='grid grid-cols-3 gap-2 place-items-center'>
                     {/* Project Name */}
                     <div>
                        <label className="block font-medium">Project Name:</label>
                        <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                     </div>
                     {/* Project Decription */}
                     <div>
                        <label className="block font-medium">Project Description:</label>
                        <input type="text" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                     </div>
                     {/* Client */}
                     <div>
                        <label className="block font-medium">Client:</label>
                        <input type="text" value={client} onChange={(e) => setClient(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                     </div>
                     {/* Contractor */}
                     <div>
                        <label className="block font-medium">Constractor:</label>
                        <input type="text" value={contractor} onChange={(e) => setContractor(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                     </div>
                  </div>

                  {/* Csv submit button */}
                  <div className='space-y-2 mb-2'>
                     {/* Csv */}

                     <label className="block font-medium">Upload CSV File:</label>
                     <input type="file" accept=".csv" onChange={handleCsvFileChange} className="w-full" />

                     {/* submit button */}


                     {!csvFile &&
                        <div className='space-y-3'>
                           <h2>Or</h2>
                           <h4 className='font-medium'>Please Minimum and Maximum value of X, Y, Z field</h4>
                           <div className='grid grid-cols-3 gap-2 place-items-center'>
                              <div>
                                 <label className="block font-medium">Enter Min Value of X</label>
                                 <input type="text" value={userInput_minX} onChange={(e) => setUserInput_minX(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                              </div>
                              <div>
                                 <label className="block font-medium">Enter Min Value of Y</label>
                                 <input type="text" value={userInput_minY} onChange={(e) => setUserInput_minY(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                              </div>
                              <div>
                                 <label className="block font-medium">Enter Min Value of Z</label>
                                 <input type="text" value={userInput_minZ} onChange={(e) => setUserInput_minZ(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                              </div>

                              <div>
                                 <label className="block font-medium">Enter Max Value of X</label>
                                 <input type="text" value={userInput_maxX} onChange={(e) => setUserInput_MaxX(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                              </div>
                              <div>
                                 <label className="block font-medium">Enter Max Value of Y</label>
                                 <input type="text" value={userInput_maxY} onChange={(e) => setUserInput_maxY(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                              </div>
                              <div>
                                 <label className="block font-medium">Enter Max Value of Z</label>
                                 <input type="text" value={userInput_maxZ} onChange={(e) => setUserInput_maxZ(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                              </div>
                           </div>

                        </div>}
                     <Link to={'/result'}><button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" > Next </button></Link>
                  </div>

               </form>
            </div>
         )}



         {/* {step === 2 && (
            <div className="space-y-4 w-[700px]  border-2 p-8 bg-slate-100 rounded-md">

               <div className='p-5'>
                  <div>
                     <h3 className="text-lg font-semibold">Step 1 Details</h3>
                     <div className=' w-full space-y-3 p-3'>
                        <p>Project Name: {projectName}</p>
                        <p>Project Description: {projectDescription}</p>
                        <p>Client: {client}</p>
                        <p>Contractor: {contractor}</p>
                     </div>
                  </div>


                
                  {csvFile ? <div>
                     <h3 className="text-lg font-semibold ">Step 2 Details</h3>
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
                        <h3 className="text-lg font-semibold ">Step 2 Details</h3>
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
         )} */}





      </div>
   );
}

export default Home;
