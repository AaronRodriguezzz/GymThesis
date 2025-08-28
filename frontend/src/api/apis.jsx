import axios from 'axios';
import { AlertPopup } from '../components/dialogs/CustomAlert';
// Set Authorization header if token exists
const token = localStorage.getItem('token');

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);

    if (response.status === 200) {
      // AlertPopup(response.data.message || 'Error Updating Data', true);
      return response.data;
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    AlertPopup('error', error.response.data.message || 'Error Getting Data', true);

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
        AlertPopup(response.data.message || 'Error Updating Data', true);
        return response.data;
    }  

  } catch (error) {
    console.error('Error updating data:', error);
    AlertPopup('error', error.response.data.message || 'Error Updating Data', true);
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