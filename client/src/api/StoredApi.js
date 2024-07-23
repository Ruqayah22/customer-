import axios from "axios";

const storedURL = process.env.REACT_APP_SERVER_URL;

export const getProducer = async () => {
  try {
    // id = id || "";
    return await axios.get(`${storedURL}/stored`); ///${id}
  } catch (error) {
    console.log("Error while calling get Producer API", error);
  }
};

export const createProducer = async (producer) => {
  try {
    return await axios.post(`${storedURL}/stored/createProducer`, producer);
  } catch (error) {
    console.log("Error while calling add Stored Api ", error);
  }
};

export const editProducer = async (id, producer) => {
  try {
    return await axios.put(`${storedURL}/stored/${id}`, producer);
  } catch (error) {
    console.log("Error while calling edit Producer api ", error);
  }
};

export const deleteProducer = async (id) => {
  try {
    return await axios.delete(`${storedURL}/stored/${id}`);
  } catch (error) {
    console.log("Error while delete Producer api ", error);
  }
};
