import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, IconButton, Modal, Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { FC } from "react";
import { TabbarDispatchContext } from "../../contexts/TabbarContext";
import { PopupDispatchContext } from "../../contexts/PopupContext";
import { doRemove } from "../../pages/cg/careProvider/CareProviderService";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const ITEM_HEIGHT = 48;
export const openPopup = true;

const EditIcon: FC<any> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const tabbarDispatchContext = useContext(TabbarDispatchContext);
  const { id } = useParams();
  const popupDispatchContext = useContext(PopupDispatchContext);
  const [openModel, setOpenModel] = React.useState(false);
  const openDropDown = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close MoreHorIcon Popup
  const handleCloseDropDown = (event: React.MouseEvent<HTMLElement>) => {
    setOpenModel(true);
    if (event.currentTarget.tabIndex !== 0) {
      setOpenModel(true);
    }
  };

  const handleCloseModel = () => {
    setOpenModel(false);
  };
  const handleClose = () => {
    navigate(`../Search/${id}`);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={openDropDown ? "long-menu" : undefined}
        aria-expanded={openDropDown ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={openDropDown}
        onClose={(event, reason) => {
          setAnchorEl(null);
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          component={Link}
          to={`../care_provider/${props.value}`}
          onClick={() => {
            tabbarDispatchContext({
              type: "toggle_hidden",

              tabsDisabled: false,
            });

            popupDispatchContext({
              type: "open",

              open: true,
            });
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          component={Link}
          to="#"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            handleCloseDropDown(event);
          }}
        >
          Delete
        </MenuItem>
        <MenuItem onClick={handleClose}>Close</MenuItem>
      </Menu>
      <Modal
        open={openModel}
        onClose={(event, reason) => {
          switch (reason) {
            case "backdropClick":
              return;
            case "escapeKeyDown":
              handleCloseModel();
          }
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, paddingLeft: "5%" }}>
          <p id="parent-modal-description">
            Are you sure ? You want to delete ?
          </p>
          <Box paddingLeft={7}>
            <Button
              onClick={(e) => {
                // e.preventDefault();
                doRemove(props.referenceId).then(() => navigate("/cg/search"));
              }}
            >
              Yes
            </Button>
            <Button onClick={handleCloseModel}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditIcon;
