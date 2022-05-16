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
      console.log("Users data", data);
      const mutateData = data.map((el) => Object.assign(el, { key: el.id }));
      setUsersData(mutateData);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const UsersFieldsFetch = (setUsersDataFields) => {
  fetch(`${process.env.REACT_APP_API_BASE}/volunteer-fields`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Users data fields", data);
      setUsersDataFields(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const FilterUserFetch = (filterFields, setUsersData) => {
  fetch(`${process.env.REACT_APP_API_BASE}/filter-volunteers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ users: filterFields }),
  })
    .then((response) => response.json())
    .then((data) => setUsersData(data))
    .catch((err) => setUsersData([]));
};

export const RoleOffersFetch = (setRoleOffers) => {
  fetch(`${process.env.REACT_APP_VAP_API_BASE}/RoleOffers`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("RoleOffers data", data);
      setRoleOffers(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
