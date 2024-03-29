

const Login = ({ onLogin, onEmailChange, onNameChange  }) => {

    return (
        <div className="flex justify-center items-center h-screen shadow-xl my-24 p-24">
            <div>

                <h1 className="text-lg font-bold text-center mb-2 text-gray-500">Weight Loss Quiz</h1>
                <h1 className="text-4xl text-center mb-7 text-blue-900">Welcome!</h1>
            
               <div className="w-full  items-center">
                    <label htmlFor="name" className="block text-lg font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="relative mt-2">
                        <input
                        type="text"
                        name="name"
                        id="name"
                        className="peer block w-full h-14 pl-4 border-0 bg-blue-50 py-1.5 text-gray-900  sm:text-sm sm:leading-6"
                        placeholder="Full name"
                        onChange={(e) => onNameChange(e.target.value)}
                        />
                        <div
                        className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                        aria-hidden="true"
                        />
                    </div>
                </div>

                <div className="w-full mt-7 items-center">
                    <label htmlFor="name" className="block text-lg font-medium leading-6 text-gray-900">
                        Email
                    </label>
                    <div className="relative mt-2">
                        <input
                        type="email"
                        name="email"
                        id="email"
                        className="peer block w-full h-14 pl-4 border-0 bg-blue-50 py-1.5 text-gray-900  sm:text-sm sm:leading-6"
                        placeholder="Email"
                        onChange={(e) => onEmailChange(e.target.value)} 
                        />
                        <div
                        className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                        aria-hidden="true"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    className="rounded-md ml-44 mt-14 bg-blue-900 px-10 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    onClick={onLogin}
                >
                    Submit
                </button>
                
            </div>
        </div>
    )
}

export default Login;