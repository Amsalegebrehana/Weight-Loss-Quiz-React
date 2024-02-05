import axios from 'axios';

export const sendAnswers = async (answersSelected) => {

  try {
    console.log("####here")
    
    console.log("answersSelected",answersSelected);
    
    const response = await axios.post('https://pdf-service-loev.onrender.com/insert/', 
      {
        response: answersSelected.response,
        email: answersSelected.email,
        name: answersSelected.name
      }
      );
    
    console.log('Response: axios', response);

    return response;
    
  } catch (error) {
    console.log('Error sending answers:', error);
    console.error('Error sending answers:', error);
  }
};