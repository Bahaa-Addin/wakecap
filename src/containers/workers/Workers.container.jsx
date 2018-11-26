import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import compose from 'recompose/compose';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Snackbar from '@material-ui/core/Snackbar';

import {ItemsList} from "../../components/workers-list/items-list/index";
import {Stats} from "../../components/workers-list/stats/index";

import {workerActions} from "../../state/actions/index";

import {styles} from './workers.styles';

class Workers extends Component {
  state = {
    selectedItem: null,
    snackbarOpen: false,
    snackbarMessage: ''
  };

  onSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  selectWorker = worker => () => {
    this.setState({ selectedItem: worker });
  };

  onChangePage = _page => {
    this.props.fetchWorkers({_page});
    this.setState(({currentPage: _page}))
  }

  render() {
    const { classes, width, worker, supervisor } = this.props;
    const {selectedItem, snackbarOpen, snackbarMessage, currentPage} = this.state;
    const anchor = 'left';

    const snackbar = (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={this.onSnackbarClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{snackbarMessage}</span>}
      />
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <ItemsList
            selectedItem={selectedItem}
            list={worker.data}
            isLoading={worker.isLoading}
            onSelect={this.selectWorker}
            currentPage={currentPage}
            onChangePage={this.onChangePage}
            total={30}
          />
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], 'hide-scrollbars', {
              [classes.contentShift]: (isWidthUp('md', width)),
              [classes[`contentShift-${anchor}`]]: isWidthUp('md', width)
            })}
          >
            {selectedItem ?
              <Stats
                worker={selectedItem}
                supervisor={supervisor.data.find(sv => sv.id === selectedItem.supervisor_id)}
              /> : <div></div>}
          </main>
          {snackbar}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  worker: state.worker,
  supervisor: state.supervisor
});

const mapDispatchToProps = (dispatch) => ({
  fetchWorkers: (params) => dispatch(workerActions.fetchWorkers(params)),
});

Workers.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
};

const composedWorkers = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWidth(),
  withStyles(styles, { withTheme: true })
)(Workers);
export {composedWorkers as Workers}
