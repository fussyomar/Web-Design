import React, { useState, useEffect } from "react";
import "./VolunteerMatching.css";

const VolunteerMatching = () => {
  const [people, setPeople] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [availableTasks, setAvailableTasks] = useState([]);

  // Initial fetch from localStorage
  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("volunteers")) || [];
    const t = JSON.parse(localStorage.getItem("events")) || [];

    setPeople(p);
    setTasks(t);
  }, []);

  // Match logic moved to separate function
  const filterMatchingTasks = (person) => {
    return tasks.filter(t =>
      t.requiredSkills.some(skill => person.skills.includes(skill))
    );
  };

  const onPersonSelect = (identifier) => {
    const found = people.find(p => p.email === identifier);
    if (!found) return;

    setCurrentPerson(found);
    const matched = filterMatchingTasks(found);
    setAvailableTasks(matched);
  };

  const assignToTask = (taskLabel) => {
    if (!currentPerson) {
      alert("Please pick a person first.");
      return;
    }
    alert(`${currentPerson.fullName} will now help with ${taskLabel}`);
  };

  return (
    <div className="volunteer-matching-container">
      <h2>Assign Volunteers to Events</h2>

      {/* Volunteer selector */}
      <div className="volunteer-dropdown">
        <label>Choose a Person:</label>
        <select onChange={e => onPersonSelect(e.target.value)}>
          <option value="">-- Select --</option>
          {people.map(({ email, fullName }) => (
            <option key={email} value={email}>{fullName}</option>
          ))}
        </select>
      </div>

      {/* Details and matching */}
      {currentPerson && (
        <div className="volunteer-card">
          <h3>{currentPerson.fullName}</h3>
          <p>Known Skills: {currentPerson.skills.join(", ")}</p>

          <div className="matching-events">
            <h4>Potential Events:</h4>
            <select onChange={e => assignToTask(e.target.value)}>
              <option value="">-- Pick Event --</option>
              {availableTasks.map(({ eventName, requiredSkills }) => (
                <option key={eventName} value={eventName}>
                  {eventName} (Needs: {requiredSkills.join(", ")})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerMatching;


