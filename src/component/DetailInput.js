export const DetailInput = ({ getPrice }) => {
  const handleResult = (e) => {
    e.preventDefault();
    getPrice(e);
  };

  return (
    <div>
      <h2>Rincian</h2>
      <form action="" onSubmit={handleResult}>
        <p className="highlight">Harga per kg(Rp)</p>
        <div className="detail-input-div">
          <input
            type="number"
            name="price"
            id="price"
            placeholder="ex:11000"
            required
          />
        </div>
        <p className="highlight">Persentase (%)</p>
        <div className="detail-input-div">
          <input
            type="number"
            name="percent"
            id="percent"
            placeholder="ex:50"
            required
          />
        </div>
        <input id="detailBtn" type="submit" value="submit" />
      </form>
    </div>
  );
};
