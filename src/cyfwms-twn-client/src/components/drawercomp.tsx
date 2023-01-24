import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { FC, useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { ListFormat } from "typescript";
import { useNavigate } from "react-router-dom";
import { AuthDispatchContext } from "../contexts/AuthContext";

const Drawercomp: FC = () => {
  const [openDrawer, setopenDrawer] = useState(false);
  const navigate = useNavigate();
  const authDispatchContext = useContext(AuthDispatchContext);

  const handleHome = () => {
    navigate("/home");
    setopenDrawer(false);
  };
  return (
    <div>
      <Drawer open={openDrawer} onClose={() => setopenDrawer(false)}>
        <List>
          <ListItemButton onClick={handleHome}>Home</ListItemButton>
          <ListItemButton onClick={() => navigate("/calendar")}>
            Calendar
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              authDispatchContext({ type: "logout" });
            }}
          >
            Logout
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton onClick={() => setopenDrawer(!openDrawer)}>
        <MenuIcon sx={{ background: "white" }}></MenuIcon>
      </IconButton>
    </div>
  );
};

export default Drawercomp;
