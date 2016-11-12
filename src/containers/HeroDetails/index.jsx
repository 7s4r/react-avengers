import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadHero } from './ducks'

class Content extends Component {
  componentWillMount() {
    this.props.loadHero(this.props.id)
  }

  render() {
    if (!this.props.hero.getIn([0, 'id'])) {
      return (<p>No details</p>)
    }

    return (
      <div>
        <img src={this.props.hero.get('thumbnail')} alt="" />
        <h2>{this.props.hero.get('name')}</h2>
        <div>{this.props.hero.get('description')}</div>
      </div>
    )
  }
}

Content.propTypes = {
  id: React.PropTypes.number.isRequired,
  hero: React.PropTypes.object,
  loadHero: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    hero: state.hero
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadHero }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
