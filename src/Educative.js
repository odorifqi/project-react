import "./Educative.css";
import React from "react";
import { useState, useEffect } from "react";
import { Clock } from "./Jam";

const List = ({ list }) =>
  list.map(({ objectID, ...others }) => <Item key={objectID} item={others} />);

const Item = ({ item }) => (
  <div>
    <ul>
      <li>
        <a href={item.url}>{item.title}</a>
      </li>
      <li>{item.author}</li>
      <li>{item.num_comments}</li>
      <li>{item.points}</li>
    </ul>
  </div>
);

const Search = ({ handleSearch, children }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" onChange={handleSearch} value={children} />
    <p>
      searching for:
      <strong>{children}</strong>
    </p>
  </div>
);

//custom hook
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
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

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const handleSearch = (ev) => {
    setSearchTerm(ev.target.value);
  };

  const searchStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Clock>time: </Clock>
      <h1>My Hacker Stories</h1>
      <Search handleSearch={handleSearch}>{searchTerm}</Search>
      <hr />
      <List list={searchStories} />
    </div>
  );
};

export default Educative;
