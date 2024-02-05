// url = ""
import axios from 'axios';

export const downloadPdf = async (email) => {
  try {
    console.log("downloadPdf email", email)
    const response = await axios.get("https://pdf-service-loev.onrender.com/view/", 
        { 
          email: email
        }
      );

    console.log('Response:', response);
    return response.data;

  } catch (error) {
    console.error('Error downloading pdf:', error);
  }
};