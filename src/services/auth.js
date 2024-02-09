const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export async function signUp(email, password, name) {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to sign up");
    }

    const data = await response.json();
    return data; // data contains userId and token
  } catch (error) {
    console.error("Error during signup:", error);
    throw error; // Re-throw to handle it in the component
  }
}

export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log("response", response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log in");
    }

    const data = await response.json();
    return data; // data contains userId and token
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Re-throw to handle it in the component
  }
}

export const getUserData = async (token) => {
  try {
    const response = await fetch(`${API_URL}/userData`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Do not set Content-Type for FormData; it's automatically set
      },
    }); // Replace with your actual server URL
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user data");
    }
    const userData = await response.json();
    return userData; // Assuming the server response format is the user object
  } catch (error) {
    console.error("Error fetching user data:", error);
    //throw error; // Re-throw the error for handling by the caller
  }
};
