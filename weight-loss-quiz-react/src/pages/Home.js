import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/icons/arrow.svg'
import check from '../assets/icons/check.svg';
import questions from '../data/quiz.json';


const Home = (props) =>{
    const navigate = useNavigate();

    const [selected, setSelected] = useState(null);
    const [answersSelected, setAnswersSelected] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleSelect = (option) => {
        setSelected(option);
    }
 

    const handleNext = () => {
        currentQuestion < questions.length - 1 && setCurrentQuestion(currentQuestion + 1);
        if(selected === null){
            console.log('Please select an option');
        }else{
            console.log('Next');
        }

        const currentAnswer = {
            id: questions[currentQuestion].id,
            question: questions[currentQuestion].question,
            answer: selected
        }

        setAnswersSelected([...answersSelected, currentAnswer]);

        setSelected(null);

        if(currentQuestion === questions.length - 1){
            
            props.onResponse(answersSelected);
            navigate('/result');

        }
    }

    return(
        <div className="h-screen bg-gray-200 flex  justify-center items-center">
    
                <div className="flex flex-col w-4/5 ">
                    <p className=" ml-2 text-lg sm:text-xl md:text-2xl text-2xl "> <span>{questions[currentQuestion].id}. </span> {questions[currentQuestion].question}</p>
                    
                    <div className="mt-7 ml-5">
                        <button
                            type="button"
                            className={`rounded  pl-4 w-48 h-10 text-left py-1 text-lg font-medium border border-blue-900 text-blue-900 ring-1 ring-inset ring-gray-300 hover:text-white hover:bg-blue-900 ${selected === 'yes' ? 'bg-blue-900 text-white' : ' bg-blue-100'}`}
                            
                            onClick={() => handleSelect('yes')}
                        >
                            <span className="inline-flex items-center rounded-sm bg-blue-50 px-2 py-1 text-sm mr-3 font-bold text-blue-900 ring-2 ring-inset ring-blue-900">
                                Y
                            </span>
                            Yes
                        </button>
                    </div>

                    <div className="mt-4 ml-5">
                        <button
                            type="button"
                            className={`rounded  pl-4 w-48 h-10 text-left py-1 text-lg font-medium border border-blue-900 text-blue-900 ring-1 ring-inset ring-gray-300 hover:text-white hover:bg-blue-900 ${selected === 'no' ? 'bg-blue-900 text-white' : ' bg-blue-100'}`}
                            // classsName="rounded bg-white pl-4 w-48 h-10 text-left py-1 text-lg font-medium border border-blue-900 text-blue-900 bg-blue-100 ring-1 ring-inset ring-gray-300 hover:text-white hover:bg-blue-900"
                            onClick={() => handleSelect('no')}
                        >
                            <span className="inline-flex items-center rounded-sm bg-blue-50 px-2 py-1 text-sm mr-3 font-bold text-blue-900 ring-2 ring-inset ring-blue-900">
                                N
                            </span>
                            No
                        </button>
                    </div>

                    <div className="mt-4 ml-5">
                        <button
                            type="button"
                            className="rounded-lg bg-blue-900 pl-4 w-28 flex items-center text-center  h-10 text-left py-1 text-lg font-bold border border-blue-900 text-white  ring-1 ring-inset ring-gray-300 "
                            onClick={() => handleNext()}
                            disabled={selected === null}
                        >
                            NEXT <img src={arrow} alt='arrow' className='w-6 h-6 ml-2' />
                        </button>
                    </div>

                </div>
       
    </div>
    )
}

export default Home;