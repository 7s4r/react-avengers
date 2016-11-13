import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { loadHero } from './ducks'

class HeroDetails extends Component {
  componentWillMount() {
    this.props.loadHero(this.props.heroId)
  }

  renderList(type) {
    return this.props.hero.get(type).map((i) => {
      return (
        <ListItem key={i.name} primaryText={i.name} />
      )
    })
  }

  render() {
    if (!this.props.hero.get('id')) {
      return (<p>No hero</p>)
    }

    return (
      <div>
        <List>
          <ListItem
            leftAvatar={
              <Avatar src={this.props.hero.get('thumbnail')} />
            }
          >
            <font size="16">{this.props.hero.get('name')}</font>
            <br />
            <i>{this.props.hero.get('description')}</i>
          </ListItem>
        </List>
        <Subheader>Comics</Subheader>
        <List>
          {this.renderList('comics')}
        </List>
        <Divider />
        <Subheader>Series</Subheader>
        <List>
          {this.renderList('series')}
        </List>
      </div>
    )
  }
}

HeroDetails.propTypes = {
  heroId: React.PropTypes.number,
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

export default connect(mapStateToProps, mapDispatchToProps)(HeroDetails)
