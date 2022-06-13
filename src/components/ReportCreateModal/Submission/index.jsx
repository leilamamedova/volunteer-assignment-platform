import { Button } from "antd";
import { useEffect, useState } from "react";
import useStore from "../../../services/store";
import { ReportTemplateFetch } from "../../../services/fetch";
function Submit() {
  const [disabled, setDisabled] = useState(true);
  const templateReportName = useStore((state) => state.templateReportName);
  const reportColumns = useStore((state) => state.reportColumns);
  const setReportTemplates = useStore((state) => state.setReportTemplates);
  const reportROColumns = useStore((state) => state.reportROColumns);
  const filterFields = useStore((state) => state.filterFields);
  const ROfilterFields = useStore((state) => state.ROfilterFields);
  const [filtersValid, setFiltersValid] = useState(false);
  const [ROfiltersValid, setROfiltersValid] = useState(false);
  function ValidateFilters(filterArray, isUser) {
    let isFound = false;
    if (filterArray.length > 0) {
      filterArray.forEach((el) => {
        if (
          el.requirement_name === "Requirement" ||
          el.operator === "Operator"
        ) {
          isFound = true;
          if (isUser) {
            setFiltersValid(false);
          } else {
            setROfiltersValid(false);
          }
        }
      });
      if (!isFound) {
        if (isUser) {
          setFiltersValid(true);
        } else {
          setROfiltersValid(true);
        }
      }
    }
  }

  useEffect(() => {
    ValidateFilters(filterFields, true);
    ValidateFilters(ROfilterFields);
    if (
      templateReportName.trim() === "" ||
      typeof reportColumns === "undefined" ||
      reportColumns == [] ||
      typeof reportROColumns === "undefined" ||
      reportROColumns == [] ||
      filterFields.length === 0 ||
      ROfilterFields.length === 0 ||
      filtersValid === false ||
      ROfiltersValid === false
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    templateReportName,
    reportColumns,
    reportROColumns,
    filterFields,
    ROfilterFields,
  ]);

  const handleSubmit = () => {
    console.log("Handling...");
    const postData = {
      name: templateReportName,
      volunteer_columns: reportColumns,
      role_offer_columns: reportROColumns,
      volunteer_filters: filterFields,
      role_offer_filters: ROfilterFields,
    };
    fetch(`${process.env.REACT_APP_VAP_API_BASE}/Reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        ReportTemplateFetch(setReportTemplates);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Button disabled={disabled} type="primary" onClick={handleSubmit}>
      Submit
    </Button>
  );
}

export default Submit;
