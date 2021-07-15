import React, { useEffect } from "react";
import "./styles.css";

let mockdata = [];
let lastIndex = 50;
const setData = (initialKey = 0, lastKey = 50) => {
  mockdata = [];
  console.log("Ashish count", initialKey, lastKey);
  for (let i = initialKey; i < lastKey; i++) {
    mockdata.push({ title: i, key: i });
  }
  console.log("Ashish mock", mockdata);
  return mockdata;
};

const ListItem = (props) => (
  <div className="row" key={props.key}>
    {props.title}
  </div>
);

let option = {
  root: null,
  threshold: 0.0
};

const useListHook = (initialData) => {
  const [list, setList] = React.useState(initialData);
  const handleObserverCallBack = (changes) => {
    changes.forEach((element) => {
      if (element.intersectionRatio > 0) {
        setTimeout(() => {
          setList(() => {
            lastIndex = lastIndex + 50;
            return setData(0, lastIndex);
          });
        }, 3000);
      }
    });
  };
  const observer = new IntersectionObserver(handleObserverCallBack, option);
  useEffect(() => {
    const targetBottom = document.getElementById("scrollbottom");
    observer.observe(targetBottom);
    return () => {
      observer.disconnect();
    };
  }, []);
  return [list];
};

export default function App() {
  const [list] = useListHook(setData());
  const listHtml = list.map((item) => {
    return <ListItem {...item} />;
  });
  return (
    <div className="App">
      <div id="scrollarea">
        {listHtml}
        <div id="scrollbottom"></div>
      </div>
    </div>
  );
}
