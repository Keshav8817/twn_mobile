import Dropdown from "../../../components/Dropdown";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
// import SearchResults from "../../../components/ic/search/SearchResults";
import { onKeyDown } from "../../../library/app";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { Data } from "./SearchDataType";
import { getAllCgRecord } from "./SearchService";

import SearchResults from "../../../components/cg/search/SearchResults";
import {
  getCgStatusCodetable,
  getCgTypeCodetable,
} from "../../../services/codetableService";

/**
 * *IC* aka *Initial Contact* module. \
 * `SearchPage` is *IC* modules' search page.
 */
const SearchPage1: FC = () => {
  const [isShown, setIsShown] = useState(false);
  const [state, setState] = useState<Data[]>([]);

  const [getCgType, setCgType] = useState({});
  const [getCgStatus, setCgStatus] = useState({});
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const hide = () => {
    setIsShown(false);
  };

  useEffect(() => {
    getCgTypeCodetable().then((response) => {
      setCgType(response.data.valuesMap);
    });
    getCgStatusCodetable().then((data) => {
      setCgStatus(data.data.valuesMap);
    });
  }, []);

  const submitHandler = (event: any) => {
    event.preventDefault();
    const form: any = event.currentTarget;
    const formData: Data = {
      referenceId: form.referenceId.value || null,
      cgProviderId: null,
      name: form.name.value || null,
      type: form.type.value || null,
      priCaregiver: form.primary_cg.value || null,
      secCaregiver: form.secondary_cg.value || null,
      status: form.status.value || null,
    };
    getAllCgRecord(formData).then(({ data }) => {
      setState(data);
      setIsShown(true);
    });
  };

  return (
    <AuthLayout>
      <Header bannerTitle="CareGiver" />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          p: "1rem",
          gap: "1rem",
          "& div": { width: { xs: "100%", md: 350 } },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
              maxWidth: 300,
              textTransform: "none",
              mx: "auto",
              mb: "auto",
            }}
          >
            Search for CareGiver(s)
          </Button>
        </Box>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem 0",
          }}
          onSubmit={submitHandler}
          onKeyDown={onKeyDown}
        >
          <Input
            id="referenceId"
            validationPattern={`^[^a-zA-Z]*$`}
            validationTitle="Alphabets are not allowed!"
            value="Reference Id"
          />
          <Input
            id="name"
            minChars={2}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Name"
          />
          <Dropdown
            id="type"
            autofill={""}
            optionsList={Object.values(getCgType).map(
              (status: any) => status.en
            )}
            value="Type"
          />
          <Input
            id="primary_cg"
            minChars={2}
            validationPattern={`^[a-zA-Z ]*$`}
            validationTitle="Digits are not allowed!"
            value="Primary Caregiver "
          />
          <Input
            id="secondary_cg"
            minChars={2}
            validationTitle="Digits are not allowed!"
            value="Secondary Caregiver"
          />
          <Dropdown
            id="status"
            autofill={""}
            optionsList={Object.values(getCgStatus).map(
              (status: any) => status.en
            )}
            value="Status"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {isMatch ? (
              <>
                <Box
                  sx={{
                    flex: "2 1 0",
                    display: "flex",
                    justifyContent: "center",
                    gap: "0 1rem",
                  }}
                >
                  <Button variant="contained" type="submit">
                    Search
                  </Button>
                  <Button variant="contained" type="reset" onClick={hide}>
                    Reset
                  </Button>
                </Box>
              </>
            ) : (
              <>
                {" "}
                <Box sx={{ flex: "1.08 1 0" }}></Box>
                <Box
                  sx={{
                    flex: "2 1 0",
                    display: "flex",
                    justifyContent: "center",
                    gap: "0 1rem",
                  }}
                >
                  <Button variant="contained" type="submit">
                    Search
                  </Button>
                  <Button variant="contained" type="reset" onClick={hide}>
                    Reset
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      {isShown && <SearchResults record={state} />}
    </AuthLayout>
  );
};

export default SearchPage1;
