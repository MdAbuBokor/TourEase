import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';


function ShowReviews({accommodationId}) {
    const [reviews,setReviews] = useState([])
    const {data, loading, error} = useFetch(`/api/review/getAccReview/${accommodationId}`);

    useEffect(() => {
        setReviews(data)
    }, [data])

  return (<div className="">
    {
    reviews?.map((review) => (
        <div key={review._id} className="px-2 border rounded-lg shadow-2xl mb-2">
            <p className='font-semibold'>Guest Name : {review.bookingId.name}</p>
            <p>Rating : {review.rating}</p>
            <div className="rating">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"  checked={review.rating==1}/>
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"  checked={review.rating==2} />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"  checked={review.rating==3}/>
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"  checked={review.rating==4}/>
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked={review.rating==5} />
</div>
<p className=''>{review.comment}</p>
        </div>
    ))
    }
    </div>
  )
}

export default ShowReviews