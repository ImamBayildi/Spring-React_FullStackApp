
import React, { useState, useContext } from "react";
import {Grid,Button,CardHeader,TextField} from "@material-ui/core";
import CardMedia from '@mui/material/CardMedia';

import { UserContext } from "../../context/Context";
import { ColorModeContext } from "../../context/ThemeContext";
import GetSnackBar from "../smallComponents/SnackBar";

export default function ReportDefine() {

  const { contextUser } = useContext(UserContext);

  const [formData, setFormData] = useState({//string values??
    fullName: "",
    tc: "",
    diagnosis: "",
    details: "",
    reportDate: new Date(),//WARN => creating report date in the backend. Not needed here
    writer: {
      "id": contextUser.id
    },
    photo: null
  })

  const tcRegexp = new RegExp("^[0-9]{11}$");
  const diagnosisRegexp = new RegExp("^[İA-Za-z ]{3,50}$");
  const fullNameRegexp = new RegExp("^[İA-Za-z ]{3,30}$");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);

    if (tcRegexp.test(formData.tc) 
    && diagnosisRegexp.test(formData.diagnosis) 
    && fullNameRegexp.test(formData.fullName)) {
      
        fetch("/report/save", {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${contextUser.token}`,
        },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (response.ok) {
              getSnackBar("Raporunuz kaydedildi", "success")
              console.log("Form data submitted successfully");
              console.log(response)
              handleChange({ target: { name: "details", value: "",} })
              return response.json();
            } else {
              alert("Fetch error: " + response.status);
            }
          })
    } else {
      switch (true) {
        case (tcRegexp.test(formData.tc) ? false:true):
          getSnackBar("Kimlik numarası 11 hane ve sayısal olmalıdır", "warning")
          break;
          case (diagnosisRegexp.test(formData.diagnosis) ? false:true):
          getSnackBar("Tahlil bilgisi 3 ile 50 karakter arasında olmalıdır ve sayısal değer içeremez", "warning")
          break;
          case (fullNameRegexp.test(formData.fullName) ? false:true):
          getSnackBar("İsim alanı uygun değil", "warning")
          break;
        default:
          break;
      }
    }
  };
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

  const setImagePath = e => {
    let reader = new FileReader()
    if (e.target.files[0] != null) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = () => {
      setFormData({
        ...formData,
        photo: btoa(reader.result)//.replace("data:image/png;base64,", "")
      })
    }

  }
  function arrayToBlob(array) {
    const blob = new Blob([array], { type: 'application/octet-stream' });
    return blob;
  }

const {modeTheme}=useContext(ColorModeContext);
  return (
    <Grid container justifyContent="center" spacing={10} style={{ marginTop: '16px' }}>
      <GetSnackBar open={open} message={snackBarmessage} severity={snackBarSeverity} handleClose={() => handleCloseSnackBar()}></GetSnackBar>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h4>Buradan giriş yaptığınız kullanıcınızla ilişkilendirilen bir rapor oluşturabilirsiniz</h4>
      </div>
      <Grid style={{ width: '70%' }}>
        <CardHeader title="RAPOR KAYIT" />
          <Grid container spacing={2}>
            <Grid item xs={4} sm={2}>
              <div>
                {formData.photo && (
                  <div>
                    <p>Seçilen Resim: {formData.photo.name}</p>
                    <CardMedia
                      component="img"
                      weight="194"
                      // data:image/png;base64,
                      image={ `${atob(formData.photo)}` }
                      alt="Rapor Fotografi"
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="imageArea"
                  name="resimYukle"
                  accept="image/*"
                  onChange={(e) => setImagePath(e)}
                />
              </div>
            </Grid>
            <Grid item xs={8} sm={8} style={{ margin: 'auto', marginTop: '16px', width: '55%' }}>
              <TextField 
                label="Konulan tanı"
                variant="filled"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                fullWidth
                margin="normal"
                style={{ backgroundColor: modeTheme.palette.background.default }}
              />
              <TextField
                label="Hastanın tam adı"
                variant="filled"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                style={{ backgroundColor: modeTheme.palette.background.default }}
              />
                <TextField
                  label="Hastanın kimlik numarası"
                  variant="filled"
                  fullWidth
                  name="tc"
                  value={formData.tc}
                  onChange={handleChange}
                  margin="normal"
                  style={{ backgroundColor: modeTheme.palette.background.default }}
                />
              </Grid>
              <TextField
                label="Tanı detayları"
                variant="filled"
                fullWidth
                multiline
                minRows={4}
                name="details"
                value={formData.details}
                onChange={handleChange}
                margin="normal"
                style={{ backgroundColor: modeTheme.palette.background.default }}
              />
          </Grid>
          <Grid container justifyContent="center" style={{ margin: 'auto', marginTop: '16px', width: '75%' }}
          >
            <Button
              variant="contained"
              style={{ color: 'white', backgroundColor: modeTheme.palette.primary.thirty }}
              onClick={handleSubmit}
              fullWidth
            >
              Kaydet
            </Button>
          </Grid>
      </Grid>
    </Grid>
  );
}