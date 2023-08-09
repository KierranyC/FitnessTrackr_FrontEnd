// API Structure Folder for FrontEnd
// export const COHORT_NAME = "2303-FTB-ET-WEB-PT";
export const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;
// export const BASE_URL = `https://long-leaf-2351.fly.dev/api`;
// User Endpoints
// POST - Register USER
export const registerUser = async (username, password) => {
  const maxLength = 8;
  const minLength = 7;
  if (username.length < maxLength) {
    alert(`Username must be at least ${maxLength} characters long.`);
  }
  if (password.length < minLength) {
    alert(`Password must be at least ${minLength} characters long.`);
  }
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    localStorage.setItem("token", result.token);
    console.log(result);
    return result
  } catch (error) {
    console.error(error)
  }
};
// POST - Login User
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    });
    const result = await response.json();
    localStorage.setItem("token", result.token);
    console.log(result);
    return result
  } catch (error) {
    console.error(error)
  }
};
// export const userLogin = async (username, password) => {
//   try {
//     const response = await fetch(`${BASE_URL}/users/login`, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         user: {
//           username,
//           password
//         }
//       })
//     })
//     const result = await response.json()
//     console.log(result)
//     localStorage.setItem('token', result.result.token)
//     return result
//   } catch (err) {
//     console.error(error)
//   }
// }
// GET - Personal Info - ME
export const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Couldn't fetch user data", err);
  }
};
// GET - username's routines
export const fetchUserRoutines = async (username) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
// Activities Endpoints
// GET - All Activities
export const fetchActivities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
// POST - Create New Activity
export const createActivity = async (name, description, token) => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description
      }),
    });
    const result = await response.json();
    console.log(result);
    return result.data;
  } catch (err) {
    console.error(err);
  }
};
// PATCH - Update an activity
export const updateActivity = async (activityId, name, description) => {
  let result;
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activity: {
          name,
          description,
        },
      }),
    });
    result = await response.json();
    console.log(result);
  } catch (err) {
    throw new Error("Failed to update activity");
  }
  console.log(result);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};
// GET - a list of public routines which feature that activity
export const publicRoutines = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/activities/${activityId}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    console.log(result);
    return result.data;
  } catch (err) {
    throw new Error("Failed getting activities' routines!");
  }
};
// Routines Endpoints
// GET - Fetches all routines
export const fetchRoutines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("RESULT:", result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
// POST - Create a new Routine
export const createNewRoutine = async (name, goal, isPublic, token) => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
// PATCH - update a Routine
export const updateRoutine = async (routineId, name, goal, isPublic) => {
  let result;
  try {
    const response = await fetch(`${BASE_URL}/activities/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activity: {
          name,
          goal,
          isPublic,
        },
      }),
    });
    result = await response.json();
    console.log(result);
  } catch (err) {
    throw new Error("Failed to update Routine");
  }
  console.log(result);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};
// DELETE

export const deleteRoutine = async (token, routineId) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
// POST - routines/:routineId/activities
export const attachActivityToRoutine = async (token, routineId, activityId, count, duration) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routines/${routineId}/activities`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityId,
          count,
          duration
        })
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
// Routine_Activities Endpoints
// PATCH - update a Routine_activity
export const updateRoutineActivity = async (
  routineActivityId,
  count,
  duration
) => {
  let result;
  try {
    const response = await fetch(
      `${BASE_URL}/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          routine_activity: {
            count,
            duration,
          },
        }),
      }
    );
    result = await response.json();
    console.log(result);
  } catch (err) {
    throw new Error("Failed to update Routine Activity");
  }
  console.log(result);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};
// DELETE - Delete a routine_activity
export const deleteRoutineActivity = async (token, routineActivityId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    console.error(error);
  }
};






















