# React

### Reconciliation
The algorithm React uses to diff one tree with another to determine which parts need to be changed.

The reason it can support so many targets is because React is designed so that reconciliation and rendering are separate phases. The reconciler does the work of computing which parts of a tree have changed; the renderer then uses that information to actually update the rendered app.

This separation means that React DOM and React Native can use their own renderers while sharing the same reconciler, provided by React core.

### [Declarative vs Imperative]( https://stackoverflow.com/questions/1784664/what-is-the-difference-between-declarative-and-imperative-paradigm-in-programmin#:~:text=Declarative%20programming%20%3A%20is%20a%20programming,control%20flow(How%20do).&text=Imperative%20programming%20%3A%20is%20a%20programming,that%20change%20a%20program%20state.)
`Imperative programming` - you tell the compiler what you want to happen, step by step. <br>
`Declarative programming` - on the other hand, you write code that describes what you want, but not necessarily how to get it <br>

```
// Imperative
List<int> collection = new List<int> { 1, 2, 3, 4, 5 };
List<int> results = new List<int>();
foreach(var num in collection)
{
    if (num % 2 != 0)
          results.Add(num);
}

//declarative
var results = collection.Where( num => num % 2 != 0);

```

### [PureComponents vs Components]()
`PureComponent` is exactly the same as `Component` except that it handles the `shouldComponentUpdate` method for you. When props or state changes, `PureComponent` will do a shallow comparison(will check on one level only for primitives data types and for object/arrays it will check refreneces) on both props and state. Component on the other hand won’t compare current props and state to next out of the box. Thus, the component will re-render by default whenever `shouldComponentUpdate` is called.

### [Shallow Comparison vs Deep Comparison]()
**Shallow** compare works by checking if two values are equal in case of primitive types like string, numbers and in case of object it just checks the reference. So if you shallow compare a deep nested object it will just check the reference not the values inside that object. <br>
When comparing previous props and state to next, a shallow comparison will check that primitives have the same value (eg, 1 equals 1 or that true equals true) and that the references are the same between more complex javascript values like objects and arrays. <br>
**Deep** compare works on value of nested object as well. <br>

### React.memo
```const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```
Custom comparision function
```
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```

React.memo is a higher order component

### React.createRef <br>
React.createRef creates a ref that can be attached to React elements via the ref attribute. React will assign the current property with the DOM element when the component mounts, and assign it back to **null** when it unmounts. ref updates happen before componentDidMount or componentDidUpdate lifecycle methods. <br>
By default, you may not use the ref attribute **on**(it's on not in) function components because they don’t have instances. If we want to ref **on** functional components then we can use forwardRef.
But we can use ref(useRef()) inside the functional components
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }
  
  render() {
    // for normal elements
    return <input type="text" ref={this.inputRef} />;

    // This will *not* work!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```
Ref within functional component
```
function CustomTextInput(props) {
  // textInput must be declared here so the ref can refer to it
  const textInput = useRef(null);
  
  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```

### React.forwardRef
React.forwardRef creates a React component that forwards the ref attribute it receives to another component below in the tree. This technique is not very common but is particularly useful in two scenarios:

Forwarding refs to DOM components
Forwarding refs in higher-order-components

React.forwardRef accepts a rendering function as an argument. React will call this function with props and ref as two arguments. This function should return a React node.

```
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;

```

### React.lazy & React.suspense 
React.lazy() lets you define a component that is loaded dynamically. This helps reduce the bundle size to delay loading components that aren’t used during the initial render.

React.Suspense lets you specify the loading indicator in case some components in the tree below it are not yet ready to render. Today, lazy loading components is the only use case supported by <React.Suspense>:
```
// This component is loaded dynamically
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

### [React Lifecycle - Diagram Attched](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
`componentDidMount()` - best place for api calls and subscription <br>  
`componentDidUpdate()` - best place for api calls <br>
You should not call setState() in componentWillUnmount() because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again. <br> 
`shouldComponentUpdate()`- will not call on initial render or when forceupdate() is used <br>
`static getDerivedStateFromProps()` -  is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing. this will not be accessible here <br> 
This method exists for rare use cases where the state depends on changes in props over time. For example, it might be handy for implementing a <Transition> component that compares its previous and next children to decide which of them to animate in and out. <br>
`getSnapshotBeforeUpdate()` - getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle will be passed as a parameter to componentDidUpdate() <br>

```
getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }
```

### Error boundaries
`static getDerivedStateFromError(error)` - This lifecycle is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state. <br>
`componentDidCatch` - This lifecycle is invoked after an error has been thrown by a descendant component. It receives two parameters: error and info(with component stack). <br>
Error boundaries do not catch errors for: <br>
* Event handlers (learn more)
*  Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
*  Server side rendering
*  Errors thrown in the error boundary itself (rather than its children)

```
    static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
