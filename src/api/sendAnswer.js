import axios from 'axios';

export const sendAnswers = async (answersSelected) => {
  try {
    console.log(answersSelected)
    const response = await axios.post('api', answersSelected);
    console.log('Response:', response);
    return response.data;
    
  } catch (error) {
    console.error('Error sending answers:', error);
  }
};