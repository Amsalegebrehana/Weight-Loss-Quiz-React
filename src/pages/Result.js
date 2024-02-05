import React, { useState } from 'react'
import {downloadPdf} from '../api/downloadpdf';

const stats = [
    { id: 1, name: 'Lack of education/awareness', value: '80%' },
    { id: 2, name: 'Medical or Health Condition', value: '30%' },
    { id: 3, name: 'Emotional eating', value: '90%' },
    { id: 4, name: 'Inadequate nutrition', value: '40%' },
  ]


const Result = ({response, name, email}) => {
    console.log("Result page response",response);
    console.log("results response",response.email);
    
    const [isLoading, setIsLoading] = useState(false);
    
    const handleDownload = async () => {
        try {
            setIsLoading(true)
            const response = await downloadPdf(response.email);
            console.log('Response:', response);
            setIsLoading(false)

        } catch (error) {
            console.error('Error downloading pdf:', error);
        }
    }

    return (
        <div>
            {response}
            <div className="flex items-center mx-48 justify-end mt-5 gap-x-6 bg-green-700 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                <p className="text-sm leading-6 text-white">
                    <a href="#">
                    <strong className="font-semibold">Successfully Finished</strong>
                    <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                        <circle cx={1} cy={1} r={1} />
                    </svg>
                   
                    </a>
                </p>
                <div className="flex flex-1 justify-end">
                    <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
                    <span className="sr-only">Dismiss</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>
            </div>

            <div className="mx-auto max-w-7xl mt-24 px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Results
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-600">
                        Lorem ipsum dolor sit amet consect adipisicing possimus.
                        </p>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                            <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                        </div>
                        ))}
                    </dl>

                    <button
                        type="button"
                        className="flex rounded-md bg-blue-900 px-4 mt-14 justify-center py-2 text-lg font-semibold text-white shadow-sm "
                        onClick={handleDownload}
                        >
                            <span className="mr-2">Download pdf</span>
                            {isLoading ? (
                                <p>...</p>
                            ): (
                                
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            )}
                         

                    </button>
                </div>

            </div>

            
        </div>
    )
}

export default Result;