import React, { useState, useEffect } from 'react';


const MyRoutines = ({ currentUser, setCurrentUser, loading, setLoading, token, userRoutines, setUserRoutines }) => {
  const [showNewRoutineForm, setShowNewRoutineForm] = useState(false)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

  useEffect(() => {
    async function fetchMyData() {
      // const data = await fetchUserData();
      const data1 = await fetchUserRoutines()
      const data3 = await fetchActivities()
      // setCurrentUser(data1.creatorName)
      // setUserRoutines(data1)
      // setLoading(false)
    }
    fetchMyData()
  }, [])

  const handleCreateNewRoutine = async (event) => {
    event.preventDefault()
    await createNewRoutine(name, goal)
  }

  const toggleNewRoutineForm = () => {
    setShowNewRoutineForm(!showNewRoutineForm)
  }


  return (
    <>
      <h1>My Routines</h1>
      <button onClick={toggleNewRoutineForm} className='new-routine-form-button'>{showNewRoutineForm ? 'Close Form' : 'Create New Routine'}</button>
      {showNewRoutineForm && (
        <form onSubmit={handleCreateNewRoutine} className='new-routine-form'>
          <label className='new routine-name'>
            Name:
            <input type='text' value={name} onChange={(event) => setName(event.target.value)} className='new-routine-name' />
          </label>
          <label className='new routine-goal'>
            Goal:
            <input type='text' value={goal} onChange={(event) => setGoal(event.target.value)} className='new-routine-goal' />
          </label>
          <button className='new-routine-submit' type='submit'>Create Routine</button>
        </form>
      )}
      {/* map through current user's routines and display them
      also add delete button, update options, and options to add activities, and on
      each activity add options to update count and duration, and delete button to
      remove them from the routine */}
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
        </div>
      )}
    </>
  )

}

export default MyRoutines;

