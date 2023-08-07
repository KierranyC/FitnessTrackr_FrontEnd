// API Structure Folder for FrontEnd

// export const COHORT_NAME = "2303-FTB-ET-WEB-PT";
export const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;
// export const BASE_URL = `https://long-leaf-2351.fly.dev/api`;


// User Endpoints

// export const registerUser = async (username, password) => {
//   const maxLength = 8;
//   const minLength = 7;

//   if (username.length < maxLength) {
//     alert(`Username must be at least ${maxLength} characters long.`);
//   }
//   if (password.length < minLength) {
//     alert(`Password must be at least ${minLength} characters long.`);
//   }
//   // let result;

//   try {
//     const response = await fetch(`${BASE_URL}/users/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           username,
//           password,
//         },
//       }),
//     });
//     const result = await response.json();
// localStorage.setItem('token', result.result.token)
//     console.log(result);
//     return result;
//   } catch (err) {
//     alert("Register User API is down");
//   }

//   // if (!result.success) {
//   //   throw new Error(result.error.message);
//   // }

//   // console.log(result)
//   // return result.data;
// };

// registerUser("blahblah", "blahblah");

export const userLogin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })
    const result = await response.json()
    console.log(result)
    localStorage.setItem('token', result.result.token)
    return result
  } catch (err) {
    console.error(error)
  }
}

export const fetchUserData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const fetchUserRoutines = async (username) => {

  try {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

// Activities Endpoints

export const createNewActivity = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

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

export const createNewRoutine = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic
      })
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