```

[`setState`](https://stackoverflow.com/questions/48563650/does-react-keep-the-order-for-state-updates/48610973#48610973) - Internally React event handlers are all being wrapped in unstable_batchedUpdates which is why they're batched by default. **the behavior is different depending on whether you're in an event handler or not.**React only batches inside event handlers by default. This will change in future versions, and the behavior will be more straightforward then
```
promise.then(() => {
  // Forces batching
  ReactDOM.unstable_batchedUpdates(() => {
    this.setState({a: true}); // Doesn't re-render yet
    this.setState({b: true}); // Doesn't re-render yet
    this.props.setParentState(); // Doesn't re-render yet
  });
  // When we exit unstable_batchedUpdates, re-renders once
});
```

## React DOM
* `render()` - ReactDOM.render() currently returns a reference to the root ReactComponent instance. However, using this return value is legacy and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root ReactComponent instance, the preferred solution is to attach a callback ref to the root element. <br>
* `hydrate()` - Same as render(), but is used to hydrate a container whose HTML contents were rendered by ReactDOMServer. React will attempt to attach event listeners to the existing markup. <br> 
* `unmountComponentAtNode()` - ReactDOM.unmountComponentAtNode(container) ==> cannot be used on function components.Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount <br>
* `findDomNode()` - cannot be used on function components. <br>
* `createPortal()` - ReactDOM.createPortal(child, container) ==> Portals provide a way to render children into a DOM node that exists outside the hierarchy of the DOM component. <br>

## ReactDOMServer
* `renderToString()` - You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes. <br>
* `renderToStaticMarkup()` - Similar to renderToString, except this doesn’t create extra DOM attributes that React uses internally, such as data-reactroot. <br>
* `renderToNodeStream()` -  server only method - Returns a **Readable stream** that outputs an HTML string.. The stream returned from this method will return a byte stream encoded in utf-8 <br>
* `renderToStaticNodeStream()` - Similar to renderToString, except this doesn’t create extra DOM attributes that React uses internally, such as data-reactroot. <br>

## Dom elements

* `dangerouslySetInnerHTML` - it prevent us from Cross site scripting (XSS - means hackers can set their script and bypass some  acess constrols like access origin etc.) attacks <br>
```
function createMarkup() {
    return {__html: 'First &middot; Second'};
}
function MyComponent() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```
 
* `style` - used for inline css
```
const divStyle = {
    color: 'blue',
    backgroundImage: 'url(' + imgUrl + ')',
};
function HelloWorldComponent() {
    return <div style={divStyle}>Hello World!</div>;
}
```

### Events
* **Synthetic events vs Browser events** <br>
Your event handlers will be passed instances of SyntheticEvent, a **cross-browser wrapper around the browser’s native event**. It has the same interface as the browser’s native event, including stopPropagation() and preventDefault(), except the events work identically across all browsers. <br>
In simple words browser's events may vary across the different browsers but synthetic events handle all native internally and provide own event handles, so infuture if browser event get change, react handle it own self <br>
* In normal javascript we can return false for event but in react we have to call e.preventDefault and here e is synthetic event.

# Advance Guides
### Accessibility - 
* `Labeling`
```
<label htmlFor="namedInput">Name:</label> // htmlFor is for of DOM
<input id="namedInput" type="text" name="name"/>
```
* [`Removing outline while focusing through keyboard`](https://reactjs.org//static/dec0e6bcc1f882baf76ebc860d4f04e5/4fcfe/keyboard-focus.png) - outline: 0
* `Eslint plugin for accessibility` - eslint-plugin-jsx-a11y

### Code spliting 
* Bundling Tools - Webpack, Rollup, Browserify

### Higher Order Components
A higher-order component is a function that takes a component and returns a new component, and we are using this pattern to reuse common code across the components. <br>
```
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
* `compose` - TODO
```
// Detail - connect is a function that returns another function
// The returned function from connect is a HOC, which returns a component that is connected
// to the Redux store
In other words, connect is a higher-order function that returns a higher-order component!
// Instead of doing this...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... you can use a function composition utility
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const enhance = compose(
  // These are both single-argument HOCs
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```
**Static Methods Must Be Copied Over** <br>
When you apply a HOC to a component, though, the original component is wrapped with a container component. That means the new component does not have any of the static methods of the original component. <br>
```
// Define a static method
WrappedComponent.staticMethod = function() {/*...*/}
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true
```
To solve this ==>
```
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Must know exactly which method(s) to copy :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```
**Ref will not pass through HOC as they are not props like key.  Actually ref refers to an instance of the outermost container component, not the wrapped component. The solution for this problem is to use the React.forwardRef API.**

