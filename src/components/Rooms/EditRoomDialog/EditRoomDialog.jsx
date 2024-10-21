import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function EditRoomDialog({
  isEditPopupOpen,
  setIsEditPopupOpen,
  confirmEdit,
}) {
  return (
    <Dialog
      open={isEditPopupOpen}
      onClose={() => setIsEditPopupOpen(false)} // Ensure dialog closes on cancel
    >
      <DialogTitle>Confirm Edit</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to edit the current room?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmEdit} sx={{ color: "green" }}>
          Save
        </Button>
        <Button onClick={() => setIsEditPopupOpen(false)} sx={{ color: "red" }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
