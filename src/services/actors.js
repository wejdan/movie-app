//import {getFirebaseApp} from '../firebaseHelper';

const URL = `${process.env.REACT_APP_API_URL}/actors`;

export const searchActors = async (inputValue) => {
  try {
    const response = await fetch(`${URL}/search?query=${inputValue}`);
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    // No need to transform the data here if it's already in the correct format
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const getAllActors = async (signal, searchQuery = "", page = 1) => {
  console.log(signal, searchQuery, page);
  const params = new URLSearchParams({
    query: searchQuery,
    page,
  });
  try {
    const response = await fetch(`${URL}?${params.toString()}`, { signal }); // Replace with your actual server URL
    if (!response.ok) {
      throw new Error("Failed to fetch actors: " + response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return data; // Assuming the server response format is { users: [...] }
  } catch (error) {
    console.error("Error fetching actors:", error);
    throw error; // Re-throw the error for handling by the caller
  }
};
export const deleteActor = async (token, actorId) => {
  try {
    const response = await fetch(`${URL}/${actorId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for authorization
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message || "Failed to delete actor");
      error.status = response.status; // Add the status code to the error object
      throw error;
    }

    return await response.json(); // This should return a message confirming the deletion
  } catch (error) {
    console.error("Error deleting place:", error);
    throw error; // Propagate the error to be handled where the function is called
  }
};

export const addActor = async (token, ActorData) => {
  console.log(token, ActorData);
  const { name, profile, gender, about } = ActorData;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("gender", gender);

  formData.append("about", about);
  if (profile) {
    formData.append("profile", profile);
  }

  try {
    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message || "Failed to create actor");
      error.status = response.status; // Add the status code to the error object
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Status:", error.status);
    throw error; // This error now includes the status code
  }
};

export const editActor = async (token, { actorId, actorData }) => {
  const formData = new FormData();
  // Loop through each key in actorData object
  // Loop through the updatedactorData and append each key-value pair to formData
  Object.keys(actorData).forEach((key) => {
    formData.append(key, actorData[key]);
  });
  try {
    const response = await fetch(`${URL}/${actorId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Sending the form data
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message || "Failed to update actor");
      error.status = response.status; // Add the status code to the error object
      throw error;
    }

    const data = await response.json();
    return data; // Assuming the server response format includes the created place
  } catch (error) {
    console.error("Error creating actor:", error);
    throw error; // Re-throw to handle it in the component
  }
};
