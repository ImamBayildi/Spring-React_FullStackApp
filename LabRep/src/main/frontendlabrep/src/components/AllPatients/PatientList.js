import React, { useEffect, useState } from "react"
import Cards from "./Cards";
import { Link, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useContext } from "react";
import { UserContext } from "../../context/Context";
import { Logout } from "@mui/icons-material";

export default function PatientList() {
  const { contextUser } = useContext(UserContext);
  const [list, setList] = useState([]);

  // {
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: 'Bearer Token',
  //     'X-Custom-Header': 'header value'
  //   }
  // }


  useEffect(() => {
    fetch("/report/getAll", {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${contextUser.token}`,
    }
    })
      .then(response => {
        if (response.status === 403) Logout()
        else if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      }).then(data => {

        const groupedData = {};

        data.forEach((item) => {
          const { tc, diagnosis, details, reportDate } = item;

          if (!groupedData[tc]) {
            groupedData[tc] = {
              id: item.id,
              fullName: item.fullName,
              tc: tc,
              reports: [{ diagnosis, details, reportDate }],
              photo: item.photo
            };
          } else {
            groupedData[tc].reports.push({ diagnosis, details, reportDate });
          }
        });

        const mergedData = Object.values(groupedData);

        // console.log("Merged Data : " + mergedData)
        return mergedData
      })
      .then(mergedData => setList(mergedData))
      // .then(mergedData => {console.log(mergedData[0])})
      .catch(error => {
        console.error("Fetch error:", error);
      });
  }, []);


  const [searchValue,setSearchValue] = useState("");
  function handleChange(param) {
    setSearchValue(param)
  }



  //list[x].reports: {diagnosis,details,reportDate}


  return (
    <>
      <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: 'space-evenly' }}>
        <div style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
          <h1>Tüm Hastaların Listesi</h1>
          <h4>Sunucu başlatıldığında rastgele üretilen veriler burada <u>kimlikleriyle</u> birleştirilerek tek kullanıcı halinde gösterilmiştir.</h4>
          <h4>Ayrıca API aracılığıyla rastgele fotoğraflar veri tabanına kaydedilir. Back-end'i yeniden başlattığınızda resim listesi değişir.</h4>
          <p>Resimlerin kaynağı : <Link to="https://picsum.photos/">https://picsum.photos/</Link> main methodunda bu parametreleri değiştirebilirsiniz.</p>
          {/* <p>Kartlara ait butonlar henüz çalışmıyor.</p> */}
        </div>
        <Grid container justifyContent="center">
        <TextField autoComplete= "off" id="search" label="Search with name" variant="filled" 
        sx={{ width: '20%' }} onChange={(e) => handleChange(e.target.value)}>
          
        </TextField>
          </Grid>

        {searchValue === ""?  (list.map((user) => (
          <div key={user.id}>
            <Cards  {...user} />
            <div style={{ height: '100px' }}></div>
          </div>
        ))
        ): (
          list.map((user) => (
            user.fullName.includes(searchValue) === true ? (
              <div key={user.id}>
              <Cards  {...user} />
              <div style={{ height: '100px' }}></div>
              </div>
            ) : (null)
            
          ))

        )}
      </div>
    </>
  );


}




