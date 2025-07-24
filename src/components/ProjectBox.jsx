import React from 'react';

const ProjectsBox = ({ handleSeeMyWorks }) => {
  return (
    <div className="w-[90%] h-[80%] bg-white rounded-xl shadow-xl">
      <div className="text-black cursor-pointer p-2" onClick={handleSeeMyWorks}>
        Close
      </div>
      {/* Content */}
    </div>
  );
};

export default ProjectsBox;