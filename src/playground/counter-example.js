class Counter extends React.Component {

  constructor(props) {
    super(props)
    this.handleAddOne = this.handleAddOne.bind(this)
    this.handleMinusOne = this.handleMinusOne.bind(this)
    this.handleReset = this.handleReset.bind(this)

    this.state = {
      count: props.count
    }
  }

  componentDidMount() {

    try {

      const count = parseInt(localStorage.getItem('count'))

      if(!isNaN(count)) {
        this.setState(() => ({ count }))
      }

    }
    catch(e) {

    }

  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.count !== this.state.count) {
      localStorage.setItem('count', this.state.count)
      console.log(`data saved`)
    }
  }

  handleAddOne() {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      }
    })
  }

  handleMinusOne() {
    this.setState(prevState => {
      return {
        count: prevState.count - 1
      }
    })
  }

  handleReset() {
    this.setState(() => {
      return {
        count: 0
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    )
  }
}

Counter.defaultProps = {
  count: 0
}

ReactDOM.render(<Counter />, document.getElementById('app'))
