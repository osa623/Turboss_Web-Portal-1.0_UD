"use client";

import { useState } from "react";

const TorqueCalculator = () => {

   //hooks
   const [power, setPower] = useState("");
   const [rpm, setRpm] = useState("");
   const [unit, setUnit] = useState("hp");
   const [result, setResult] = useState<{ torque: number; unit: string } | null>(null);
   const [error, setError] = useState<string | null>(null);
 
   const calculateTorque = async () => {
     if (!power || !rpm) {
       setError("Please enter values for Power and RPM.");
       return;
     }
 
     setError(null);
 
     // Call Python function using API route
     const response = await fetch("/api/calculateTorque", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ power: parseFloat(power), rpm: parseFloat(rpm), unit }),
     });
 
     const data = await response.json();
     if (data.error) {
       setError(data.error);
       setResult(null);
     } else {
       setResult(data);
     }
   };
 
   return (
     <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
       <h2 className="text-xl font-bold text-center mb-4">Car Torque Finder</h2>
 
       <div className="mb-3">
         <label className="block text-sm mb-1">Power ({unit.toUpperCase()})</label>
         <input
           type="number"
           value={power}
           onChange={(e) => setPower(e.target.value)}
           className="w-full p-2 border rounded text-black"
           placeholder="Enter power"
         />
       </div>
 
       <div className="mb-3">
         <label className="block text-sm mb-1">RPM</label>
         <input
           type="number"
           value={rpm}
           onChange={(e) => setRpm(e.target.value)}
           className="w-full p-2 border rounded text-black"
           placeholder="Enter RPM"
         />
       </div>
 
       <div className="mb-3">
         <label className="block text-sm mb-1">Unit</label>
         <select
           value={unit}
           onChange={(e) => setUnit(e.target.value)}
           className="w-full p-2 border rounded text-black"
         >
           <option value="hp">Horsepower (HP)</option>
           <option value="kw">Kilowatt (kW)</option>
         </select>
       </div>
 
       <button
         onClick={calculateTorque}
         className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 rounded"
       >
         Calculate Torque
       </button>
 
       {error && <p className="text-red-500 text-center mt-3">{error}</p>}
 
       {result && (
         <p className="text-center mt-4 text-lg font-semibold">
           Torque: {result.torque} {result.unit}
         </p>
       )}
     </div>
   );
}

export default TorqueCalculator;
