import React, { useState, useEffect } from 'react';
import { fetchActivities, createActivity } from '../api';
import LoadingModal from './LoadingModal';

const Activities = ({ token, activities, setActivities, loading, setLoading }) => {
  const [showNewActivityForm, setShowNewActivityFOrm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    async function getActivities() {
      const data = await fetchActivities()
      setActivities(data)
      setLoading(false)

    }
    getActivities()
  }, [])

  const handleCreateNewActivity = async (event) => {
    event.preventDefault()
    await createActivity(name, description, token)
    // update page with new activity added when one is created
  }

  const toggleNewActivityForm = () => {
    setShowNewActivityFOrm(!showNewActivityForm)
  }

  if (loading) {
    return <LoadingModal />
  }

  else {
    return (
      <div>
        <h1>Activities</h1>
        {token ? (
          <button onClick={toggleNewActivityForm} className='new-activity-form-button'>{showNewActivityForm ? 'Close Form' : 'Create New Activity'}</button>
        ) : null}
        {showNewActivityForm && (
          <>
            <form onSubmit={handleCreateNewActivity} className='new-activity-form'>
              <label className='new-activity-name'>
                Name:
                <input type='text' value={name} onChange={(event) => setName(event.target.value)} className='new-activity-name' />
              </label>
              <label className='new-activity-description'>
                Description:
                <input type='text' value={description} onChange={(event) => setDescription(event.target.value)} className='new-activity-description' />
              </label>
              <button className='new-activity-submit' type='submit'>Create Activity</button>
            </form>
          </>
        )}
        {activities.map(activity =>
          <div key={activity.id} value={activity}>
            <h3>ACTIVITY</h3>
            <div>Name: {activity.name}</div>
            <div>Description: {activity.description}</div>
          </div>
        )}
      </div>
    )
  }
}

export default Activities;