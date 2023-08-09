import React, { useEffect } from "react";
import { fetchRoutines } from "../api";
import LoadingModal from './LoadingModal';

const Routines = ({ routines, setRoutines, loading, setLoading }) => {


  useEffect(() => {
    async function getRoutines() {
      const data = await fetchRoutines()
      setRoutines(data)
      setLoading(false)

    }
    getRoutines()
  }, [])



  if (loading) {
    return <LoadingModal />
  }

  else {
    return (
      <div>
        <h1 id='routine-header'>ROUTINES</h1>
        {routines.map(routine =>
          <div id='routines' key={routine.id} value={routine}>
            <h2 id='routine-title'>ROUTINE</h2>
            <h3>Creator: {routine.creatorName}</h3>
            <h3>Name: {routine.name}</h3>
            <h3>Goal: {routine.goal}</h3>
            <h3>Routine Activities</h3>
            <div>{routine.activities.map(activity =>
              <div id='routine-activities' key={activity.id} value={activity}>
                <h3>ACTIVITY</h3>
                <h4>Activity Name: {activity.name}</h4>
                <h4>Activity Description: {activity.description}</h4>
                <h4>Count: {activity.count}</h4>
                <h4>Duration: {activity.duration}</h4>
              </div>
            )}</div>
          </div>
        )}
      </div>
    )
  }
};

export default Routines;
