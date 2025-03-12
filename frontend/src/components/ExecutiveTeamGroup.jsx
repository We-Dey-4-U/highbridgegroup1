import React from "react";
import "./Team.css";

// Importing images
import hrImage from "../assets/hr.jpg";
import gmImage from "../assets/gm.jpg";
import mdImage from "../assets/md.jpg"; // Correct path for MD
import edImage from "../assets/ed.jpg"; // Correct path for ED

// Executive members array with names and roles
const executiveMembers = [
    { name: "Engr. Olawale Popoola", role: "Managing Director", company: "HighbridgeGroup", image: mdImage }, // Correct path for MD 
    { name: "Mrs.Busayo Popoola", role: "Executive Director", company: "HighbridgeGroup", image: edImage }, // Correct path for ED 
    { name: "Mr.Suleiman David", role: "General Manager", company: "HighbridgeGroup", image: gmImage }, // Correct path for GM 
    { name: "Miss. Lilian Ezenwanagu", role: "Human Resource Manager", company: "HighbridgeGroup", image: hrImage }, // Correct path for HR
    
];

const ExecutiveTeamGroup = () => {
  return (
    <div className="team-container">
      <h2 className="team-title">Executive Team</h2>
      <div className="team-grid">
        {executiveMembers.map((member) => (
          <div key={member.role} className="team-card">
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
      {/* View All Staff Button */}
      <div className="team-button-container">
        <a href="/all-teams" className="team-button">
          View All Staff
        </a>
      </div>
    </div>
  );
};

export default ExecutiveTeamGroup;