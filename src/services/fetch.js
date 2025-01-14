import { message } from "antd";
import { countries } from "../data/countries";

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
      setUsersDataFields(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const ReportTemplateFetch = (setReportTemplates) => {
  fetch(`${process.env.REACT_APP_VAP_API_BASE}/Reports`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      setReportTemplates(data.value);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const FilterUserFetch = (
  filterFields,
  setUsersData,
  setPagination,
  setDataLoading,
  page_number,
  page_size,
  setFilterTotal
) => {
  setDataLoading(true);
  fetch(
    `${process.env.REACT_APP_API_BASE}/filter-volunteers?page_number=${page_number}&page_size=${page_size}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterFields),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (setFilterTotal) {
        setFilterTotal(data.total_pages);
      }
      const mutateData = data.data.map((el) =>
        Object.assign(el, { key: el.candidate_id })
      );
      mutateData.map((data) => {
        data["nationality"] = countries[data.nationality];
        data["residence_country"] = countries[data.residence_country];
      });
      setUsersData(mutateData);
      setPagination(data.total_pages);
      setDataLoading(false);
    })
    .catch((err) => setUsersData([]));
};

export const NewUsersFieldsFetch = (setNewUsersDataFields) => {
  fetch(`${process.env.REACT_APP_API_BASE}/volunteer-fields-new`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      setNewUsersDataFields(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export const RoleOfferValuesFetch = (setMethod) => {
  fetch(`${process.env.REACT_APP_VAP_API_BASE}/Reports/options`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      setMethod(Object.entries(data.value));
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export const SavedFiltersGet = (addFavoriteFilter, setDataLoading) => {
  setDataLoading && setDataLoading(true);
  fetch(`${process.env.REACT_APP_VAP_API_BASE}/Templates`)
    .then((response) => {
      if (!response.ok) {
        setDataLoading(false);
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
      setDataLoading && setDataLoading(false);
    })
    .catch((err) => {
      message.error(err.message);
    });
};

export const RoleOffersFetch = (setRoleOffers, setDataLoading) => {
  setDataLoading(true);
  fetch(`${process.env.REACT_APP_VAP_API_BASE}/FunctionalAreaTypes/nested`)
    .then((response) => {
      if (!response.ok) {
        setDataLoading(false);
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      setRoleOffers(data.value);
      setDataLoading(false);
    })
    .catch((err) => {
      message.error(err.message);
    });
};

export const HistoryFetch = (setHistory, setDataLoading, userId) => {
  setDataLoading(true);
  fetch(`${process.env.REACT_APP_API_BASE}/user-history/${userId}`)
    .then((response) => {
      if (!response.ok) {
        setDataLoading(false);
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      setHistory(data);
      setDataLoading(false);
    })
    .catch((err) => {
      message.error(err.message);
    });
};

export const DashboardGet = (setDashboardData, setDataLoading) => {
  setDataLoading(true);
  fetch(`${process.env.REACT_APP_VAP_API_BASE}/Dashboards`)
    .then((response) => {
      if (!response.ok) {
        setDataLoading(false);
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      setDashboardData(data.value);
      setDataLoading(false);
    })
    .catch((err) => {
      message.error(err.message);
    });
};

export const OverallAssignmentsPost = (
  roleOfferId,
  setOverallAssignments,
  setDataLoading
) => {
  setDataLoading(true);
  fetch(`${process.env.REACT_APP_VAP_API_BASE}/Dashboards/getroleoffers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roleOfferId),
  })
    .then((response) => {
      if (!response.ok) {
        setDataLoading(false);
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      const mutateData = data.value.map((el, index) =>
        Object.assign(el, { key: index })
      );
      setOverallAssignments(mutateData);
      setDataLoading(false);
    })
    .catch((err) => setOverallAssignments([]));
};

export const VolunteerDemographicsPost = (
  data,
  setVolunteerDemographics,
  setDataLoading
) => {
  setDataLoading(true);
  fetch(`${process.env.REACT_APP_VAP_API_BASE}/Dashboards/getvolunteersinfo`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        setDataLoading(false);
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      setVolunteerDemographics(data.value);
      setDataLoading(false);
    })
    .catch((err) => setVolunteerDemographics({}));
};
