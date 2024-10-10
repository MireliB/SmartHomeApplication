import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function DeleteRoomDialog({
  isPopupOpen,
  setIsPopupOpen,
  confirmDelete,
}) {
  return (
    <Dialog
      open={isPopupOpen}
      onClose={() => {
        setIsPopupOpen(false);
      }}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this room?</Typography>
        <DialogActions>
          <Button sx={{ color: "red" }} onClick={confirmDelete}>
            Delete
          </Button>
          <Button sx={{ color: "white" }} onClick={() => setIsPopupOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
