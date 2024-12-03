import React from 'react';
import RequirementsForm from '../RequirementsForm';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <RequirementsForm
        onSubmit={async (requirements) => {
          // Form submission is now handled directly in RequirementsForm
        }}
      />
    </div>
  );
}