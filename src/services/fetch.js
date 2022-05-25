export const UsersFetch = (setUsersData, setDataLoading) => {
  setDataLoading(true)
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
      const mutateData = data.map((el) => Object.assign(el, { key: el.candidate_id }));
      setUsersData(mutateData);
      setDataLoading(false)
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

export const FilterUserFetch = (filterFields, setUsersData, setPagination, setDataLoading, page_number, page_size) => {
  setDataLoading(true);
  fetch(`${process.env.REACT_APP_API_BASE}/filter-volunteers?page_number=${page_number}&page_size=${page_size}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filterFields),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Filtered Users', data);
      const mutateData = data.data.map((el) => Object.assign(el, { key: el.candidate_id }));
      setUsersData(mutateData);
      setPagination(data.total_pages)
      setDataLoading(false)
    })
    .catch((err) => setUsersData([]));
};

export const SavedFiltersGet = (addFavoriteFilter, setDataLoading) => {
  setDataLoading && setDataLoading(true)
  fetch(`${process.env.REACT_APP_VAP_API_BASE}/Templates`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      const mutateData = data.value.map((el) =>
        Object.assign(el, { key: el.id })
      );
      addFavoriteFilter(mutateData);
      setDataLoading && setDataLoading(false)
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const RoleOffersFetch = (setRoleOffers, setDataLoading) => {
  setDataLoading(true)  
  fetch(`${process.env.REACT_APP_VAP_API_BASE}/FunctionalAreaTypes/nested`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })  
    .then((data) => {
      console.log("RoleOffers data", data.value);
      setRoleOffers(data.value);
      setDataLoading(false)
    })
    .catch((err) => {
      console.log(err.message);
    });
};
