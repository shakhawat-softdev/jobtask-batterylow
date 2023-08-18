
import React, { useState } from 'react';
import Papa from 'papaparse'; // For parsing CSV files
import { Link } from 'react-router-dom';
import { useMyContext } from '../../../Providers/MyContextProvider';
import { LineChart } from '@mui/x-charts/LineChart';




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
            // console.log(kPValues);
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
      <div className="p-5 md:grid-cols-2 grid place-content-center  ">
         <div className='border-2 border-teal-400 p-12 w-full mb-7 md:mb-0'>
            <h2 className="text-xl font-semibold ">Track Record</h2>
            <div className="divider bg-black  h-[2px] mb-3 "></div>
            <form onSubmit={handleSubmitStep1} className="space-y-3">
               <div className='grid md:grid-cols-2 gap-2 w-full'>
                  {/* Project Name */}
                  <div>
                     <label className="block font-medium">Project Name:</label>
                     <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className=" px-4 py-1 border-2 border-gray-300 rounded-lg" />

                  </div>
                  {/* Project Decription */}
                  <div>
                     <label className="block font-medium">Project Description:</label>
                     <input type="text" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className=" px-4 py-1 border-2 border-gray-300 rounded-lg" />
                  </div>
                  {/* Client */}
                  <div>
                     <label className="block font-medium">Client:</label>
                     <input l type="text" value={client} onChange={(e) => setClient(e.target.value)} className=" px-4 py-1 border-2 border-gray-300 rounded-lg" />
                  </div>
                  {/* Contractor */}
                  <div>
                     <label className="block font-medium">Constractor:</label>
                     <input type="text" value={contractor} onChange={(e) => setContractor(e.target.value)} className="  px-4 py-1 border-2 border-gray-300 rounded-lg" />
                  </div>
               </div>

               {/* Csv submit button */}
               <div className='space-y-4 mb-2 w-full'>
                  {/* Csv */}
                  <label className="block font-medium">Upload CSV File:</label>
                  <input type="file" accept=".csv" onChange={handleCsvFileChange} className="w-full" />

                  {!csvFile &&
                     <div className='space-y-3'>
                        <h2>Or</h2>
                        <h4 className='font-normal bg-slate-200 p-1'>Enter the minimum and maximum value of X, Y, Z field</h4>
                        <div className='grid grid-cols-3 gap-2 place-items-center'>
                           <div>
                              <label className="block text-sm">Enter Min Value of X</label>
                              <input required={true} type="number" value={userInput_minX} onChange={(e) => setUserInput_minX(e.target.value)} className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg" />
                           </div>
                           <div>
                              <label className="block text-sm">Enter Min Value of Y</label>
                              <input required={true} type="number" value={userInput_minY} onChange={(e) => setUserInput_minY(e.target.value)} className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg" />
                           </div>
                           <div>
                              <label className="block text-sm">Enter Min Value of Z</label>
                              <input required={true} type="number" value={userInput_minZ} onChange={(e) => setUserInput_minZ(e.target.value)} className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg" />
                           </div>

                           <div>
                              <label className="block text-sm">Enter Max Value of X</label>
                              <input required={true} type="number" value={userInput_maxX} onChange={(e) => setUserInput_MaxX(e.target.value)} className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg" />
                           </div>
                           <div>
                              <label className="block text-sm">Enter Max Value of Y</label>
                              <input required={true} type="number" value={userInput_maxY} onChange={(e) => setUserInput_maxY(e.target.value)} className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg" />
                           </div>
                           <div>
                              <label className="block text-sm">Enter Max Value of Z</label>
                              <input required={true} type="number" value={userInput_maxZ} onChange={(e) => setUserInput_maxZ(e.target.value)} className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg" />
                           </div>
                        </div>
                     </div>}

                  <div className='space-x-3'>

                     {csvFile ?
                        <button type="submit" className="btn btn-info btn-sm"
                           disabled={(!projectName | !projectDescription | !client | !contractor)} >
                           <Link to={'/result'}>
                              Next
                           </Link>
                        </button>
                        :
                        <button type="submit" className="btn btn-info btn-sm"
                           disabled={(!projectName | !projectDescription | !client | !contractor | !userInput_maxX | !userInput_maxY | !userInput_maxZ | !userInput_minX | !userInput_minY | !userInput_minZ)} >
                           <Link to={'/result'}>
                              Next
                           </Link>
                        </button>
                     }

                     {csvFile && <button type="submit" className="btn btn-info btn-sm" > Show Chart </button>}
                  </div>
               </div>

            </form>
         </div>

         {step === 2 && (
            <div className='mx-auto'>
               <h2 className='text-center font-semibold'>Data Chart</h2>
               <div className="divider bg-black  h-[2px] mb-3 "></div>
               <div className=' w-[320px] h-[320px] md:w-[600px] md:h-600px] '>
                  <LineChart
                     xAxis={[{ data: [...valueOfKP] }]}
                     series={[
                        {
                           data: [...valueOfX],
                        },
                     ]}

                  />
               </div>
               <p className='text-center'>KP as X axis and X as Y axis</p>
            </div>
         )}


      </div>
   );
}

export default Home;
