import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function EditeUser({ open, setOpen, handleClose, editData }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const Handleedite = async (e) => {
    e.preventDefault();

    await axios
      .post(`/api/admin/users/edite-user?id=${editData._id}`, { name, email })
      .then((response) => {
        toast.success(response.data.message);
        setOpen(false);
      })
      .catch((error) => {
        return toast.error(`${error.response.data.message}`);
      });
  };

  React.useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setEmail(editData.email || "");
      setLoading(false);
    }
  }, [editData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Toaster />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Edit Module</DialogTitle>
        <form onSubmit={Handleedite}>
          <DialogContent>
            <TextField
              autoFocus
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="dense"
              id="Name"
              name="name"
              label="Full name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
