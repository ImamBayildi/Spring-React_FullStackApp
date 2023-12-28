
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../context/Context';
import { Grid } from '@mui/material';

export default function UpdateModal({ isOpen, closeModal, handleFormSubmit, updateReport }) {
    const { contextUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        ...updateReport
    });

    useEffect(() => {
        setFormData({ ...updateReport })
        return () => {
            setFormData({ formData: null })
        }
    }, [isOpen, updateReport])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const boxStyle = {
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
        borderRadius: '15px'
    };
    return (
        <Modal open={isOpen} onClose={closeModal}>
            <Box sx={boxStyle}>
                <Typography variant="h4" component="div" align='center'>
                    Raporu Güncelle
                </Typography>
                    <Grid container style={{ margin: 'auto', marginTop: '16px', width: '90%', justifyContent: 'space-between' }}>
                            <Grid item xs={6}>
                            <TextField style={{ width: '90%', marginRight: '1rem' }} variant='filled' label="Hasta Adı" name="fullName" value={formData.fullName} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField style={{ width: '100%' }} variant='filled' label="Tanı" name="diagnosis" value={formData.diagnosis} onChange={handleChange} />
                            </Grid>
                    </Grid>
                        <Grid sx={{ padding: 3 }}>
                        <TextField variant='filled' label="Detaylar" name="details" multiline minRows={6}
                         value={formData.details} onChange={handleChange} sx={{ width: '100%' }} />
                        </Grid>
                    <Button onClick={() => handleFormSubmit(formData)} variant="contained" 
                    style={{ backgroundColor: '#1E88E5', align: 'center', marginTop: '16px', marginInlineStart: '40%',  }}>
                        Kaydet
                    </Button>
            </Box>
        </Modal>
    );
};

