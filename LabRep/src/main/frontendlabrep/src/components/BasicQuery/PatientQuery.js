import { TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import * as React from 'react';
import SplitButton from '../smallComponents/SplitButton';
import { Container, Table, TableHead, Grid } from '@mui/material';
import { useState, useRef } from 'react';
import GetSnackBar from '../smallComponents/SnackBar';

export default function PatientQuery() {
    const options = ['İsim ile arayın', 'TC Kimlik numarası ile arayın', 'Laborant adına göre arayın'];
    const apiQuery = ['getByFullName', 'getByTc', 'getByTechnicianName'];

    const textField = useRef(null);
    const [result, setResult] = useState("");
    const [imgDecoded, setImgDecoded] = useState(null);

    function splitButtonOnClick(selectedIndex) {
        //console.info(`Clicked:  ${options[selectedIndex]}, ${textField.current.value}, ${selectedIndex}, ${query[selectedIndex]}`);
        fetch(`/report/${apiQuery[selectedIndex]}/${textField.current.value}`, {
            headers: { "Content-type": "application/json; charset=UTF-8" },
            method: "GET"
        })
            .then(response => {
                if (!response.ok) getSnackBar(`Sorgu bulunamadı: ${response.status}`, "error");
                return response.json();
            })
            .then(data => {
                if (data[0].photo !== undefined && selectedIndex !== 2) {
                    setImgDecoded(atob(data[0].photo))
                }
                setResult(data)
            })
            .catch(error => {
                getSnackBar(`Bir hata oluştu`, "error");
                console.error("Fetch error:", error);
            });
    }

    //<<<<<SnackBar Handler>>>>
    const [open, setOpen] = useState(false);
    const [snackBarmessage, setMessage] = useState("");
    const [snackBarSeverity, setSeverity] = useState("error");
    const handleCloseSnackBar = () => {
        setOpen(false);
    }
    function getSnackBar(message, severity) {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    }
    return (
        <Container component="main">
            <GetSnackBar open={open} message={snackBarmessage} severity={snackBarSeverity} handleClose={() => handleCloseSnackBar()}></GetSnackBar>
            <div style={{ textAlign: 'center' }}>
                <h1>LABREP HOME V0.0.1</h1>
                <h3>Aynı zamanda rapor sorgulama sayfası</h3>
                <h3>Burada oturum açmadan da veri sorgulayabilirsiniz.</h3>
                <h4>Sorguyu yapacak kişinin tam adını ve ya kimlik numarasını bilmesi zorunludur. Laborant adına göre arama seçeneği yetki gerektirir. </h4>
                <h4>Veri tabanına erişemiyorsanız, önce bir kaç rapor tanımlayabilirsiniz. </h4>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <TextField sx={{}} style={{ width: '350px', paddingLeft: '1px' }} inputRef={textField} id="filled-basic" label="Arama" variant="filled" />
                <SplitButton eventProp={splitButtonOnClick} options={options} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '120px', maxHeight: '250px', margin: 'auto', paddingBottom: '2rem'  }}>
                {imgDecoded && <img src={`${imgDecoded}`} alt="report"/>}
            </div>
            <Grid sx={{ width: '100%', bgcolor: 'background.light' }}>
                {
                    result && (
                        <Table>
                            <TableHead sx={{ bgcolor: 'background.paper' }}>
                                <TableCell>

                                </TableCell>
                                <TableCell>
                                    Tanı
                                </TableCell>
                                <TableCell>
                                    Detaylar
                                </TableCell>
                                <TableCell>
                                    Tarih
                                </TableCell>
                                <TableCell>
                                    Yazar
                                </TableCell>
                            </TableHead>
                            <TableBody>
                                {
                                    result && result.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {item.fullName}
                                            </TableCell>
                                            <TableCell>
                                                {item.diagnosis}
                                            </TableCell>
                                            <TableCell>
                                                {item.details}
                                            </TableCell>
                                            <TableCell style={{ minWidth: '120px' }}>
                                                {item.reportDate}
                                            </TableCell>
                                            <TableCell>
                                                {item.writer.fullName}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    )
                }
            </Grid>
        </Container>
    );
}