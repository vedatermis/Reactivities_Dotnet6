import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import Activity from "../models/activity";
import NavBar from "./NarBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    axios.get("http://localhost:5000/api/Activities").then((response) => {
      setActivities(response.data);
    });
  }, []);

  function handleSelectedActivity(id: string) {
      setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectedActivity() {
      setSelectedActivity(undefined);
  }

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard activities={activities} selectedActivity={selectedActivity} selectActivity={handleSelectedActivity} cancelSelectActivity={handleCancelSelectedActivity} />
      </Container>
    </Fragment>
  );
}

export default App;
