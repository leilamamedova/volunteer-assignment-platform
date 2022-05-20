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

export const GET_FILTERED_VOLUNTEERS = gql`
    query getFilteredVolunteers{
        volunteers(where: {_and: [ {_or: [{additional_language_1: {_eq: "French"}}, {additional_language_1: {_eq: "Spanish"}}] }, {_or: [{additional_language_1_fluency_level: {_eq: "Native"}}, {additional_language_1_fluency_level: {_eq: "Beginner"}}] } ]}) {
            candidate_id
          }
    }
`;