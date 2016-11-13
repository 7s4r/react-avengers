import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import Info from 'material-ui/svg-icons/action/info'
import { loadHeroes } from './ducks'
import styles from './styles'

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
        <GridTile
          key={hero.get('id')}
          title={hero.get('name')}
          subtitle={<span>{hero.get('description')}</span>}
          actionIcon={<IconButton><Info color="white" /></IconButton>}
        >
          <img src={hero.get('thumbnail')} width="100%" alt="" />
          <Link to={`heroes/${hero.get('id')}`}>Details</Link>
        </GridTile>
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
          <Subheader>Liste des super héros :</Subheader>
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
