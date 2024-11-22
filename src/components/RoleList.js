import React, { useState, useEffect } from "react";
import { getRoles, updateRole } from "../services/api";
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const permissionsList = ["Read", "Write", "Delete"];

export default function RoleList() {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    getRoles().then((response) => setRoles(response.data));
  }, []);

  const handleOpen = (role) => {
    setCurrentRole(role);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    updateRole(currentRole.id, currentRole).then(() => {
      setRoles((prev) =>
        prev.map((r) => (r.id === currentRole.id ? currentRole : r))
      );
    });
    handleClose();
  };

  const togglePermission = (permission) => {
    const updatedPermissions = currentRole.permissions.includes(permission)
      ? currentRole.permissions.filter((p) => p !== permission)
      : [...currentRole.permissions, permission];
    setCurrentRole({ ...currentRole, permissions: updatedPermissions });
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(", ")}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(role)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          {permissionsList.map((permission) => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={currentRole?.permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                />
              }
              label={permission}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
