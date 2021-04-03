# Unit Testing

### Enzyme
Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output.
Adapter is required here which used to provide compatibility with react. 

`npm i --save-dev enzyme enzyme-adapter-react-16`
// Configure Enzyme for the appropriate React adapter
`Enzyme.configure({ adapter: new Adapter() });`
shallow : 
mount : Mount is “real” rendering that will actually render your component into a browser environment. If you are creating full React components (and not just stateless components), you will want to use mount to do testing on the lifecycle methods of your component <br>
static : used for analyzing the actual HTML output of a component and will not be used in our tests <br>

### Chai
It is an assertion library

### Mocha
It is test runner and it is popular in React application

### Karma
It is test runner and it is popular in Angular application

### Jest










### Common Syntax

```diff
it('passes in v2 and v3', () => {
  const wrapper = mount(<Toggler />);
+  expect(wrapper.find('#root').text()).to.equal('off');
  wrapper.instance().toggle();
+  expect(wrapper.find('#root').text()).to.equal('on');
});

```

