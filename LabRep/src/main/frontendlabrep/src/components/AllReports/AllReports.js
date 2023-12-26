import React, { useState, useReducer, useEffect, useContext } from 'react';
import { Grid, Card, CardContent, Typography, IconButton } from '@material-ui/core';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';

import { ButtonGroup } from '@mui/material';
import DrawIcon from '@mui/icons-material/Draw';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Accordion, AccordionSummary, AccordionDetails, Pagination } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GetSnackBar from '../smallComponents/SnackBar';
import ConfirmationDeleteModal from '../smallComponents/ConfirmationDeleteModal';
import SortSpeedDial from '../smallComponents/SortSpeedDial'
import UpdateModal from './UpdateModal';
import { UserContext } from '../../context/Context';
import { ColorModeContext } from '../../context/ThemeContext';


//TO DO => SnackBar With Update and Delete
export default function AllReports() {
  return (
    <>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={11}>
          <div style={{ textAlign: "center" }}>
            <h2>Burada tüm raporları listeleyebilir ve sıralayabilirsiniz.</h2>
            <h3>Ayrıca kullanıcı hesabınız ile güncelleme ve silme yapabilirsiniz.</h3>
            <h4>Veriler ilk başta front-end de sıralandı, fakat sonra 'PagingAndSortingRepository' ile tanıştık.</h4>
            Yazar ve tarih otomatik olarak güncellenecektir.
          </div>

          <CardContent>
            <Typography variant="h4" component="div" align='center' color='text.main'>
              Rapor Listesi
            </Typography>
          </CardContent>

          <List></List>

        </Grid>
      </Grid>

    </>
  );
};

