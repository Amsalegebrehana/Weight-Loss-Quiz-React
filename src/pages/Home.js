import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/icons/arrow.svg'
import check from '../assets/icons/check.svg';
import questions from '../data/quiz.json';
import Login from '../component/Login';
import { sendAnswers } from '../api/sendAnswer';

const Home = (props) =>{
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [selected, setSelected] = useState(null);
    const [answersSelected, setAnswersSelected] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    
    const handleLogin = () => {
        // Perform login logic here
        setIsLoggedIn(true);
    }


    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    const handleNameChange = (newName) => {
        setName(newName);
    };

    const handleNext = async () => {

        console.log(questions.length)
       
        if(selected === null){
            console.log('Please select an option');
        }else{
            console.log('Next', currentQuestion);
        }

        const question_num = questions[currentQuestion].id.toString();
   
        setAnswersSelected({
            ...answersSelected,
            [question_num]: selected,
        });
    

        setSelected(null);

        if(currentQuestion === questions.length - 1){

            setAnswersSelected({
                ...answersSelected,
                [question_num]: 'no',
            });

            
            const finalData = {
                response: answersSelected,
                email: email,
                name: name
            };

            const answerjson = JSON.stringify(finalData);

            setIsLoading(true);
            const response = await sendAnswers(finalData);
            
            setIsLoading(false);

            props.onResponse(answerjson);
            navigate('/result');

        }

        currentQuestion < questions.length -1  && setCurrentQuestion(currentQuestion + 1);
    }

    return(
        <div className="h-screen bg-gray-200 flex  justify-center items-center">
             {isLoggedIn ? (
                <div className="flex flex-col w-4/5 ">
                    <p className=" ml-2 text-lg sm:text-xl md:text-2xl lg:text-2xl "> <span>{questions[currentQuestion].id}. </span> {questions[currentQuestion].question}</p>
                    
                    <div className="mt-7 ml-5">
                        <button
                            type="button"
                            className={`rounded  pl-4 w-48 h-10 text-left py-1 text-lg font-medium border border-blue-900 text-blue-900 ring-1 ring-inset ring-gray-300 hover:text-white hover:bg-blue-900 ${selected === 'yes' ? 'bg-blue-900 text-white' : ' bg-blue-100'}`}
                            
                            onClick={() => setSelected('yes')}
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
                            onClick={() => setSelected('no')}
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
                            className="rounded-lg bg-blue-900 pl-4 w-28 flex items-center  h-10 text-left py-1 text-lg font-bold border border-blue-900 text-white  ring-1 ring-inset ring-gray-300 "
                            onClick={() => handleNext()}
                            disabled={selected === null}
                        >
                            {isLoading ? (
                                    null
                                ): (
                                    <>

                                    NEXT <img src={arrow} alt='arrow' className='w-6 h-6 ml-2' />
                                    </>

                            )}
                        </button>
                    </div>

                </div>
             ):(
                <Login onLogin={handleLogin} onEmailChange={handleEmailChange} onNameChange={handleNameChange} />
             )}
       
    </div>
    )
}

export default Home;