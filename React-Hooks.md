# [Hooks](https://reactjs.org/docs/hooks-overview.html)

Hooks are functions that provide us  React state and lifecycle features from function components.

##### Table of Contents
[Rules of Hooks](#user-content-rules-of-hooks)<br>
[Hooks API Reference](#user-content-hooks-api-reference)<br>
[Performance](#user-content-performance)<br>
[Custom hooks](#user-content-custom-hooks)<br>
[IntersectionObserver with hooks](#intersectionObserver)<br>


### Rules of Hooks
* Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions. <br>
* Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions. <br>
* **There is just one other valid place to call Hooks** - Custom hooks


**why useEffect hooks written in functional component only** <br>
Hooks embrace JavaScript closures and avoid introducing React-specific APIs where JavaScript already provides a solution.

Note : React also provide linter plugin to enforce above rules automatically. <br>


```
const Example = (props) => {
  // You can use Hooks here!
  return <div />;
}

function Example(props) {
  // You can use Hooks here!
  return <div />;
}
```

### Hooks API Reference
Basic Hooks
* [useState](#useState)
* [useEffect](#useEffect)
* [useContext](#useContext)

Additional Hooks
* [useReducer](#useReducer)
* [useCallback](#useCallback)
* [useMemo](#useMemo)
* [useRef](#useRef)
* [useImperativeHandle](#useImperativeHandle)
* [useLayoutEffect](#useLayoutEffect)
* [useDebugValue](#useDebugValue)

#### useState
If the new state is computed using the previous state, you can pass a function to setState. The function will receive the previous value, and return an updated value
```diff
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
+      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
+      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

**How to get the previous props or state? in functinol components which use useEffect**
``` diff
function Counter() {
  const [count, setCount] = useState(0);
+  const prevCountRef = useRef();
+  useEffect(() => {
+    prevCountRef.current = count;
+  });
+  const prevCount = prevCountRef.current;
  return <h1>Now: {count}, before: {prevCount}</h1>;
}
```

**Custom hook to get previous state or props** - Just moved main logic into custom hook
```
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <h1>Now: {count}, before: {prevCount}</h1>;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

```

**Lazy initial state** <br>
Means it will someExpensiveComputation when it actually required
```
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

#### useEffect
The function passed to useEffect will run after the render is committed to the screen

By default, effects run after every completed render, but you can choose to fire them only when certain values have changed.

#### useContext
const value = useContext(MyContext); <br>
Even if an ancestor uses React.memo or shouldComponentUpdate, a re-render will still happen starting at the component itself using useContext. <br>

**Correct**: useContext(MyContext) <br>
**Incorrect**: useContext(MyContext.Consumer) <br>
**Incorrect**: useContext(MyContext.Provider) <br>

```
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}

```
#### useReducer
```const [state, dispatch] = useReducer(reducer, initialArg, init);``` <br>
to Lazy initialization : You can also create the initial state lazily. To do this, you can pass an init function as the third argument. The initial state will be set to init(initialArg).



```
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

#### useCallback
```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);

```

Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).

useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).

#### useMemo
If no array is provided, a new value will be computed on every render.
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

#### useRef
```const refContainer = useRef(initialValue);```
useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.

The useRef() Hook isn’t just for DOM refs. The “ref” object is a generic container whose current property is mutable and can hold any value, similar to an instance property on a class.

A common use case is to access a child imperatively:

```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
// one more
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

Note : This works because useRef() creates a plain JavaScript object. The only difference between useRef() and creating a {current: ...} object yourself is that useRef will give you the same ref object on every render.

### useImperativeHandle
useImperativeHandle customizes the instance value that is exposed to parent components when using ref. As always, imperative code using refs should be avoided in most cases. useImperativeHandle should be used with forwardRef:

```
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```
In this example, a parent component that renders <FancyInput ref={inputRef} /> would be able to call inputRef.current.focus().

#### useLayoutEffect
If you use server rendering, keep in mind that neither useLayoutEffect nor useEffect can run until the JavaScript is downloaded. This is why React warns when a server-rendered component contains useLayoutEffect. To fix this, either move that logic to useEffect (if it isn’t necessary for the first render), or delay showing that component until after the client renders (if the HTML looks broken until useLayoutEffect runs).

To exclude a component that needs layout effects from the server-rendered HTML, render it conditionally with showChild && <Child /> and defer showing it with useEffect(() => { setShowChild(true); }, []). This way, the UI doesn’t appear broken before hydration.



### Performance

**the function passed to useEffect is going to be different on every render==>** <br>
This is intentional. In fact, this is what lets us read the count value from inside the effect without worrying about it getting stale. Every time we re-render, we schedule a different effect, replacing the previous one. In a way, this makes the effects behave more like a part of the render result — each effect “belongs” to a particular render. We will see more clearly why this is useful

**When exactly does React clean up an effect?** <br>
React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time

**How can React know which useState call corresponds to which state variable between re-renders?** <br>
React maintain own stack to call hooks, through which react know which state map to which hook something like that.. so if we put use hook in any condtion then this sequence get break and in that react may generate any bug.. that is why Don’t call Hooks inside loops, conditions, or nested functions. <br>
**There is an internal list of “memory cells” associated with each component**. They’re just JavaScript objects where we can put some data. When you call a Hook like useState(), it reads the current cell (or initializes it during the first render), and then moves the pointer to the next one. This is how multiple useState() calls each get independent local state.


### Custom hooks
**The two components using the same Hook share state?** <br>
No. Custom Hooks are a mechanism to reuse stateful logic (such as setting up a subscription and remembering the current value), but every time you use a custom Hook, all state and effects inside of it are fully isolated. <br>
Basicly Custom hook being used to share the commong logic betweeen the more components
```
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

function FriendListItem(props) {
  // isOnine will be different for every FriendListitem
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}

```

### General FAQ
**Do Hooks cover all use cases for classes?**
Our goal is for Hooks to cover all use cases for classes as soon as possible. There are no Hook equivalents to the uncommon getSnapshotBeforeUpdate, getDerivedStateFromError and componentDidCatch lifecycles yet, but we plan to add them soon.

**What can I do if my effect dependencies change too often?**
```
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // This effect depends on the `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` is not specified as a dependency

  return <h1>{count}</h1>;
}
```

// the empty set of dependencies, [], means that the effect will only run once when the component mounts, and not on every re-render. The problem is that inside the setInterval callback, the value of count does not change, because we’ve created a closure with the value of count set to 0 as it was when the effect callback ran. Every second, this callback then calls setCount(0 + 1), so the count never goes above 1.

Specifying [count] as a list of dependencies would fix the bug, but would cause the interval to be reset on every change. Effectively, each setInterval would get one chance to execute before being cleared (similar to a setTimeout.) That may not be desirable. To fix this, we can use the functional update form of setState. It lets us specify how the state needs to change without referencing the current state:

```
function Counter() {
     const [count, setCount] = useState(0);

     useEffect(() => {
       const id = setInterval(() => {
         setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside
       }, 1000);
       return () => clearInterval(id);
     }, []); // ✅ Our effect doesn't use any variables in the component scope

     return <h1>{count}</h1>;
   }
```

As a last resort, if you want something like this in a class, you can use a ref to hold a mutable variable. Then you can write and read to it. For example:

```
function Example(props) {
  // Keep latest props in a ref.
  const latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });

  useEffect(() => {
    function tick() {
      // Read latest props at any time
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // This effect never re-runs
}
```

**How do I implement shouldComponentUpdate?** <br>
```
const Button = React.memo((props) => {
     // your component
   });
```

**How to memoize calculations?**
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**initial state is expensive**

```
function Table(props) {
     // ⚠️ createRows() is called on every render
     const [rows, setRows] = useState(createRows(props.count));
     // ...
   }

   // To avoid re-creating the ignored initial state, we can pass a function to useState:
   function Table(props) {
     // ✅ createRows() is only called once
     const [rows, setRows] = useState(() => createRows(props.count));
     // ...
   }
```

Another example

// You might also occasionally want to avoid re-creating the useRef() initial value. For example, maybe you want to ensure some imperative class instance only gets created once:

```
function Image(props) {
  // ⚠️ IntersectionObserver is created on every render
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}
```

#### IntersectionObserver
// useRef does not accept a special function overload like useState. Instead, you can write your own function that creates and sets it lazily:

```
function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver is created lazily once
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // When you need it, call getObserver()
  // ...
}
```

**Are Hooks slow because of creating functions in render?** <br>
No. In modern browsers, the raw performance of closures compared to classes doesn’t differ significantly except in extreme scenarios.




