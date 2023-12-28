import React from "react";
import { Copyright } from "./Login"

export default function ErrorPage(err) {

  return (
    <>
    <div id="error-page" style={{ textAlign: "center" }}>
      <h1>Hoppala...</h1>
      <h2>Bu sayfa henüz oluşturulmadı ya da fena çuvalladım!</h2>
      <h2>Sonraki versiyonu bekleyin.</h2>
      <h3>LabRep V0.0.1</h3>
      <h5>Lütfen yaşadığınız sorunları bana iletin.</h5>
      <p>
        <i>{err.statusText || err.message}</i>
      </p>
      <Copyright sx={{ textAlign: "bottom" }}></Copyright>
    </div>
    </>
  );
}