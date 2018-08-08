import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Input,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';

import {
  FacebookIcon,
  YoutubeIcon,
  EmailOutlineIcon,
} from 'mdi-react';
import Sidebar from '../Sidebar';
import './Navigation.css';

const style = {
  appBar: {
    backgroundColor: '#04091e',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  secondaryAppBar: {
    backgroundColor: '#04091e',
    margin: '0 15px',
    width: 'auto',
  },
};

const styles = {
  inputSearch: {
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
    position: 'relative',
    transition: 'opacity 0.1s ease, top 0.2s ease',
  },
  inputSearchHidden: {
    opacity: 0,
    top: -45,
  },
  inputSearchShowed: {
    opacity: 1,
    top: 0,
  },
};

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.goToSignIn = this.goToSignIn.bind(this);
    this.goToNewsContainer = this.goToNewsContainer.bind(this);
    this.goToCreateNews = this.goToCreateNews.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);

    this.state = {
      isSidebarOpen: false,
      isSearchHidden: true,
    };
  }

  onLogOut() {
    const { onLogOut, history } = this.props;

    this.toggleSidebar();
    onLogOut(history);
  }

  setSidebarState(open) {
    this.setState({
      isSidebarOpen: open,
    });
  }

  toggleSidebar() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
    });
  }

  goToSignIn() {
    const { goToSignIn, history } = this.props;

    this.toggleSidebar();
    goToSignIn(history);
  }

  goToNewsContainer() {
    const { goToNewsContainer, history } = this.props;
    goToNewsContainer(history);
  }

  goToCreateNews() {
    const { goToCreateNews, history } = this.props;

    this.toggleSidebar();
    goToCreateNews(history);
  }

  toggleSearch() {
    this.setState({
      isSearchHidden: !this.state.isSearchHidden,
    });
  }

  render() {
    const { appBar, toolbar, secondaryAppBar } = style;
    const { isAuthorized } = this.props;
    const { inputSearch, inputSearchHidden, inputSearchShowed } = this.props.classes;
    const { isSidebarOpen, isSearchHidden } = this.state;
    return (
      <nav>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarState={open => this.setSidebarState(open)}
          goToSignIn={this.goToSignIn}
          goToCreateNews={this.goToCreateNews}
          onLogOut={this.onLogOut}
          isAuthorized={isAuthorized}
        />

        <AppBar style={appBar} position="static">
          <Toolbar style={toolbar}>
            <div>
              <IconButton color="inherit">
                <FacebookIcon size={14} />
              </IconButton>

              <IconButton color="inherit">
                <YoutubeIcon size={14} />
              </IconButton>
            </div>

            <IconButton color="inherit">
              <EmailOutlineIcon size={14} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div
          className="logo-container"
          onClick={this.goToNewsContainer}
          role="presentation"
        >
          <img alt="logo" src="https://drive.google.com/uc?id=1U_HEoR8c2kubf6-JsbHEcwo564J5zjlE" />
          <h1>Alarms blog</h1>
        </div>

        <AppBar style={secondaryAppBar} position="static">
          <Toolbar style={toolbar}>
            <div className="navigation-wrapper">
              <IconButton onClick={this.toggleSidebar} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                Menu
              </Typography>
            </div>
            <div>
              <Input
                className={[inputSearch, isSearchHidden ? inputSearchHidden : inputSearchShowed].join(' ')}
                disableUnderline
                placeholder="Search by tag"
              />
              <IconButton onClick={this.toggleSearch} color="inherit">
                <Search />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </nav>
    );
  }
}

Navigation.propTypes = {
  goToSignIn: PropTypes.func.isRequired,
  goToNewsContainer: PropTypes.func.isRequired,
  goToCreateNews: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    inputSearch: PropTypes.string.isRequired,
    inputSearchHidden: PropTypes.string.isRequired,
    inputSearchShowed: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Navigation);
