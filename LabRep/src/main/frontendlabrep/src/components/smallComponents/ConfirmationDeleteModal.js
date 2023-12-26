
import { Button, Modal, Box } from '@mui/material';
import {Typography} from '@material-ui/core';



export default function ConfirmationDeleteModal(prop) {

  const boxStyle = {
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: '15px'
  };
    return (
      <Modal open={prop.isOpen} onClose={prop.closeModal}>
            <Box sx={boxStyle}>
            <Typography variant="p" component="div" align='center' style={{ padding: '40px' }}>
              <span style={{ color: 'cyan', fontWeight: 'bold', fontSize: '1.2rem' }}>{prop.reportForModal.fullName+' '}</span> isimli {prop.question}
            </Typography>
            <Button style={{ color: 'red', backgroundColor: '#404040', marginLeft: '50px' }} onClick={() => prop.confirmation(prop.reportForModal)} variant='contained'
            >Kalıcı Olarak Sil!
            </Button>
            <Button onClick={prop.closeModal} variant='contained' style={{ marginLeft: '200px', backgroundColor: '#009DFF' }} sx={{ color: 'black' }}
            >Vazgeç
            </Button>
            </Box>
        </Modal>
    );
  }



  