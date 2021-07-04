import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({dialogState, title, bodyText, showAcceptButon, onAccept, onCancel}) {
    return (
        <div className="alertDialogContainer">
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
                    <Button onClick={onCancel} color="secondary">
                        Cancel
                    </Button>
                    {showAcceptButon &&
                        <Button onClick={onAccept} color="primary">
                            Accept
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}