import React from 'react';

const GenderCheckbox = ({ selectedGender, onGenderChange }) => {
  return (
    <div className="mt-4">
      <label className="block text-gray-700">Gender</label>
      <div className="mt-2 space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={selectedGender === 'male'}
            onChange={(e) => onGenderChange(e.target.value)}
            className="form-radio"
          />
          <span className="ml-2">Male</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={selectedGender === 'female'}
            onChange={(e) => onGenderChange(e.target.value)}
            className="form-radio"
          />
          <span className="ml-2">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
