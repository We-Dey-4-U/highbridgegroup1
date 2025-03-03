import React from "react";
import "./Team.css";

const allTeamMembers = [
  { name: "Team A Member 1", role: "Developer", company: "HighbridgeGroup", image: "/images/member1.jpg" },
  { name: "Team A Member 2", role: "Designer", company: "HighbridgeGroup", image: "/images/member2.jpg" },
  { name: "Team B Member 1", role: "Analyst", company: "HighbridgeGroup", image: "/images/member3.jpg" },
  { name: "Team B Member 2", role: "Tester", company: "HighbridgeGroup", image: "/images/member4.jpg" },
  { name: "Team C Member 1", role: "Manager", company: "HighbridgeGroup", image: "/images/member5.jpg" },
  { name: "Team C Member 2", role: "Support", company: "HighbridgeGroup", image: "/images/member6.jpg" },
  { name: "Team C Member 1", role: "Manager", company: "HighbridgeGroup", image: "/images/member5.jpg" },
  { name: "Team C Member 2", role: "Support", company: "HighbridgeGroup", image: "/images/member6.jpg" },
  { name: "Team C Member 1", role: "Manager", company: "HighbridgeGroup", image: "/images/member5.jpg" },
  { name: "Team C Member 2", role: "Support", company: "HighbridgeGroup", image: "/images/member6.jpg" },
  { name: "Team C Member 1", role: "Manager", company: "HighbridgeGroup", image: "/images/member5.jpg" },
  { name: "Team C Member 2", role: "Support", company: "HighbridgeGroup", image: "/images/member6.jpg" },
];

const AllTeams = () => {
  return (
    <div className="team-container">
      <h2 className="team-title">All Teams</h2>
      <div className="team-grid">
        {allTeamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img
              src={member.image}
              alt={member.name}
              className="team-image"
            />
            <h3 className="team-name">{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <p className="team-company">{member.company}</p> {/* Added company name */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTeams;