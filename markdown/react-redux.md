# React-Redux备忘

redux是实际使用过程中有几个问题：

1. store中的数据怎么传递给组件？
  如果通过props将数据一层层向下传递，不但繁琐而且也很容易出问题，这个时候就是**context**出现的时候了，只要在最顶层的组件中将store作为context传下来就可以了。
  react-redu中的Provider组件就是主要解决这个问题(所以他要放在最上层)

2. 怎么接收数据?
  上面我们已经通过context将数据发送了出去，难道我们的每个组件也都要通过context方式来接收数据吗？react-redux给出了解决方案，那就是**connect()高级组件**。通过connect()生成组件接收数据，再通过props传递给我们实际的组件，不但使用起来更方便，而且还减少了组件的复杂度。
  