import React from 'react';
import { Menu } from '../../../../react-ui/components/index.js';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { activeTopMenu } from '../actions.js';
import { connect } from 'react-redux';

class TopMenu extends React.Component {
  static defaultProps = {
    list: []
  }
  static propTypes = {
    list: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context);
    this.setSelectedKey = this.setSelectedKey.bind(this);
    this.getItems = this.getItems.bind(this);
  }

  /**
   * 计算被选中选项key
   */
  setSelectedKey() {
    var navItems = this.props.list;
    var i;
    for (i=0; i < navItems.length; i++) {
      if (navItems[i].actived) {
        return navItems[i].key;
      }
    }
    return undefined;
  }
  getItems() {
    const { list, onClick } = this.props;
    const items = list.map((item, index) => {
      return (
        <Menu.Item key={ item.key } onClick={(ev) => {
          onClick(index)
        }}>
          <Link to={item.link}>{ item.name }</Link>
        </Menu.Item>
      );
    });
    return items;
  }
  render () {
    return (
      <Menu selectedKey={ this.setSelectedKey() } mode="horizontal" style={{ lineHeight: '64px' }}>
        { this.getItems() }
      </Menu>
    )
  }
}

// export const stateKey = 'topMenu'

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.topMenu
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (index) => dispatch(activeTopMenu(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu)