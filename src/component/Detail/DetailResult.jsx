export function DetailResult({ price, total, personData }) {
  const totalPrice = price.perkg * total;
  const percent = price.percent * 0.01;
  const percentPrice = totalPrice * percent;

  const person = [];

  if (price.perkg) {
    for (const key in personData) {
      person.push({
        name: personData[key].name,
        value: (totalPrice * percent * personData[key].value) / total,
        key: personData[key].id,
      });
    }
  }

  return (
    <div id="detail-result-div">
      <SubDR title="Hasil total">Rp{totalPrice.toLocaleString("id-ID")}</SubDR>
      <SubDR title="Pendapatan">Rp{percentPrice.toLocaleString("id-ID")}</SubDR>
      <SubDR title="Pendapatan per pihak">
        {person.map((x) => (
          <ListPerson x={x} key={`list_${x.key + 1}`} />
        ))}
      </SubDR>
    </div>
  );
}

function ListPerson({ x }) {
  return (
    <div style={{ paddingTop: "10px" }}>
      <span>
        {x.name || "unknown"}: Rp{x.value.toLocaleString("id-ID")}
      </span>
      <hr />
    </div>
  );
}

function SubDR({ children, title }) {
  return (
    <div className="sub-dr">
      <p className="highlight">{title}</p>
      <div className="sub-result-div">
        <p id="priceTotal" className="result-text">
          {children}
        </p>
      </div>
    </div>
  );
}
