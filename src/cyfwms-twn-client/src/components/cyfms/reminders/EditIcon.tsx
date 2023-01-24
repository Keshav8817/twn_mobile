import { deleteHrReminder } from "../../../pages/cyfms/reminders/remindersService";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, IconButton, Modal, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { FC } from "react";

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

const EditIcon: FC<any> = ({
  setDisabled,
  setAddNew,
  participantReminderId,
  targetValue,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModel, setOpenModel] = React.useState(false);
  const openDropDown = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close MoreHorIcon Popup
  const handleCloseDropDown = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.tabIndex === -1) {
      setOpenModel(true);
    }
    setAnchorEl(null);
  };

  const handleCloseModel = () => {
    setOpenModel(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAddNew(false);
  };

  const handleDelete = () => {
    deleteHrReminder(Number(participantReminderId)).then(() => {
      navigate(`../reminder/${id}`);
    });
    // dispatch(doRemove(participantReminderId))
    //   .then(() => setOpenModel(false))
    //   .then(() => dispatch(doSearch(targetValue || null)));
    // setAddNew(false);
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
            width: "15ch",
          },
        }}
      >
        <MenuItem
          component={Link}
          to=""
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setDisabled(false);
            handleCloseDropDown(event);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
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
            Are you sure you want to delete this record?
          </p>
          <Box paddingLeft={7}>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={handleCloseModel}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditIcon;
