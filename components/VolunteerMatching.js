import React, { useState, useEffect } from "react";
import './VolunteerMatching.css';

const VolunteerMatching = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [matchedEvents, setMatchedEvents] = useState([]);

    useEffect(() => {
        const storedVolunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        setVolunteers(storedVolunteers);
        setEvents(storedEvents);
    }, []);

    const handleVolunteerSelect = (email) => {
        const volunteer = volunteers.find(v => v.email === email);
        setSelectedVolunteer(volunteer);

        if (volunteer) {
            const matched = events.filter(event =>
                event.requiredSkills.some(skill => volunteer.skills.includes(skill))
            );
            setMatchedEvents(matched);
        }
    };

    const handleMatchVolunteer = (eventName) => {
        if (!selectedVolunteer) {
            alert("Select a volunteer first.");
            return;
        }

        alert(`${selectedVolunteer.fullName} assigned to ${eventName}`);
    };

    return (
        <div className="container">
            <h2 className="title">Volunteer Matching</h2>

            <div className="dropdown">
                <label className="label">Select a Volunteer:</label>
                <select className="select" onChange={(e) => handleVolunteerSelect(e.target.value)}>
                    <option value="">-- Choose a Volunteer --</option>
                    {volunteers.map((vol) => (
                        <option key={vol.email} value={vol.email}>
                            {vol.fullName}
                        </option>
                    ))}
                </select>
            </div>

            {selectedVolunteer && (
                <div className="card">
                    <h3>{selectedVolunteer.fullName}</h3>
                    <p><strong>Skills:</strong> {selectedVolunteer.skills.join(", ")}</p>

                    <div className="dropdown">
                        <label className="label">Matching Events:</label>
                        <select className="select" onChange={(e) => handleMatchVolunteer(e.target.value)}>
                            <option value="">-- Choose an Event --</option>
                            {matchedEvents.map((event) => (
                                <option key={event.eventName} value={event.eventName}>
                                    {event.eventName} - Skills: {event.requiredSkills.join(", ")}
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


