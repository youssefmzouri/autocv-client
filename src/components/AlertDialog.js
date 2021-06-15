import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({dialogState, title, bodyText, onAccept, onCancel}) {
    return (
        <div className="alertDialogContainer">
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open alert dialog
            </Button> */}
            <Dialog
                open={dialogState}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {bodyText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onAccept} color="secondary">
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}