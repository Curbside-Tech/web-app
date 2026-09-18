import React from 'react';

export const BookingForm: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <iframe
        src="https://securestaging.gethealthie.com/appointments/embed_appt?dietitian_id=6590487&embed_form_id=2391153&form_only=true&primary_color=c252b4"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '600px',
          border: 'none', // FIXED: replaced '0px' with 'none'
        }}
        title="Healthie Booking Form"
      />
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Booking Provided by{' '}
        <a href="https://gethealthie.com" target="_blank" rel="noopener noreferrer">
          Healthie
        </a>
      </p>
    </div>
  );
};

export default BookingForm;