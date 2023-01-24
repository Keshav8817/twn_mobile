import TabbarContext from "../../../contexts/TabbarContext";
import { listItemClasses } from "@mui/material/ListItem";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import type { FC } from "react";

function MyNavLink(props: any) {
  return <NavLink {...props} activeClassName="active" />;
}

/**
 * `Tabbar`
 */
const Tabbar: FC<{
  tabs: {
    value: string;
    route: string;
  }[];
}> = (props) => {
  const tabbarContext = useContext(TabbarContext);

  return (
    <Box aria-label="tabs" sx={{ bgcolor: "#DFDADA" }}>
      <List
        disablePadding
        sx={{
          [`& .active, & .${listItemClasses.root}:hover`]: {
            "&:hover": {
              backgroundColor: "#740808",
            },
            color: "white",
            backgroundColor: "#da0404",
          },
        }}
      >
        {props.tabs.map((tab, index) => {
          return (
            <ListItemButton
              disabled={index !== 0 ? tabbarContext.hidden : false}
              component={MyNavLink}
              to={tab.route}
            >
              <ListItemText primary={tab.value} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default Tabbar;
