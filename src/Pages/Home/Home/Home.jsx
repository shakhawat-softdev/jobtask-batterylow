
import React, { useState } from 'react';
import Papa from 'papaparse'; // For parsing CSV files
import { Link } from 'react-router-dom';
import { useMyContext } from '../../../Providers/MyContextProvider';
import Banner1 from '../Banner1';



const Home = () => {

   const { maxX, setMaxX, minX, maxY, minY, maxZ, minZ, setMinX, setMaxY, setMinY, setMaxZ, setMinZ, userInput_maxX, userInput_maxY, userInput_maxZ, userInput_minX, userInput_minY, userInput_minZ, setUserInput_MaxX, setUserInput_maxY, setUserInput_maxZ, setUserInput_minX, setUserInput_minY, setUserInput_minZ, projectName, setProjectName, projectDescription, setProjectDescription, client, setClient, contractor, setContractor, csvFile, setCsvFile, valueOfX, valueOfY, valueOfZ, setValueOfX, setValueOfY, setValueOfZ, valueOfKP, setValueOfKP } = useMyContext();

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
            const kPValues = values.map((row) => parseFloat(row[headers.indexOf('KP')])).filter(valu => isNaN(valu) === false);
            const xValues = values.map((row) => parseFloat(row[headers.indexOf('X')])).filter(valu => isNaN(valu) === false);
            const yValues = values.map((row) => parseFloat(row[headers.indexOf('Y')])).filter(valu => isNaN(valu) === false);
            const zValues = values.map((row) => parseFloat(row[headers.indexOf('Z')])).filter(valu => isNaN(valu) === false);

            setValueOfKP(kPValues);
            setValueOfX(xValues);
            setValueOfY(yValues);
            setValueOfZ(zValues);

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
      <div className="p-5 grid place-content-center ">

         {step === 1 && (

            <div className='border-2 p-12 bg-slate-100 rounded-md'>
               <h2 className="text-xl font-semibold mb-4">Track Record Form</h2>

               <form onSubmit={handleSubmitStep1} className="space-y-3  w-[700px]">
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
                  <div className='space-y-5 mb-2'>
                     {/* Csv */}

                     <label className="block font-medium">Upload CSV File:</label>
                     <input type="file" accept=".csv" onChange={handleCsvFileChange} className="w-full" />

                     {/* submit button */}


                     {!csvFile &&
                        <div className='space-y-3'>
                           <h2>Or</h2>
                           <h4 className='font-normal bg-slate-200 p-1'>Enter the minimum and maximum value of X, Y, Z field</h4>
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

                     <div className='space-x-3'>
                        <Link to={'/result'}><button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" > Next </button></Link>

                        {csvFile && <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" > Show Chart </button>}
                     </div>

                  </div>
               </form>
            </div>
         )}

         {step === 2 && (
            <div>
               React Chart
            </div>
         )}

         <Banner1 />
      </div>
   );
}

export default Home;
