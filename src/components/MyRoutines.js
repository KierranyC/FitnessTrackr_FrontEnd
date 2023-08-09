import React, { useState, useEffect } from 'react';
import {
  fetchUserRoutines,
  fetchUserData,
  createNewRoutine,
  fetchActivities,
  attachActivityToRoutine,
  deleteRoutine,
  deleteRoutineActivity,
  fetchRoutines,
  updateRoutine,
  updateRoutineActivity
} from '../api';
import LoadingModal from './LoadingModal';
import CommonButtons from "./Common/CommonButtons";


const MyRoutines = ({ currentUser, setCurrentUser, loading, setLoading, token, userRoutines, setUserRoutines }) => {
  const [showNewRoutineForm, setShowNewRoutineForm] = useState(false)
  const [showUpdateRoutineForm, setShowUpdateRoutineForm] = useState(false)
  const [showUpdateActivityForm, setShowUpdateActivityForm] = useState(false)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [activity, setActivity] = useState(null)
  const [activityList, setActivityList] = useState([])
  const [count, setCount] = useState('')
  const [duration, setDuration] = useState('')
  const [showModal1, setShowModal1] = useState(false)
  const [showModal2, setShowModal2] = useState(false)


  const buttonStyles = {
    fontSize: 12,
    fontWeight: 700,
    color: "darkred",
    border: "2px solid black",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  };

  useEffect(() => {
    async function fetchMyData() {
      const data = await fetchUserData(token);
      const data1 = await fetchUserRoutines(data.username, token)
      const data3 = await fetchActivities()
      setCurrentUser(data.username)
      setUserRoutines(data1)
      setActivityList(data3)
      setLoading(false)
    }
    fetchMyData()
  }, [])

  const handleCreateNewRoutine = async (event) => {
    event.preventDefault()
    const allPublicRouties = await fetchRoutines()
    const checkForExistingRoutineName = allPublicRouties.filter(routine => routine.name === name)
    console.log(checkForExistingRoutineName)
    if (checkForExistingRoutineName.length > 0) {
      setName('')
      setGoal('')
      setIsPublic(false)
      return alert('Routine name already exists! Please choose another one!')
    } else {
      await createNewRoutine(name, goal, isPublic, token)
    }
    setName('')
    setGoal('')
    setIsPublic(false)
    const updatedData = await fetchUserRoutines(currentUser, token);
    setUserRoutines(updatedData)
  }

  const handleUpdateRoutine = async (event, routine) => {
    event.preventDefault()
    const allPublicRouties = await fetchRoutines()
    const checkForExistingRoutineName = allPublicRouties.filter(routine => routine.name === name)
    console.log(checkForExistingRoutineName)
    if (checkForExistingRoutineName.length > 0) {
      setName('')
      setGoal('')
      setIsPublic(false)
      return alert('Routine name already exists! Please choose another one!')
    } else {
      await updateRoutine(token, routine.id, name, goal, isPublic)
    }
    setName('')
    setGoal('')
    setIsPublic(false)
    setShowUpdateRoutineForm(!showUpdateRoutineForm)
    const updatedData = await fetchUserRoutines(currentUser, token);
    setUserRoutines(updatedData)
  }

  const attachActivity = async (event, routine, activity) => {
    event.preventDefault()
    await attachActivityToRoutine(token, routine.id, activity, count, duration)
    setActivity(null)
    setCount('')
    setDuration('')
    const updatedData = await fetchUserRoutines(currentUser, token);
    setUserRoutines(updatedData)
  }

  const updateActivity = async (event, activity) => {
    event.preventDefault()
    await updateRoutineActivity(token, activity.routineActivityId, count, duration)
    setCount('')
    setDuration('')
    setShowUpdateActivityForm(!showUpdateActivityForm)
    const updatedData = await fetchUserRoutines(currentUser, token);
    setUserRoutines(updatedData)
  }

  const deleteUserRoutine = async (event, routine) => {
    event.preventDefault()
    await deleteRoutine(token, routine.id)
    const updatedRoutines = userRoutines.filter(userRoutine =>
      userRoutine.id !== routine.id)
    setUserRoutines(updatedRoutines)
  }

  const deleteActivity = async (event, activity) => {
    event.preventDefault();
    await deleteRoutineActivity(token, activity.routineActivityId);
    const updatedRoutines = userRoutines.map(userRoutine => {
      if (userRoutine.id === activity.routineId) {
        const updatedActivities = userRoutine.activities.filter(routineActivity => routineActivity.id !== activity.id);
        return { ...userRoutine, activities: updatedActivities };
      }
      return userRoutine;
    });
    setUserRoutines(updatedRoutines);
  };


  const toggleNewRoutineForm = () => {
    setShowNewRoutineForm(!showNewRoutineForm)
  }

  const toggleUpdateRoutineForm = () => {
    setShowUpdateRoutineForm(!showUpdateRoutineForm)
  }

  const toggleUpdateActivityForm = () => {
    setShowUpdateActivityForm(!showUpdateActivityForm)
  }

  const confirmDeleteRoutine = () => {
    setShowModal1(true);
  };

  const closeModal1 = () => {
    setShowModal1(false);
  };

  const handleDeleteRoutine = (event, routine) => {
    deleteUserRoutine(event, routine)
    setShowModal1(false);
  };

  const confirmDeleteActivity = () => {
    setShowModal2(true);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };

  const handleDeleteActivity = (event, activity) => {
    deleteActivity(event, activity)
    setShowModal2(false);
  };

  if (loading) {
    return <LoadingModal />
  }

  else {

    return (
      <>
        <h1 id='user-routines-header'>My Routines</h1>
        <h2 id='profile-username'>{currentUser}</h2>
        <div id='routine-pop-out'>
          <CommonButtons onClick={toggleNewRoutineForm}
            size="small"
            variant="contained"
            sx={buttonStyles}
            className='new-routine-form-button'>
            {showNewRoutineForm ? 'Close Form' : 'Create New Routine'}
          </CommonButtons>
          {showNewRoutineForm && (
            <form onSubmit={handleCreateNewRoutine} className='new-routine-form'>
              <label className='new-routine-name'>
                Name:
                <input type='text' value={name} onChange={(event) => setName(event.target.value)} className='new-routine-name' />
              </label>
              <label className='new-routine-goal'>
                Goal:
                <input type='text' value={goal} onChange={(event) => setGoal(event.target.value)} className='new-routine-goal' />
              </label>
              <label className='new-routine-public'>
                Public?
                <input type='checkbox' checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)} className='routine-public-input' />
              </label>
              <CommonButtons
                size="small"
                variant="contained"
                sx={buttonStyles}
                className='new-routine-submit' type='submit'>Create Routine</CommonButtons>
            </form>
          )}
        </div>
        {userRoutines.map(routine =>
          <div id='user-routines' key={routine.id} value={routine}>
            <h2>ROUTINE</h2>
            <div>Creator: {routine.creatorName}</div>
            <div>Name: {routine.name}</div>
            <div>Goal: {routine.goal}</div>
            <h3>Routine Activities</h3>
            {routine.activities.map(activity =>
              <div id='user-routine-activities' key={activity.id} value={activity}>
                <h3>ACTIVITY</h3>
                <div>Name: {activity.name}</div>
                <div>Description: {activity.description}</div>
                <div>Duration: {activity.duration}</div>
                <div>Count: {activity.count}</div>
                <CommonButtons
                  size="small"
                  variant="contained"
                  sx={buttonStyles}
                  onClick={toggleUpdateActivityForm} className='update-activity-form-button'>{showUpdateActivityForm ? 'Close Form' : 'Update Activity'}</CommonButtons>
                {showUpdateActivityForm && (
                  <>
                    <label>
                      Count:
                      <input type="number" value={count} onChange={(event) => setCount(event.target.value)} />
                    </label>
                    <label>
                      Duration:
                      <input type="number" value={duration} onChange={(event) => setDuration(event.target.value)} />
                    </label>
                    <CommonButtons
                      size="small"
                      variant="contained"
                      sx={buttonStyles}
                      type='button' className='update-activity' onClick={event => updateActivity(event, activity)}>Update Activity</CommonButtons>
                  </>
                )}
                <CommonButtons
                  size="small"
                  variant="contained"
                  sx={buttonStyles}
                  type='button' className='delete-activity-button' onClick={confirmDeleteActivity}>DELETE ACTIVITY</CommonButtons>
                {
                  showModal2 && (
                    <div className="activity-modal-background">
                      <div className="activity-modal-container">
                        <h3>Are you sure you want to delete this activity?</h3>
                        <CommonButtons
                          size="small"
                          variant="contained"
                          sx={buttonStyles}
                          onClick={event => handleDeleteActivity(event, activity)} className="activity-modal-confirm">Yes</CommonButtons>
                        <CommonButtons
                          size="small"
                          variant="contained"
                          sx={buttonStyles}
                          onClick={closeModal2} className="activity-modal-cancel">No</CommonButtons>
                      </div>
                    </div>
                  )
                }
              </div>
            )}
            <select
              name="activity"
              id="select-activity"
              value={activity ? activity : ''}
              onChange={(event) => {
                setActivity(event.target.value)
              }}>
              <option value="any">Any</option>
              {activityList.filter(activity => routine.activities.every(routineActivity => routineActivity.id !== activity.id))
                .map((activity) => (<option key={activity.id} value={activity.id}>{activity.name}</option>))}
            </select>
            <label>
              Count:
              <input type="number" value={count} onChange={(event) => setCount(event.target.value)} />
            </label>
            <label>
              Duration:
              <input type="number" value={duration} onChange={(event) => setDuration(event.target.value)} />
            </label>
            <CommonButtons
              size="small"
              variant="contained"
              sx={buttonStyles}
              type='submit' onClick={(event) => attachActivity(event, routine, activity)} className='attach-activity-button'>Add Activity</CommonButtons>
            <CommonButtons
              size="small"
              variant="contained"
              sx={buttonStyles}
              onClick={toggleUpdateRoutineForm} className='routine-update-form'>{showUpdateRoutineForm ? 'Close Form' : 'Update Routine'}</CommonButtons>
            {showUpdateRoutineForm && (
              <form onSubmit={event => handleUpdateRoutine(event, routine)} className='update-routine-form'>
                <label className='update-routine-name'>
                  Name:
                  <input type='text' value={name} onChange={(event) => setName(event.target.value)} className='update-routine-name' />
                </label>
                <label className='update-routine-goal'>
                  Goal:
                  <input type='text' value={goal} onChange={(event) => setGoal(event.target.value)} className='update-routine-goal' />
                </label>
                <label className='update-routine-public'>
                  Public?
                  <input type='checkbox' checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)} className='routine-public-update' />
                </label>
                <CommonButtons
                  size="small"
                  variant="contained"
                  sx={buttonStyles}
                  className='update-routine-submit' type='submit'>Update Routine</CommonButtons>
              </form>
            )}
            <CommonButtons
              size="small"
              variant="contained"
              sx={buttonStyles}
              type='button' className='delete-routine-button' onClick={confirmDeleteRoutine}>DELETE ROUTINE</CommonButtons>
            {
              showModal1 && (
                <div className="routine-modal-background">
                  <div className="routine-modal-container">
                    <h3>Are you sure you want to delete this routine?</h3>
                    <CommonButtons
                      size="small"
                      variant="contained"
                      sx={buttonStyles}
                      onClick={event => handleDeleteRoutine(event, routine)} className="routine-modal-confirm">Yes</CommonButtons>
                    <CommonButtons
                      size="small"
                      variant="contained"
                      sx={buttonStyles}
                      onClick={closeModal1} className="routine-modal-cancel">No</CommonButtons>
                  </div>
                </div>
              )
            }
          </div>
        )}
      </>
    )
  }
}

export default MyRoutines;
