import AttachmentsContext from "../../../contexts/AttachmentsContext";
import axiosInstance from "../../../library/axiosInstance";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Attachment } from "../../../pages/cyfms/attachments/attachmentsDatatypes";
import type { FC, MouseEventHandler } from "react";

const ITEM_HEIGHT = 48;

/**
 * `EditIcon` is used to show edit options on `/edit` \
 * page of an `/attachment` of `CYFMS` aka \
 * `Child, Youth, Family, and Management Services` module.
 * @returns `ReactElement`
 */
const EditIcon: FC = () => {
  const { id } = useParams();
  const context = useContext(AttachmentsContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openDropDown = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close MoreHorIcon Popup
  const handleCloseDropDown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleEdit: MouseEventHandler<HTMLElement> = (event) => {
    handleCloseDropDown(event);
    navigate(
      `../attachments/edit/${context.attachment.participantId}/${context.attachment.participantAttachmentId}`
    );
  };

  const handleDelete: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    axiosInstance
      .delete(
        `participantservice/attachments/remove_one/${
          (context.attachment as Attachment).participantAttachmentId
        }`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        // setOpenModel(false);
        navigate(
          `../attachments/${(context.attachment as Attachment).participantId}`
        );
      });
  };

  const handleClose: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    navigate(`../attachments/${id}`);
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
            maxWidth: "10ch",
          },
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Close</MenuItem>
      </Menu>
    </div>
  );
};

export default EditIcon;
