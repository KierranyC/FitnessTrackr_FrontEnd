// API Structure Folder for FrontEnd

// export const COHORT_NAME = "2303-FTB-ET-WEB-PT";
export const BASE_URL = `http://fitnesstrac-kr.herokuapp.com/api`;

// User Endpoints

export const registerUser = async (username, password) => {
  const maxLength = 8;
  const minLength = 7;

  if (username.length < maxLength) {
    alert(`Username must be at least ${maxLength} characters long.`);
  }
  if (password.length < minLength) {
    alert(`Password must be at least ${minLength} characters long.`);
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
    localStorage.setItem('token', result.result.token)
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

// registerUser("blahblah", "blahblah");

// Activities Endpoints

// Routines Endpoints

export const fetchRoutines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    console.log("RESULT:", result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const fetchActivities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

// export const fetchRoutinesWithActivity = async (activityId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const result = await response.json();
//     console.log(result);
//     return result
//   } catch (err) {
//     console.error(err);
//   }
// }

// Routine_Activities Endpoints
