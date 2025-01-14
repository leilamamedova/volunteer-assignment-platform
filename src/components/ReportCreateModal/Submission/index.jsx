import { Button } from "antd";
import { useEffect, useState } from "react";
import useStore from "../../../services/store";
import { ReportTemplateFetch } from "../../../services/fetch";
function Submit(props) {
  const [disabled, setDisabled] = useState(true);
  const templateReportName = useStore((state) => state.templateReportName);
  const reportColumns = useStore((state) => state.reportColumns);
  const setReportTemplates = useStore((state) => state.setReportTemplates);
  const reportROColumns = useStore((state) => state.reportROColumns);
  const filterFields = useStore((state) => state.filterFields);
  const ROfilterFields = useStore((state) => state.ROfilterFields);

  useEffect(() => {
    if (
      templateReportName.trim() === "" ||
      typeof reportColumns === "undefined" ||
      reportColumns == [] ||
      typeof reportROColumns === "undefined" ||
      reportROColumns == []
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [templateReportName, reportColumns, reportROColumns, filterFields]);

  const handleSubmit = () => {
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
        props.cancel();
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
