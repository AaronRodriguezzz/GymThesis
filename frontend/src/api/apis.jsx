import axios from 'axios';
import { AlertPopup } from '../components/dialogs/CustomAlert';

axios.defaults.withCredentials = true;

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);

    if (response.status === 200) {
      // AlertPopup(response.data.message || 'Error Updating Data', true);
      return response.data;
    }

  } catch (error) {
    console.error('Error fetching data:', error);

  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(endpoint, data);
    
    return response.data;

  } catch (error) {
    console.log(error);
    // AlertPopup('error', error.response.data.message || 'Error Posting Data', true);
  }
};

export const updateData = async (endpoint, data) => {
  try {
    const response = await axios.put(endpoint, data);

    if (response.status === 200) {
        return response.data;
    }  

  } catch (error) {
    alert(error.data.message || 'Failed')
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(endpoint);

    if(response.status === 200){
        AlertPopup(response.data.message || 'Error Updating Data', true);
        return response.data;
    }

  } catch (error) {
    console.error('Error deleting data:', error);
    AlertPopup('error', error.response.data.message || 'Error Deleting Data', true);
  }
};