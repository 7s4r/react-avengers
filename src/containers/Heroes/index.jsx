import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadHeroes } from './ducks'
import './heroes.scss'

class Content extends Component {
  componentWillMount() {
    this.props.loadHeroes()
  }

  renderList() {
    if (!this.props.heroes.getIn([0, 'id'])) {
      return (<p>No heroes</p>)
    }

    return this.props.heroes.map((hero) => {
      return (
        <li key={hero.get('id')}>
          <h2>{hero.get('name')}</h2>
          <img src={hero.get('thumbnail')} alt="" />
          <Link to={`heroes/${hero.get('id')}`}>Details</Link>
        </li>
      )
    })
  }

  render() {
    return (
      <ul>
        { this.renderList() }
      </ul>
    )
  }
}

Content.propTypes = {
  heroes: React.PropTypes.object,
  loadHeroes: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    heroes: state.heroes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadHeroes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
