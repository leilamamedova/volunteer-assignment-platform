import { gql } from "@apollo/client";

export const GET_VOLUNTEER = gql`
    query getVolunteer {
        Volunteer{
            id
            name
            surname
        }
    }
`;