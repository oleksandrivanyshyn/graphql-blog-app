import React from 'react';
import AddPostModal from '../../components/AddPostModal/AddPostModal';

export default function Profile() {
  return (
    <div>
      <div
        style={{
          marginBottom: '2rem',
          display: 'flex ',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1>Profile Name</h1>
          <p>Profile Bio</p>
        </div>
        <div>{'profile' ? <AddPostModal /> : null}</div>
      </div>
      <div></div>
    </div>
  );
}
