// API Structure Folder for FrontEnd

// export const COHORT_NAME = "2303-FTB-ET-WEB-PT";
export const BASE_URL = `http://fitnesstrac-kr.herokuapp.com/api`;

// User Endpoints

export const registerUser = async (username, password) => {
  const maxLength = 8;
  const minLength = 7;

  if (username.length < maxLength) {
    throw new Error(`Username must be at least ${maxLength} characters long.`);
  }
  if (password.length < minLength) {
    throw new Error(`Password must be at least ${minLength} characters long.`);
  }
  let result;

  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    result = await response.json();
    console.log(result);
  } catch (err) {
    throw new Error("Register User API is down");
  }

  console.log(result);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
};

registerUser("blahblah", "blahblah");

// Activities Endpoints

// Routines Endpoints

//Routine_Activities Endpoints
