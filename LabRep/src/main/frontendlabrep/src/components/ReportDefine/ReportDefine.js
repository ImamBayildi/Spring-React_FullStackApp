
import React, { useState, useContext } from "react";
import {
  Grid,
  Button,
  CardHeader,
  TextField
} from "@material-ui/core";
import CardMedia from '@mui/material/CardMedia';

import { UserContext } from "../../context/Context";
import { ColorModeContext } from "../../context/ThemeContext";
import GetSnackBar from "../smallComponents/SnackBar";




//new RegExp(pattern [, flags]) m => Çok satırlı arama için kullanılır. / u => Unicode araması için kullanılır.
export default function ReportDefine(param) {

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
    // const removedPrefix = formData.photo.replace("data:image/png;base64,", "");

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
      // getSnackBar("Lütfen bilgilerinizi kontrol edin.", "warning")
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



  //Bu kısım epey uğraştırdı. Hem jpeg, hem png görüntülemesi çok zor oldu.
  //Bunun zorlaşmasının asıl sebebi; back-end de rastgele çekilen verilerin başında bir belirteç olmamasıydı. (data:image/png;base64,)
  //Back-end'de üretilen verilerin binery dizelere aktarılması, base64'e kodlanması ve front-end de atob(),btoa() fonksiyonları anlaşılmayı zorlaştırdı.
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
  // https://ra-6446.medium.com/send-an-image-to-your-backend-with-the-fetch-function-javascript-react-9134f9935eb
  // https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#example_uploading_a_user-selected_file  // (/opposite) and (/conjunct) binary values?
  //data:image/png;base64,
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
                    {/* <img src={URL.createObjectURL(formData.photo)} alt="Seçilen Resim" style={{ maxWidth: '100px', maxHeight: '200px' }} /> */}
                    {/* URL.revokeObjectURL(objectURL) */}
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
                minRows={4} // => 4 row space
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


/*  MUI Grid Ozellikleri
Container:
*container özelliği, Grid bileşeninin sayfanın kenarlarına veya diğer Grid öğelerine göre nasıl hizalanacağını belirler.
Değer: true veya false

item Özelliği:
*item özelliği, Grid bileşeninin içindeki öğelerin genişliğini belirler.
Değer: 1'den 12'ye kadar olan bir sayı veya auto

xs, sm, md, lg, ve xl Özellikleri:
Bu özellikler, farklı ekran boyutlarına göre genişliği belirler.
Değer: 1'den 12'ye kadar olan bir sayı veya auto

justify ve alignItems Özellikleri:
*justify özelliği, öğelerin yatayda nasıl hizalanacağını belirler.
alignItems özelliği, öğelerin dikeyde nasıl hizalanacağını belirler.
Değerler: 'flex-start', 'center', 'flex-end', 'stretch', 'space-between', 'space-around'

spacing Özelliği:
*spacing özelliği, Grid bileşenindeki öğeler arasındaki boşluğu belirler.
Değer: Birim (örneğin, 2 veya theme.spacing(2))

direction Özelliği:
*direction özelliği, öğelerin nasıl sıralanacağını belirler (yatay veya dikey).
Değerler: 'row', 'row-reverse', 'column', 'column-reverse'
*/

/*
async function pushToFormData(e) {//ByCodeiumAI
    const img = e.target.files[0];

    // inputStream ve buffer değişkenlerini tanımlama
    let inputStream = new ReadableStream({
      start: async controller => {
        const reader = new FileReader();
        reader.onload = function () {
          controller.enqueue(new Uint8Array(reader.result));
          controller.close();
        }
        reader.readAsArrayBuffer(img);
      }
    });
    let buffer = new ArrayBuffer(1024); // 1024 baytlık bir bellek alanı oluştur

    // Geri kalan kod parçası
    let chunks = [];
    let bytesRead;

    while ((bytesRead = await inputStream.read(buffer)) !== null) {
      let chunk = new Uint8Array(buffer.slice(0, bytesRead));
      chunks.push(chunk);
    }

    let concatenatedChunks = new Uint8Array(
      chunks.reduce((totalLength, chunk) => totalLength + chunk.length, 0)
    );

    let offset = 0;
    for (let chunk of chunks) {
      concatenatedChunks.set(chunk, offset);
      offset += chunk.length;
    }

    var x = concatenatedChunks;
    setFormData({ ...formData, photo: x });
    console.log("INFO - Random Image: " + concatenatedChunks.length);
  }
  async function fileToByteArray(file) {
    const arrayBuffer = await file.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer);

    return byteArray;

  }*/



  /*
    const handleImg = (e) => {
    const img = e.target.files[0];
    const imgObject = new FormData();

    // const x = fileToByteArray(img);
    const blob = arrayToBlob(x);

    imgObject.append('resim', blob);
    console.log("Image Types => : ");
    console.log(imgObject.get('resim'));
    console.log(img);

    // setFormData({ ...formData, photo: btoa(imgObject.get('resim')) });

    // pushToFormData(img);
  };
  */