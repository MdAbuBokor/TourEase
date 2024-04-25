import React, { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';

function locations() {
    const {data, loading, error} = useFetch(`/api/location/getAllLocations`);
    const [locations,setLocations] = useState([]);
    useEffect(() => {
        if(data) {
            setLocations(data);
        }
    }, [data])
    if(loading) {
        return <div>Loading...</div>
    }
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {locations.map((location) => (
                    <tr key={location._id}>
                        <td>{location.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default locations