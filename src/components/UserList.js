import React, { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";

const roles = ["Admin", "Editor", "Viewer"]; 

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getUsers().then((response) => setUsers(response.data));
  }, []);

  const handleOpen = (user = null) => {
    setCurrentUser(user || { name: "", role: "", status: "Active" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (currentUser.id) {
      updateUser(currentUser.id, currentUser).then(() => {
        setUsers((prev) =>
          prev.map((u) => (u.id === currentUser.id ? currentUser : u))
        );
      });
    } else {
      createUser(currentUser).then((response) => {
        setUsers((prev) => [...prev, response.data]);
      });
    }
    handleClose();
  };

  const handleDelete = (id) => {
    deleteUser(id).then(() => setUsers((prev) => prev.filter((u) => u.id !== id)));
  };

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpen()}>
        Add User
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(user)}>Edit</Button>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentUser?.id ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={currentUser?.name || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
          />
          <TextField
            label="Role"
            select
            fullWidth
            value={currentUser?.role || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Status"
            select
            fullWidth
            value={currentUser?.status || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
