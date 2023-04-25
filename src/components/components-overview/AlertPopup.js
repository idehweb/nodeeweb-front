import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertPopup =({show,onHandler,children,title})=> {
  const [open, setOpen] = React.useState(show);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    onHandler(false);
    setOpen(false);
  };
//   document.onclick= function(event) {
//     // Compensate for IE<9's non-standard event model
//     //
//     if (event===undefined) event= window.event;
//     var target= 'target' in event? event.target : event.srcElement;

//     alert('clicked on '+target.tagName);
// };
  return (
    <div>
      <Dialog style={{direction:'rtl'}}
        onClick={handleClose}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={'md'}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
            <div className={" mt-2 the-chip row"} key={1}>

                {children}

            </div>
        </DialogContent>
        <DialogActions>
          <button className='btn btn-danger btn-sm' onClick={handleClose} autoFocus>
            بستن 
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default React.memo(AlertPopup);