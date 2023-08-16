
import React, { useState } from 'react';
import Papa from 'papaparse'; // For parsing CSV files

const App = () => {

  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [client, setClient] = useState('');
  const [contractor, setContractor] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [maxX, setMaxX] = useState('');
  const [minX, setMinX] = useState('');
  const [maxY, setMaxY] = useState('');
  const [minY, setMinY] = useState('');
  const [maxZ, setMaxZ] = useState('');
  const [minZ, setMinZ] = useState('');

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

        console.log(values);
        const xValues = values.map((row) => parseFloat(row[headers.indexOf('X')]));
        const yValues = values.map((row) => parseFloat(row[headers.indexOf('Y')]));
        const zValues = values.map((row) => parseFloat(row[headers.indexOf('Z')]));

        console.log("X values", xValues);
        // console.log("Y values", ...yValues);
        // console.log("Z values", ...zValues);

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
    <div className="p-8 grid place-content-center">
      <h2 className="text-xl font-semibold mb-4">Prototype for XYZ Company</h2>
      {step === 1 && (
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
          <div className='space-y-2'>
            {/* Csv */}
            <div >
              <label className="block font-medium">CSV File:</label>
              <input type="file" accept=".csv" onChange={handleCsvFileChange} className="w-full" />
            </div>
            {/* submit button */}
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" > Next </button>
          </div>

        </form>
      )}



      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Step 1 Details</h3>
          <p>Project Name: {projectName}</p>
          <p>Project Description: {projectDescription}</p>
          <p>Client: {client}</p>
          <p>Contractor: {contractor}</p>


          {/* Display other Step 1 details */}
          <h3 className="text-lg font-semibold">Step 2 Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <p>Max X: {isNaN(maxX) ? 'N/A' : maxX}</p>
            <p>Min X: {isNaN(minX) ? 'N/A' : minX}</p>
            <p>Max Y: {isNaN(maxY) ? 'N/A' : maxY}</p>
            <p>Min Y: {isNaN(minY) ? 'N/A' : minY}</p>
            <p>Max Z: {isNaN(maxZ) ? 'N/A' : maxZ}</p>
            <p>Min Z: {isNaN(minZ) ? 'N/A' : minZ}</p>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Step 1 Details</h3>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-medium pr-4">Project Name:</td>
                <td>{projectName}</td>
              </tr>
              {/* Display other Step 1 details */}
            </tbody>
          </table>
          <h3 className="text-lg font-semibold">Step 2 Details</h3>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-medium pr-4">Max X:</td>
                <td>{isNaN(maxX) ? 'N/A' : maxX}</td>
              </tr>
              <tr>
                <td className="font-medium pr-4">Min X:</td>
                <td>{isNaN(minX) ? 'N/A' : minX}</td>
              </tr>
              <tr>
                <td className="font-medium pr-4">Max Y:</td>
                <td>{isNaN(maxY) ? 'N/A' : maxY}</td>
              </tr>
              <tr>
                <td className="font-medium pr-4">Min Y:</td>
                <td>{isNaN(minY) ? 'N/A' : minY}</td>
              </tr>
              <tr>
                <td className="font-medium pr-4">Max Z:</td>
                <td>{isNaN(maxZ) ? 'N/A' : maxZ}</td>
              </tr>
              <tr>
                <td className="font-medium pr-4">Min Z:</td>
                <td>{isNaN(minZ) ? 'N/A' : minZ}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