### [JSX In depth](https://reactjs.org/docs/jsx-in-depth.html) 
Booleans, Null, and Undefined Are Ignored, Always use boolean comparison to condionally rendered item <br>

### Portals 
Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component
```
ReactDOM.createPortal(child, container)
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>

// Modal Class==>
render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }

// parent Class 
    <Modal>
      <Child />
    </Modal>
```

### Profiler API
The Profiler measures how often a React application renders and what the “cost” of rendering is. Its purpose is to help identify parts of an application that are slow and may benefit from optimizations such as memoization. <br>
And it Disabled on production build but we can enable it. <br> 
We can render it anywhere in the tree to measure the code of rendering part and can have multiple profiler as well
```
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Profiler id="Main" onRender={callback}>
      <Main {...props} />
    </Profiler>
  </App>
);
```
[onRender Callback](https://reactjs.org/docs/profiler.html#onrender-callback) <br>
```
function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...
}
```
### Render Props 
A render prop is a function prop that a component uses to know what to render. A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

```
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

### Strict Mode 
StrictMode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants. <br>
Strict mode checks are run in development mode only; they do not impact the production build. <br>
```
<div>
      <Header />
      <React.StrictMode> // it enables strict mode
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
```

### React vs WebComponents 
Web Components often expose an imperative API. For instance, a video Web Component might expose play() and pause() functions. To access the imperative APIs of a Web Component, you will need to use a ref to interact with the DOM node directly.

 


### [Composition vs Inheritence]()
Composition provide all the usecase which we can achieve through inheritence. in Composition we can pass component as props and render them. and reuse the component code

 








### Is the Shadow DOM the same as the Virtual DOM?

### Performance tips
* Using `Function.prototype.bind` in render creates a new function each time the component renders, which may have performance implications <br>
* Using an `arrow function` in render creates a new function each time the component renders, which may break optimizations based on strict identity comparison.

### General Ques
* **How do I pass a parameter to an event handler or callback? binded** <br>
<button onClick={this.handleClick.bind(this, id)} />

* **How to get data from data-\* attributes** <br>
e.target.dataset.letter to get data-letter

* `throttling` - sample changes based on a time based frequency (eg _.throttle)
* `debouncing` - publish changes after a period of inactivity (eg _.debounce)

* `Suspense` - showing loader before rendering

* **How to check given object is valid React JS object** <br>
React.isValidElement(object) <br>



 





