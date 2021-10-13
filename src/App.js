import "./App.css";
import React from "react";

const Tanggal = () => {
  const tgl = new Date();
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const day = ["Minggu", "Senin", "Selasa", "Rabu", " Kamis", "Jumat", "Sabtu"];

  return (
    <p>
      Tanggal:{" "}
      <strong>
        {day[tgl.getDay()]}, {tgl.getDate()} {months[tgl.getMonth()]}{" "}
        {tgl.getFullYear()}{" "}
      </strong>
    </p>
  );
};

const Button = ({ btnName, children }) => {
  return <button type="button">{btnName || children}</button>;
};

const InputPerson = () => (
  <div class="person-div focus">
    <input
      id="nameLabel_0"
      className="name-label"
      placeholder="nama"
      type="text"
    />
    <br />
    <input
      type="text"
      name="value"
      id="person_0"
      placeholder="10, 25, 31, ..."
    />
    <Button btnName="submit" />
    <p></p>
  </div>
);

const DetailInput = () => {
  return (
    <div>
      <h2>Rincian</h2>
      <form action="">
        <p class="highlight">Harga per kg(Rp)</p>
        <div class="detail-input-div">
          <input
            type="number"
            name="price"
            id="price"
            placeholder="ex:11000"
            required
          />
        </div>
        <p class="highlight">Persentase (%)</p>
        <div class="detail-input-div">
          <input
            type="number"
            name="percent"
            id="percent"
            placeholder="ex:50"
            required
          />
        </div>
        <input
          id="detailBtn"
          type="submit"
          value="submit"
          onclick="detailResult()"
        />
      </form>
    </div>
  );
};

const DetailResult = () => {
  return (
    <div id="detail-result-div">
      <SubDR>Hasil total</SubDR>
      <SubDR>Pendapatan</SubDR>
      <SubDR>Pendapatan per pihak</SubDR>
    </div>
  );
};

const SubDR = ({ children }) => (
  <div>
    <p class="highlight">{children}</p>
    <div class="sub-result-div">
      <p id="priceTotal" class="result-text"></p>
    </div>
  </div>
);

//slot pattern
const Frame = ({ ...data }) => {
  const { tanggal, title, addBtn, inputPerson, total } = data;
  return (
    <div>
      {tanggal}
      <div className="main-div">
        {title}
        <div className="clearfix">{addBtn}</div>
        {inputPerson}
        {total}
      </div>
    </div>
  );
};

const App = () => {
  const title = <em>COMMALATOR</em>;

  return (
    <div className="main-div">
      <Frame
        tanggal={<Tanggal />}
        title={<h1>Welcome to {title}</h1>}
        addBtn={<Button btnName="add" />}
        inputPerson={<InputPerson />}
        total={<p id="total">TOTAL</p>}
      />
      <DetailInput />
      <DetailResult />
    </div>
  );
};

export default App;
