export const UsersFetch = (setUsersData) => {
    fetch(`${process.env.REACT_APP_API_BASE}/volunteers`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(
            `This is an HTTP error: The status is ${response.status}`
            );
        }
        return response.json();
    })
    .then((data) => {
        console.log('Users data', data);
        setUsersData(data);
    })
    .catch((err) => {console.log(err.message)});   
};