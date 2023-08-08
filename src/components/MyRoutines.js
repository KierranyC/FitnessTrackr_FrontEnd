import React, { useState, useEffect } from 'react';
import { fetchUserRoutines, fetchUserData, createNewRoutine, fetchActivities, attachActivityToRoutine } from '../api';

const MyRoutines = ({ currentUser, setCurrentUser, loading, setLoading, token, userRoutines, setUserRoutines }) => {
  const [showNewRoutineForm, setShowNewRoutineForm] = useState(false)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [activity, setActivity] = useState('any')
  const [activityList, setActivityList] = useState([])

  // const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchMyData() {
      const data = await fetchUserData(token);
      // const username = data.username
      const data1 = await fetchUserRoutines(data.username, token)
      console.log('DATA1!!!!', data1)
      const data3 = await fetchActivities()
      setActivityList(data3)
      setCurrentUser(data.userame)
      setUserRoutines(data1)
      // setLoading(false)
    }
    fetchMyData()
  }, [])

  const handleCreateNewRoutine = async (event) => {
    event.preventDefault()
    await createNewRoutine(name, goal, isPublic, token)
  }

  const attachActivity = async (event) => {
    event.preventDefault()
    await attachActivityToRoutine(activity.id, token)
  }

  const toggleNewRoutineForm = () => {
    setShowNewRoutineForm(!showNewRoutineForm)
  }


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
      {/* map through current user's routines and display them,
      also add delete buttons, update options, and drop down menu to add activities, and on
      each activity add options to update count and duration, and delete button to
      remove them from the routine */}
      {userRoutines.map(routine =>
        <>
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
          </div>
          <label htmlFor="select-activity">Activity <span className="activity-count">({activityList.length})</span></label>
          <select
            name="activity"
            id="select-activity"
            value={activity}
            onChange={(event) => setActivity(event.target.value)}>
            <option value="any">Any</option>
            {/* fix drop down list for adding activities! */}
            {activityList.map((activity) => (<option key={activity.id} value={activity.name}>{activity.name}</option>))}
          </select>
          <button className='attach-activity' onClick>Add Activity</button>
        </>
      )}
    </>
  )

}

export default MyRoutines;

