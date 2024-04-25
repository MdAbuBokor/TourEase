import React from 'react';

function AccReview({accId}) {
    const {data, loading, error} = useFetch(`/api/room/getRoom/${roomId}`);
  return (
    <div>AccReview</div>
  )
}

export default AccReview