import React, { useState, useEffect } from 'react';
import { fetchActivities } from '../api';
import LoadingModal from './LoadingModal';

const Activities = ({ activities, setActivities, loading, setLoading }) => {

  useEffect(() => {
    async function getActivities() {
      const data = await fetchActivities()
      setActivities(data)
      setLoading(false)

    }
    getActivities()
  }, [])

  if (loading) {
    return <LoadingModal />
  }

  else {
    return (
      <div>
        <h1>Activities</h1>
        {activities.map(activity =>
          <div key={activity.id} value={activity}>
            <h2>ACTIVITY</h2>
            <h3>Name: {activity.name}</h3>
            <h3>Description: {activity.description}</h3>
          </div>
        )}
      </div>
    )
  }
}

export default Activities;