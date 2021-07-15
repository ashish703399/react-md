let instance;
const logger = store => next => action => {
	console.log('Middleware log ==', action.type);
  return next(action);
}

const reducer = (state = {count:0}, action) => {
	switch(action.type){
  	case 'INC': {
    	let value = state['count'] ? state['count'] : 0;
    	return Object.assign({}, {...this.state}, {count: ++value});
    };
    case 'DEC': {
    	let value = state['count'] ? state['count'] : 0;
    	return Object.assign({}, {...this.state}, {count: value - 1});
    }
    return state;
  }
}

class Redux{
	constructor(reducer, initialState){
  	if(instance){
    	throw new Error('Instance already exists')
    }
    instance = this;
    this.obserable = [];
    this.state = initialState;
    this.reducer = reducer;
    this.middleware;
  }

  getState(key){
  	return key ? this.state[key] : this.state;
  }

  addMiddleware(middleware){
  	this.middleware = middleware;
  }

  dispatch(action){
  	const {type, value} = action;
  	this.middleware(this.state)(()=>{
      this.state = this.reducer(this.state, action);
      this.notify();
    })(action);

  }

  notify(){
  	this.obserable.forEach(cb => cb(this.state));
  }

  subscribe(cb){
  	this.obserable.push(cb);
    return ()=> {
    	this.unsubscribe(cb)
      return "unsubscribed"
    } ;
  }

   unsubscribe(cb){
    this.obserable = this.obserable.filter(fn => fn !== cb);
   }

}

function createStore(reducer, initialState = {}, middleware){
	const store = new Redux(reducer, initialState);
  store.addMiddleware(middleware);
  return store;
}

const store = createStore(reducer, {name:"ashish"}, logger);
//console.log('initial state ==> ', store.getState());
const unsebs1 = store.subscribe(updatedState => {
	console.log('updated State cb 1', updatedState);
});
const unsebs2 = store.subscribe(updatedState => {
	console.log('updated State cb 2', updatedState);
});
//console.log(unsebs1());

store.dispatch({type:"INC", value : {key:'tarun'}});
store.dispatch({type:"INC", value : {key:'tarun1234'}});
//store.dispatch({type:"DEC", value : {key:'tarun'}});
console.log('getState again:', store.getState('count'));

