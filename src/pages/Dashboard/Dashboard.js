import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_VOLUNTEER } from '../../schema/queries';
import { ADD_VOLUNTEER, ADD_VOLUNTEERS } from '../../schema/mutations';
import './Dashboard.scss';

const Dashboard =  () => {
    const { loading, error, data } = useQuery(GET_VOLUNTEER);
    const [volunteer, setVolunteer] = useState([]);
    const [addVolunteer] = useMutation(ADD_VOLUNTEER);
    const [addVolunteers, { loading:mutationLoading , error: mutationError, data:mutationData }] = useMutation(ADD_VOLUNTEERS);

    useEffect(() => {
        if (data) {
            setVolunteer(data.Volunteer);
            console.log(data.Volunteer);
        }
    }, [data])
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (mutationLoading) return <p>Loading...</p>;
    if (mutationError) return <p>Error: {mutationError.message}</p>;
      
    return(
        <> 
           {volunteer.map(({id,name,surname}) =>(
                <p key={id}>{name}</p>
            ))}  

            <form onSubmit={e => {
                addVolunteer({ variables: { id: 142, name: "NARMINN", surname: "S" } })
                // addVolunteers({ variables: {objects: [{ id: 555, name: "Array1", surname: "S" },{id:556,name:"Array2",surname:"S"}] }})
            }}>
                <button type='submit'>Click</button> 
            </form>
        </>
    )
};

export default Dashboard;