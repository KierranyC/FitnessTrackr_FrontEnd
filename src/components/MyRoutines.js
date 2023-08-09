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
  const [showModal, setShowModal] = useState(false)


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
    setShowModal(true);
  };

  const closeModal1 = () => {
    setShowModal(false);
  };

  const handleDeleteRoutine = (event, routine) => {
    deleteUserRoutine(event, routine)
    setShowModal(false);
  };

  const confirmDeleteActivity = () => {
    setShowModal(true);
  };

  const closeModal2 = () => {
    setShowModal(false);
  };

  const handleDeleteActivity = (event, activity) => {
    deleteActivity(event, activity)
    setShowModal(false);
  };

  if (loading) {
    return <LoadingModal />
  }

  else {

    return (
      <>
        <h1>My Routines</h1>
        <h2>{currentUser}</h2>
        <button onClick={toggleNewRoutineForm} className='new-routine-form-button'>{showNewRoutineForm ? 'Close Form' : 'Create New Routine'}</button>
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
            <button className='new-routine-submit' type='submit'>Create Routine</button>
          </form>
        )}
        {userRoutines.map(routine =>
          <div key={routine.id} value={routine}>
            <h2>ROUTINE</h2>
            <div>Creator: {routine.creatorName}</div>
            <div>Name: {routine.name}</div>
            <div>Goal: {routine.goal}</div>
            <h3>Routine Activities</h3>
            {routine.activities.map(activity =>
              <div key={activity.id} value={activity}>
                <h3>ACTIVITY</h3>
                <div>Name: {activity.name}</div>
                <div>Description: {activity.description}</div>
                <div>Duration: {activity.duration}</div>
                <div>Count: {activity.count}</div>
                <button onClick={toggleUpdateActivityForm} className='update-activity-form-button'>{showUpdateActivityForm ? 'Close Form' : 'Update Activity'}</button>
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
                    <button type='button' className='update-activity' onClick={event => updateActivity(event, activity)}>Update Activity</button>
                  </>
                )}
                <button type='button' className='delete-activity-button' onClick={confirmDeleteActivity}>DELETE ACTIVITY</button>
                {
                  showModal && (
                    <div className="activity-modal-background">
                      <div className="activity-modal-container">
                        <h3>Are you sure you want to delete this activity?</h3>
                        <button onClick={event => handleDeleteActivity(event, activity)} className="activity-modal-confirm">Yes</button>
                        <button onClick={closeModal2} className="activity-modal-cancel">No</button>
                      </div>
                    </div>
                  )
                }
                {/* <button type='button' className='activity-delete' onClick={event => handleDeleteActivity(event, activity)}>DELETE ACTIVITY</button> */}
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
            <button type='submit' onClick={(event) => attachActivity(event, routine, activity)} className='attach-activity-button'>Add Activity</button>
            {/* <button type='button' className='routine-delete' onClick={event => handleDeleteRoutine(event, routine)}>DELETE ROUTINE</button> */}
            <button onClick={toggleUpdateRoutineForm} className='routine-update-form'>{showUpdateRoutineForm ? 'Close Form' : 'Update Routine'}</button>
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
                <button className='update-routine-submit' type='submit'>Update Routine</button>
              </form>
            )}
            <button type='button' className='delete-routine-button' onClick={confirmDeleteRoutine}>DELETE</button>
            {
              showModal && (
                <div className="routine-modal-background">
                  <div className="routine-modal-container">
                    <h3>Are you sure you want to delete this routine?</h3>
                    <button onClick={event => handleDeleteRoutine(event, routine)} className="routine-modal-confirm">Yes</button>
                    <button onClick={closeModal1} className="routine-modal-cancel">No</button>
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
