import React, { useState, useEffect } from 'react';
import { fetchUserRoutines, fetchUserData, createNewRoutine, fetchActivities, attachActivityToRoutine, deleteRoutine } from '../api';
import LoadingModal from './LoadingModal';

const MyRoutines = ({ currentUser, setCurrentUser, loading, setLoading, token, userRoutines, setUserRoutines }) => {
  const [showNewRoutineForm, setShowNewRoutineForm] = useState(false)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [activity, setActivity] = useState(null)
  const [activityList, setActivityList] = useState([])
  const [count, setCount] = useState('')
  const [duration, setDuration] = useState('')

  useEffect(() => {
    async function fetchMyData() {
      const data = await fetchUserData(token);
      const data1 = await fetchUserRoutines(data.username, token)
      const data3 = await fetchActivities()
      setActivityList(data3)
      setCurrentUser(data.username)
      setUserRoutines(data1)
      setLoading(false)
    }
    fetchMyData()
  }, [])

  const handleCreateNewRoutine = async (event) => {
    event.preventDefault()
    await createNewRoutine(name, goal, isPublic, token)
  }

  const attachActivity = async (event, routine) => {
    event.preventDefault()
    await attachActivityToRoutine(token, routine.id, activity, count, duration)
  }

  const handleDelete = async (event, routine) => {
    event.preventDefault()
    await deleteRoutine(token, routine.id)
    const updatedRoutines = userRoutines.filter(userRoutine =>
      userRoutine.id !== routine.id)
    setUserRoutines(updatedRoutines)
  }

  const toggleNewRoutineForm = () => {
    setShowNewRoutineForm(!showNewRoutineForm)
  }

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
              {activityList.map((activity) => (<option key={activity.id} value={activity.id}>{activity.name}</option>))}
            </select>
            <label>
              Count:
              <input type="number" value={count} onChange={(event) => setCount(event.target.value)} />
            </label>
            <label>
              Duration:
              <input type="number" value={duration} onChange={(event) => setDuration(event.target.value)} />
            </label>
            <button type='submit' onClick={(event) => attachActivity(event, routine)} className='attach-activity-button'>Add Activity</button>
            <button type='button' className='routine-delete' onClick={event => handleDelete(event, routine)}>DELETE</button>
          </div>
        )}
      </>
    )
  }
}

export default MyRoutines;