function List() {
  const { contextUser, logOut } = useContext(UserContext);

  const [formList, setFormList] = useState([])
  const [isChangeFormList, setChangeFormlist] = useState(true)
  const [paginationValues, setPaginationValues] = useState({
    page: 1,
    size: 10,
    sort: "id",
    totalPages: 1
  })
  console.log("token => " + contextUser.token)
  useEffect(() => {

    fetch(`/report/getReportPagination?page=${(paginationValues.page) - 1}&size=${paginationValues.size}&sort=${paginationValues.sort}`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${contextUser.token}`,
      }
    })
      .then(response => {
        if (response.status === 403) {
          logOut();
        } else if (!response.ok) {
          throw new Error("Network update response was not ok");
        } else return response.json();
      })// .then(x => JSON.stringify(x))
      .then(data => {
        console.log(data)
        setFormList(data.content)
        setPaginationValues({
          ...paginationValues,
          totalPages: data.totalPages
        })
        console.log(paginationValues)
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  }, [isChangeFormList]);



  const [modalItem, setModalItem] = useState([null])
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);

  const handleModalButton = (formData) => {
    fetch(`/report/update/${contextUser.id}`, {
      headers: { "Content-type": "application/json; charset=UTF-8" },
      method: "PUT",
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          return response
        }
        else throw new Error("Network delete response was not ok");
      })
      // .then(resData => setFormList([...formList, resData]))@Deprecated
      .then(setChangeFormlist(!isChangeFormList))
      .then(getSnackBar("Rapor güncellendi", "success"))
      .catch(error => {
        console.error("Fetch error:", error);
        getSnackBar("Bir sorun oluştu", "error");
      });
  };
  async function handleEdit(formItem) {
    await setModalItem(formItem)
    console.log(formItem)
    setModalIsOpen(true);
  }





  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const closeConfirmation = () => setIsOpenDeleteModal(false);
  function openDeleteConfirmation(formItem) {
    setIsOpenDeleteModal(true);
    setModalItem(formItem)
  }
  async function handleDelete(data) {
    // console.log(`ELEMAN: ${data.id} liste elemanı silinecek `)

    fetch(`/report/deleteById/${data.id}`, {
      headers: { "Content-type": "application/json; charset=UTF-8" },
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          closeConfirmation();
          setChangeFormlist(!isChangeFormList);
          getSnackBar("Rapor Silindi", "success");
        }
        else throw new Error("Network response was not ok");
      })
      .catch(error => {
        console.error("Fetch error:", error);
        getSnackBar("Bir sorun oluştu.", "error");
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


  const handlePageChange = (_event, value) => {
    sortingWithParam(value, paginationValues.size, paginationValues.sort)
  } //How did this param event work?!?

  //<<<<<<<<<<BACK END PAGINATION>>>>>>>>>>
  const [, forceUpdateReRender] = useReducer(x => x + 1, 0);  //TO DO => Read useReducer in react documentation
  const reRender = () => forceUpdateReRender()
  async function sortingWithParam(page, size, sort) {//this.forceUpdate() and option for Re-Render component
    await setPaginationValues({
      ...paginationValues,
      page: page == null ? paginationValues.page : page,
      size: size == null ? paginationValues.size : size,
      sort: sort == null ? paginationValues.sort : sort
    })
    console.log("VALUE: " + paginationValues.page)
    console.log("inDATA: " + JSON.stringify(paginationValues))
    setChangeFormlist(!isChangeFormList)
  }




  const { modeTheme } = useContext(ColorModeContext);
  console.log(modeTheme.palette.primary.heavy)
  const forTableAlign = { width: '20%', color : modeTheme.palette.text.primary }
  let question = "Hastaya ait rapor kalıcı olarak silinecek. Emin misiniz?"
  // variant="h6" component="div" align='left' color='primary'
  return (
    <Card >
      <UpdateModal isOpen={modalIsOpen} closeModal={closeModal} handleFormSubmit={handleModalButton} updateReport={modalItem} />
      <ConfirmationDeleteModal isOpen={isOpenDeleteModal} closeModal={closeConfirmation} confirmation={handleDelete} reportForModal={modalItem} question={question} />
      <GetSnackBar open={open} message={snackBarmessage} severity={snackBarSeverity} handleClose={() => handleCloseSnackBar()}></GetSnackBar>

      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: modeTheme.palette.background.light }}>
            <TableRow >
              <TableCell style={{ color: modeTheme.palette.text.primary }}><h3>Rapor Numarası</h3></TableCell>

              <TableCell><Typography style={forTableAlign} variant="h6" component={TableCell} >Hasta Adı</Typography></TableCell>
              <TableCell><Typography style={forTableAlign} variant="h6" component={TableCell} >Tanı detayları</Typography></TableCell>
              <TableCell><Typography style={forTableAlign} variant="h6" component={TableCell} >Hastanın Kimlik Numarası</Typography></TableCell>
              <TableCell><Typography style={forTableAlign} variant="h6" component={TableCell} >Yazan Teknisyen</Typography></TableCell>
              <TableCell><Typography style={forTableAlign} variant="h6" component={TableCell} >Rapor Tarihi</Typography></TableCell>
              <TableCell><Typography></Typography></TableCell>

            </TableRow>
          </TableHead>
          <TableBody useRef={reRender}>

            {formList.map((form, index) => (
              // (index < paginationValues.page*10 && index > paginationValues.page*10-10) ? 
              // buraya bak. hover ekle
              <TableRow key={form.id} selected={true} hover={true} style={{ backgroundColor: modeTheme.palette.background.light }}>

                <TableCell style={{ color: modeTheme.palette.text.primary}}><Typography>{form.id}</Typography></TableCell>

                <TableCell colSpan={5}>
                  <Accordion style={{ backgroundColor: modeTheme.palette.primary.main }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }
                      }
                    >

                        <TableCell style={forTableAlign}>{form.fullName}</TableCell>
                        <TableCell style={forTableAlign}>{form.diagnosis}</TableCell>
                        {/* <TableCell>{form.details}</TableCell> */}
                        <TableCell style={forTableAlign}>{form.tc}</TableCell>
                        <TableCell style={forTableAlign}>{form.writer.fullName}</TableCell>
                        <TableCell style={forTableAlign}>{form.reportDate}</TableCell>

                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {form.details + '. '}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </TableCell>

                <TableCell style={{ width: '10%' }}>
                  <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{}}>
                    <IconButton onClick={() => handleEdit(formList[index])} aria-label="Düzenle">
                      <DrawIcon sx={{ color: modeTheme.palette.primary.thirty }} />
                    </IconButton>
                  </ButtonGroup>

                  <ButtonGroup variant="contained" aria-label="outlined primary button group" >
                    <IconButton
                      onClick={() => openDeleteConfirmation(formList[index])} aria-label="Sil">
                      <DeleteForeverIcon sx={{ color: '#e11d48' }} />
                    </IconButton>
                  </ButtonGroup>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SortSpeedDial handleSort={sortingWithParam}></SortSpeedDial>
      <Pagination count={paginationValues.totalPages} color='primary' page={paginationValues.page} onChange={handlePageChange}
        sx={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-60%)',
          justifyContent: 'center',
        }} />



    </Card>

  );
};






//<<<<<<<<<<FRONT END PAGINATION>>>>>>>>>>
/*const [, forceUpdateReRender] = useReducer(x => x + 1, 0);  //TO DO => Read useReducer in react documentation
const reRender = () => forceUpdateReRender()
function sortingWithParam(param) {//this.forceUpdate() adn option for Re-Render component
  switch (param) {
    case 1:
      // setFormList(formList.sort((a, b) => a.id - b.id))// Why not fire Re-Render?
      formList.sort((a, b) => a.id - b.id)
      console.log(formList)
      reRender()
      break;
    case 2:
      formList.sort((a, b) => new Date(a.reportDate) - new Date(b.reportDate)).reverse()
      console.log(formList)
      reRender()
      break;
    case 3:
      formList.sort((a, b) => a.fullName.localeCompare(b.fullName))
      console.log(formList)
      reRender()
      break;
    default:
      //  //Example
      // formList.sort((a, b) => {
      //   if (a[0...5] && !b[0...5]) {
      //     return -1;
      //   } else if (![0] && b[0]) {
      //     return 1;
      //   } else {
      //     return 0; // sort local def
      //   }
      // });
      break;
  }
}*/