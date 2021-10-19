export const DateToday = () => {
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
