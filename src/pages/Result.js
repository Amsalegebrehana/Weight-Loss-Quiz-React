import React, { useState } from 'react'
import {downloadPdf} from '../api/downloadpdf';
import { useEffect } from 'react';


const Result = ({response, name, email}) => {


    const [lackEducationScore, setLackEducationScore] = useState(50);
    const [medicalConditionsScore, setMedicalConditionsScore] = useState(40);
    const [emotionalEatingScore, setEmotionalEatingScore] = useState(40);
    const [nutritionScore, setNutritionScore] = useState(12);

    const [isLoading, setIsLoading] = useState(false);
    

    const handleDownload = async () => {
        try {
            setIsLoading(true)
            const responseData = await downloadPdf(email);
          
            setIsLoading(false)

        } catch (error) {
            console.error('Error downloading pdf:', error);
        }
    }

    useEffect(() => {

        const calculateScore = () => {
            
            let lackEducationScore = 0;
            let medicalConditionsScore = 0;
            let emotionalEatingScore = 0;
            let nutritionScore = 0;


            const resData = response.response
            Object.keys(resData).forEach((questionId) => {
                if(resData[questionId] === 'yes' && parseInt(questionId) <= 10){
                    lackEducationScore += 1;
                }
                else if(resData[questionId] === 'no' && parseInt(questionId) > 10 && parseInt(questionId) <= 16){
                    medicalConditionsScore += 1;
                }
                else if(resData[questionId] === 'no' && parseInt(questionId) > 16 && parseInt(questionId) <= 28){
                    emotionalEatingScore += 1;
                }
                else if(resData[questionId] === 'yes' && parseInt(questionId) > 28 && parseInt(questionId) <= 40){
                    nutritionScore += 1;
                }
            });
    
            setMedicalConditionsScore(((medicalConditionsScore /6) * 100).toFixed(2) );
            setLackEducationScore(((lackEducationScore / 10) * 100).toFixed(2) );
            setEmotionalEatingScore(((emotionalEatingScore / 12) * 100).toFixed(2));
            setNutritionScore(((nutritionScore /10) * 100).toFixed(2));

        };
        
        calculateScore();
    }, [response]);

    return (
        <div>
            
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
                        Weight Lose Result of Name: {name} Email: {email}
                        </p>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                       
                        <div  className="flex flex-col bg-gray-400/5 p-8">
                            <dt className="text-sm font-semibold leading-6 text-gray-600">Lack of education/awareness </dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{lackEducationScore} %</dd>
                        </div>
                        <div  className="flex flex-col bg-gray-400/5 p-8">
                            <dt className="text-sm font-semibold leading-6 text-gray-600">Medical or Health Condition </dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{medicalConditionsScore} %</dd>
                        </div>
                        <div  className="flex flex-col bg-gray-400/5 p-8">
                            <dt className="text-sm font-semibold leading-6 text-gray-600">Emotional eating </dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{emotionalEatingScore} %</dd>
                        </div>
                        <div  className="flex flex-col bg-gray-400/5 p-8">
                            <dt className="text-sm font-semibold leading-6 text-gray-600">Inadequate nutrition</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{nutritionScore} %</dd>
                        </div>
                    </dl>

                    <button
                        type="button"
                        className="flex rounded-md bg-blue-900 px-4 mt-14 justify-center py-2 text-lg font-semibold text-white shadow-sm "
                        onClick={handleDownload}
                        >
                            <span className="mr-2">E-mail pdf Result</span>
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