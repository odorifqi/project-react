export const DetailResult = ({ price, total, personData }) => {
  const totalPrice = price.perkg * total;
  const percent = price.percent * 0.01;
  const percentPrice = totalPrice * percent;

  const person = [];

  if (price.perkg) {
    for (const [key, value] of Object.entries(personData)) {
      person.push({
        name: value.id,
        value: (totalPrice * percent * value.value) / total,
        key: key,
      });
    }
  }

  return (
    <div id="detail-result-div">
      <SubDR title="Hasil total">Rp{totalPrice.toLocaleString("id-ID")}</SubDR>
      <SubDR title="Pendapatan">Rp{percentPrice.toLocaleString("id-ID")}</SubDR>
      <SubDR title="Pendapatan per pihak">
        <PerPerson person={person} />
      </SubDR>
    </div>
  );
};

const PerPerson = ({ person }) =>
  person.map((x) => <ListPerson x={x} key={x.key} />);

const ListPerson = ({ x }) => (
  <>
    <span>
      {x.name || "unknown"}: Rp{x.value.toLocaleString("id-ID")}
    </span>
    <br />
  </>
);

const SubDR = ({ children, title }) => (
  <div>
    <p className="highlight">{title}</p>
    <div className="sub-result-div">
      <p id="priceTotal" className="result-text">
        {children}
      </p>
    </div>
  </div>
);
