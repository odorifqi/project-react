import "./Educative.css";
import React from "react";
import { useState, useEffect } from "react";
import { Clock } from "./Jam";
import { SW } from "./Stopwatch";
import styled from "styled-components";
import { ReactForm } from "./FormComposed";

const List = ({ list, removeList }) =>
  list.map((list) => (
    <Item key={list.objectID} item={list} removeList={removeList} />
  ));

const Item = ({ item, removeList }) => (
  <div>
    <ul>
      <li>
        <a href={item.url}>{item.title}</a>
      </li>
      <li>{item.author}</li>
      <li>{item.num_comments}</li>
      <li>{item.points}</li>
    </ul>
    <button onClick={() => removeList(item.objectID)}>remove</button>
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

  const [story, setStory] = useState(stories);
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "");

  const handleSearch = (ev) => {
    setSearchTerm(ev.target.value);
  };

  const searchStories = story.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeList = (id) => {
    const newList = story.filter((list) => list.objectID !== id);
    setStory(newList);
  };

  return (
    <div>
      <FlexDiv>
        <Clock>time: </Clock>
        <SW />
        <ReactForm />
      </FlexDiv>
      <h1>My Hacker Stories</h1>
      <Search handleSearch={handleSearch}>{searchTerm}</Search>
      <hr />
      <List list={searchStories} removeList={removeList} />
    </div>
  );
};

export default Educative;

const FlexDiv = styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
