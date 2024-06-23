import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function OrderDeleteDialog({
  orderDeleteOpen,
  orderId,
  deleteOrder,
  setOrderDeleteOpen,
  handleOrderDeleteOpen,
  handleorderDeleteClose,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={orderDeleteOpen}
        onClose={handleorderDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you realy want to Delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please check Order Id on the Package and Item Quntity with its name
            Before Delete Order.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleorderDeleteClose}
          >
            Go Back
          </Button>
          <Button
            onClick={() => deleteOrder(orderId)}
            variant="contained"
            color="error"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
