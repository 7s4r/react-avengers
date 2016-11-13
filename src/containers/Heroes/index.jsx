import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Info from 'material-ui/svg-icons/action/info'
import { loadHeroes } from './ducks'
import styles from './styles'

class Content extends Component {
  static handleTouchTap(event) {
    event.preventDefault()

    const heroId = event.currentTarget.key

    browserHistory.push(`/heroes/${heroId}`)
  }

  componentWillMount() {
    this.props.loadHeroes()
  }

  renderList() {
    if (!this.props.heroes.getIn([0, 'id'])) {
      return (<p>No heroes</p>)
    }

    return this.props.heroes.map((hero) => {
      return (
        <Link key={hero.get('id')} to={`heroes/${hero.get('id')}`}>
          <GridTile
            title={hero.get('name')}
            subtitle={<span>{hero.get('description')}</span>}
            actionIcon={<IconButton><Info color="white" /></IconButton>}
            onTouchTap={this.handleTouchTap}
          >
            <img src={hero.get('thumbnail')} width="100%" alt="" />
          </GridTile>
        </Link>
      )
    })
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
          { this.renderList() }
        </GridList>
      </div>
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
