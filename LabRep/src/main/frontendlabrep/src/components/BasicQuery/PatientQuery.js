import { TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import * as React from 'react';
import SplitButton from '../smallComponents/SplitButton';
import { Container, Table, TableHead, Grid } from '@mui/material';
import { useState, useRef } from 'react';
import GetSnackBar from '../smallComponents/SnackBar';




export default function PatientQuery() {
    const options = ['İsim ile arayın', 'TC Kimlik numarası ile arayın', 'Laborant adına göre arayın'];
    const apiQuery = ['getByFullName', 'getByTc', 'getByTechnicianName'];
    // let img = "https://img.freepik.com/premium-vector/3d-realistic-person-people-vector-illustration_156780-130.jpg?w=900"


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
                    setImgDecoded(atob(data[0].photo))//ASCII to Binary => atob() - btoa()
                }
                setResult(data)
            })
            //.then(mergedData => JSON.stringify(mergedData))
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
            {/* <div style={{ marginTop: "2rem", display: "flex", justifyContent: 'space-around', height: '50vh', alignItems: 'center', flexDirection: 'column' }}> */}

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






// => https://www.freecodecamp.org/news/encode-decode-html-base64-using-javascript/
// let myString = "Welcome to freeCodeCamp!";
// let encodedValue = btoa(myString);// V2VsY29tZSB0byBmcmVlQ29kZUNhbXAh
// let decodedValue = atob(encodedValue);
// console.log(decodedValue); // Welcome to freeCodeCamp!

// https://nodejs.org/docs/latest-v18.x/api/buffer.html#static-method-bufferfromstring-encoding



/*
https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript

var b = Buffer.from('JavaScript');
 var s = b.toString('base64');

//https://stackoverflow.com/questions/1095102/how-do-i-load-binary-image-data-using-javascript-and-xmlhttprequest
*/


/*
async function bytesToBase64DataUrl(bytes, type = "application/octet-stream") {
                return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = () => reject(reader.error);
                  
                  reader.readAsDataURL(new File([bytes], "", { type }));
                });
              }
              
              async function dataUrlToBytes(dataUrl) {
                const res = await fetch(dataUrl);
                return new Uint8Array(await res.arrayBuffer());
              }
              
              // Kullanım
              try {
                const base64DataUrl = bytesToBase64DataUrl(new Uint8Array([0, 1, 2]));
                console.log(base64DataUrl); // "data:application/octet-stream;base64,AAEC"
              
                const byteArray = dataUrlToBytes("data:application/octet-stream;base64,AAEC");
                console.log(byteArray); // Uint8Array [0, 1, 2]
              } catch (error) {
                console.error(error);
              }

              */
