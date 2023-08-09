import React, { useState, useEffect } from 'react';
import { fetchActivities, createActivity } from '../api';
import LoadingModal from './LoadingModal';
import CommonButtons from "./Common/CommonButtons";

const Activities = ({ token, activities, setActivities, loading, setLoading }) => {
  const [showNewActivityForm, setShowNewActivityFOrm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

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
    async function getActivities() {
      const data = await fetchActivities()
      setActivities(data)
      setLoading(false)

    }
    getActivities()
  }, [])

  const handleCreateNewActivity = async (event) => {
    event.preventDefault()
    const checkForExistingActivity = activities.filter(activity => activity.name === name)
    console.log(checkForExistingActivity)
    if (checkForExistingActivity.length > 0) {
      setName('')
      setDescription('')
      return alert('Activity already exists with that name!')
    } else {
      await createActivity(name, description, token)
    }
    setName('')
    setDescription('')
    // update page with new activity added when one is created
    const updatedActivities = await fetchActivities()
    setActivities(updatedActivities)
  }

  const toggleNewActivityForm = () => {
    setShowNewActivityFOrm(!showNewActivityForm)
  }

  if (loading) {
    return <LoadingModal />;
  } else {
    return (
      <div>
        <h1 id="activityheader">Activities</h1>
        <div id="activity-pop-out">
          {token ? (
            <CommonButtons
              onClick={toggleNewActivityForm}
              className="new-activity-form-button"
              size="small"
              variant="contained"
              sx={buttonStyles}
              type="submit"
            >
              {showNewActivityForm ? "Close Form" : "Create New Activity"}
            </CommonButtons>
          ) : null}
          {showNewActivityForm && (
            <>
              <form
                onSubmit={handleCreateNewActivity}
                className="new-activity-form"
              >
                <label className="new-activity-name">
                  Name:
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="new-activity-name"
                  />
                </label>
                <label className="new-activity-description">
                  Description:
                  <input
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="new-activity-description"
                  />
                </label>
                <CommonButtons
                  className="new-activity-submit"
                  type="submit"
                  onclick={handleCreateNewActivity}
                  size="small"
                  variant="contained"
                  sx={buttonStyles}
                >
                  Create Activity
                </CommonButtons>
              </form>
            </>
          )}
        </div>
        {activities.map((activity) => (
          <div id="activities" key={activity.id} value={activity}>
            <h3 id="activitytitle">ACTIVITY</h3>
            <div>Name: {activity.name}</div>
            <div>Description: {activity.description}</div>
          </div>
        ))}
      </div>
    );
  }
};

export default Activities;