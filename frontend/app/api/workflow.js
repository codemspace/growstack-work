import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const startWorkflow = async (inputData) => {
  const { data } = await axios.post(`${API_BASE_URL}/start-workflow`, inputData);
  return data;
};
