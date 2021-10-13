import "./Educative.css";
import React from "react";

const List = (props) =>
  props.list.map((x) => (
    <div key={x.objectID}>
      <ul>
        <li>
          <a href={x.url}>{x.title}</a>
        </li>
        <li>{x.author}</li>
        <li>{x.num_comments}</li>
        <li>{x.points}</li>
      </ul>
    </div>
  ));

class User {
  constructor(name, job) {
    this.name = name;
    this.job = job;
  }

  getUser() {
    return `I am ${this.name} and i am a ${this.job}`;
  }
}

function UserInfo({ ...val }) {
  const { name = "user", job = "unknown" } = val;
  const user = new User(name, job);

  return <div>{user.getUser()}</div>;
}

const UserAddress = ({ city, nation }) => (
  <div>{`I live in ${city}, ${nation}`}</div>
);

const UList = ({ name, job, ...adress }) => (
  <ul>
    <UserInfo name={name} job={job} />
    <UserAddress {...adress} />
  </ul>
);

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (ev) => {
    onSearch(ev);
    setSearchTerm(ev.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <p>
        Searching for: <strong>{searchTerm}</strong>
      </p>
    </div>
  );
};

const Educative = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const user = {
    odo: {
      name: "Odo",
      nation: "Indonesia",
      city: "Palembang",
      job: "Designer",
    },
    rini: {
      name: "Rini",
      nation: "New Zealand",
      city: "Auckland",
      job: "CEO",
    },
  };

  const handleSearch = (ev) => {
    console.log(ev.target.value);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} />

      <hr />
      <List list={stories} />
      <UList {...user.odo} />
      <UList {...user.rini} />
    </div>
  );
};

export default Educative;
