import React, { useState } from 'react'
import { Calculator, X, HeartPulse, RefreshCw  } from 'lucide-react';

const BMICalculator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [onError, setOnError] = useState(false);
    const [isCalculated, setIsCalculated] = useState(false);
    const [bmiValues, setBmiValues] = useState({
        height: '',
        weight: '',
        bmi: 0, 
        category: ''
    })

    const handleCompute = () => {
        try {
            const height = Number(bmiValues.height);
            const weight = Number(bmiValues.weight);

            // Convert cm → meters
            const computedHeight = height / 100;

            // BMI formula
            const computedBmi = weight / Math.pow(computedHeight, 2);

            // Determine category
            let category = '';
            if (computedBmi < 18.5) category = 'Under Weight';
            else if (computedBmi >= 18.5 && computedBmi <= 24.9) category = 'Normal Weight';
            else if (computedBmi >= 25 && computedBmi <= 29.9) category = 'Overweight';
            else if (computedBmi >= 30) category = 'Obese';

            // Round BMI to 2 decimals (optional)
            const roundedBmi = computedBmi.toFixed(2);

            // Update state
            setBmiValues({
                ...bmiValues,
                bmi: roundedBmi,
                category: category
            });
        } catch (err) {
            setOnError(true);
            console.error(err);
        } finally {
            setIsCalculated(true);
        }
    };

    return (

        <div className="fixed bottom-20 right-4 z-50">
            {isOpen && 
                <div className="mb-4 w-[400px] h-[200px] md:h-[300px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 p-4 flex items-center justify-between relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 bg-blue-800 bg-opacity-10"></div>
                            <div className="flex items-center space-x-3 relative z-10">
                                <div className="w-8 h-8  bg-opacity-20 rounded-full flex items-center justify-center ring-2 ring-white ring-opacity-30">
                                    <Calculator className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">BMI CALCULATOR</h3>
                                    <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-all duration-200 hover:rotate-90 relative z-10"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-full flex flex-col items-center justify-center overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                        {!isCalculated ? (
                            <>
                                <input 
                                    type="text" 
                                    placeholder='Input Height (cm)'
                                    value={bmiValues.height}
                                    onChange={(e) => setBmiValues({...bmiValues, height: e.target.value})}
                                    className='w-full bg-gray-200 p-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                />

                                <input 
                                    type="text" 
                                    placeholder='Input Weight (kg)'
                                    value={bmiValues.weight}
                                    onChange={(e) => setBmiValues({...bmiValues, weight: e.target.value})}
                                    className='w-full bg-gray-200 p-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'

                                />

                                <button className='w-full bg-blue-800 text-white p-2  rounded-lg text-center' onClick={handleCompute}>CALCULATE</button>
                            </>
                        ) : (
                            <>
                                <h2 
                                    className='text-2xl font-semibold'
                                    style={{ color: bmiValues.category === 'Obese' || bmiValues.category === 'Under Weight' ? 'red' :
                                        bmiValues.category === 'Normal Weight' ? 'green' : 'orange'
                                      }}
                                >
                                    {bmiValues.category}
                                </h2>
                                <h4 className='text-lg'>
                                    BMI: 
                                    <span 
                                        className='ml-1 px-2 rounded-full text-white font-semibold'
                                        style={{ backgroundColor: bmiValues.category === 'Obese' || bmiValues.category === 'Under Weight' ? 'red' :
                                            bmiValues.category === 'Normal Weight' ? 'green' : 'orange'
                                        }}
                                    >
                                        {bmiValues.bmi}
                                    </span>
                                </h4>

                                <button 
                                    className='p-1 mt-4 rounded-full hover:text-white hover:bg-green-500 transition ease-in' 
                                    onClick={() => { 
                                        setIsCalculated(false);
                                        setBmiValues({
                                            height: '',
                                            weight: ''
                                        })
                                    }}
                                >
                                    <RefreshCw/>
                                </button>
                            </>
                        )}
   
                        
                    </div>
                </div>
            }
            
            

            {!isOpen && 
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                isOpen 
                    ? 'bg-gray-700 hover:bg-gray-600 shadow-gray-900/50' 
                    : 'bg-gradient-to-br from-blue-600 via-blue-500 to-black-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 shadow-blue-500/25'
                }`}
            >
                <div className="relative">
                    <HeartPulse className="w-6 h-6 text-white" />
                    {/* Notification dot */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
            </button>}
        </div>
    )
}

export default BMICalculator