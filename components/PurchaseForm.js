import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PurchaseForm({
  goToPayment,
  formOpen,
  handleFormClose,
  name,
  setName,
  email,
  setEmail,
  city,
  setCity,
  postalCode,
  setPostalCode,
  streetAddress,
  setStreetAddress,
  country,
  setCountry,
}) {
  return (
    <React.Fragment>
      <Dialog open={formOpen} onClose={handleFormClose}>
        <DialogTitle>Purchase Form</DialogTitle>
        <form onSubmit={goToPayment}>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="Name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <div className="flex gap-3">
              <TextField
                autoFocus
                required
                margin="dense"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                id="City"
                name="city"
                label="City"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="PostalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                name="postalcode"
                label="Postal Code"
                type="number"
                fullWidth
                variant="standard"
              />
            </div>
            <TextField
              autoFocus
              required
              margin="dense"
              id="StreetAddress"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              name="streetAddress"
              label="Street Address"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              name="country"
              label="Country"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className="w-max bg-slate-800 text-white"
              onClick={handleFormClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="w-max bg-slate-800 text-white"
              type="submit"
            >
              Make Payment
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
