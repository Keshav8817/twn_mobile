import PopupContext, {
  PopupDispatchContext,
} from "../../../contexts/PopupContext";
import { ModuleDispatchContext } from "../../../contexts/ModuleContext";
import { TabbarDispatchContext } from "../../../contexts/TabbarContext";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router";
import type { FC, PropsWithChildren } from "react";

/**
 * `Popup`
 * @example
 * ```jsx
 * <Popup
 *   open={boolean}
 *   onClose={yourCloseHandler}
 * />
 * ```
 */
const Popup: FC<PropsWithChildren> = (props) => {
  const navigate = useNavigate();
  const navigationAction = useNavigationType();
  const popupContext = useContext(PopupContext);
  const tabbarDispatchContext = useContext(TabbarDispatchContext);
  const moduleDispatchContext = useContext(ModuleDispatchContext);
  const popupDispatchContext = useContext(PopupDispatchContext);

  useEffect(() => {
    if (navigationAction === "POP") {
      popupDispatchContext({ type: "open", open: false });
      // dispatch(setOpen(false));
      // dispatch(hideTabs(null));
      // dispatch(uninitiate(null));
      // dispatch(setView(false));
    }
  }, [navigationAction]);

  return (
    <Modal
      open={popupContext.open}
      onClose={(_event, reason) => {
        switch (reason) {
          case "backdropClick":
            return;
          case "escapeKeyDown":
            popupDispatchContext({ type: "open", open: false });
            tabbarDispatchContext({ type: "toggle_hidden", hidden: true });
            moduleDispatchContext({ type: "clean_context" });
          // dispatch(setOpen(false));
          // dispatch(setEdit(false));
          // dispatch(uninitiate(null));
          // dispatch(hideTabs(null));
        }
      }}
    >
      <Box
        sx={{
          position: "relative",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          maxHeight: "80rem",
          maxWidth: "70rem",
          bgcolor: "background.paper",
          border: "5px solid black",
          boxShadow: 24,
          overflowY: "auto",
        }}
      >
        <IconButton
          color="primary"
          onClick={() => {
            popupDispatchContext({ type: "open", open: false });
            tabbarDispatchContext({ type: "toggle_hidden", hidden: true });
            moduleDispatchContext({ type: "clean_context" });
            if (popupContext.id !== 0) {
              navigate(`../view/${popupContext.id}`);
              popupDispatchContext({
                type: "change_id",
                id: 0,
              });
            }
            // dispatch(setOpen(false));
            // dispatch(setEdit(false));
            // dispatch(uninitiate(null));
            // dispatch(hideTabs(null));
            // dispatch(setCalendarView(false));
            // if (calendarview.calendar) {
            //   navigate("/calendar");
            // } else {
            //   if (
            //     fileDetailsId !== 0 ||
            //     participantId !== 0 ||
            //     culturalProgramId !== 0 ||
            //     cgProviderId !== 0
            //   ) {
            //     navigate("./view");
            //   }
            //   if (
            //     fileDetailsId === 0 &&
            //     participantId === 0 &&
            //     culturalProgramId === 0 &&
            //     cgProviderId === 0
            //   ) {
            //     navigate("./");
            //   }
            // }
          }}
          sx={{ position: "absolute", right: 0 }}
        >
          <CloseIcon />
        </IconButton>
        {props.children}
      </Box>
    </Modal>
  );
};

export default Popup;
