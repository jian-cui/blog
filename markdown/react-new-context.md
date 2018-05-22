# React16.3.0中新context用法

React v16.3.0context做了较大的修改，使用新的api `React.createContext`来创建两个组件`Provider`和`Consumer`

```javascript
const {Provider, Consumer} = React.createContext(someDefaultValue);
```
someDefaultValue为初始值

```jsx
<Provider value={/* some value */}>
```
  (老想起react-redux中的Provider组件，也的确非常相似)

```jsx
<Consumer>
  { value =>  /* Component */ }
</Consumer>
```
Consumer用来接收值并且传递给子组件


下面看一个例子：

*personContext.js*:

```jsx
const defaultPerson = {
  name: 'JC',
  age: 16
}

export const PersonContext = React.createContext(defaultPerson);
```

*schoolContext.js*

```javascript
const defaultSchool = {
  name: 'First High School'
}

export const SchoolContext = React.createContext(defaultSchool);
```

*app.js*

```jsx
import {PersonContext} from 'personContext.js';
import {SchoolContext} from 'schoolContext.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: 'ZJ',
        age: 18
      },
      school: {
        name: 'Private High School'
      }
    }
  }

  render() {
    return (
      <SchoolContext.provider value={this.state.school}>
        <PersonContext.provider value={this.state.person}>
          <Content />
        </PersonContext.provider>
      </SchoolContext.provider>
    )
  }
}
```

*content.js*

```jsx
import {PersonContext} from 'personContext.js';
import {SchoolContext} from 'schoolContext.js';

class Content extends React.Component {
  render() {
    return (
      <SchoolContext.Consumer>
        {
          school => (
            <PersonContext.Consumer>
              {
                person => (
                  <SomeComponent school={school} person={person} />
                )
              }
            </PersonContext.Consumer>
          )
        }
      </SchoolContext.Consumer>
    )
  }
}
```

参考：
> <https://reactjs.org/docs/context.html>