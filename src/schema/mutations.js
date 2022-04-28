import { gql } from "@apollo/client";

export const ADD_VOLUNTEER = gql`
  mutation setVolunteer($id: Int!, $name: String!, $surname: String!) {
    insert_Volunteer_one(object:{id: $id, name: $name, surname: $surname}){
      id
      name
      surname 
    }
  }
`;

export const ADD_VOLUNTEERS = gql`
  mutation setVolunteers($objects: [Volunteer_insert_input!]!) {
    insert_Volunteer(objects: $objects){
      returning {
        id
        name
        surname
      }
    }
  }
`;