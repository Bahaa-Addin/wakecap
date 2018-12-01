import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import compose from 'recompose/compose';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import uuid from 'uuid/v1';

import {BarChart} from "../../bar-chart";

import avatarIcon from '../../../assets/icons/user.svg';
import calendarIcon from '../../../assets/icons/calendar.svg';
import locationIcon from '../../../assets/icons/location.svg';
import helmetIcon from '../../../assets/icons/helmet.svg';
import idIcon from '../../../assets/icons/id-card.svg';
import timeIcon from '../../../assets/icons/time.svg';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Transition from 'react-transition-group/Transition';

import {styles} from './stats.styles';
import scss from './Stats.module.scss';

const Stats = ({classes, width, worker, supervisor}) => (
  <div className={scss["stats-container"]}>
    <div className={scss["stats-header"]}>
      <div className={scss["worker-info"]}>
        <Avatar alt={worker.name} src={avatarIcon} className={scss["stats-header-avatar"]}
        />

        <div className={scss["stats-header-title"]}>
          <Typography variant="title" align="left" gutterBottom>
            {worker.name}
          </Typography>
          <Typography variant="subheading" align="left" gutterBottom>
            Worker
          </Typography>
        </div>
        <div className={scss["stats-header-tags"]}>
          <Typography variant="overline" align="left" gutterBottom>
            Asset ID: <b>{worker.asset_id}</b>
          </Typography>
          <Typography variant="overline" align="left" gutterBottom>
            Tag ID: <b>{worker.tag_id} </b>
          </Typography>
        </div>
      </div>

      <div className={scss["supervisor-info"]}>
        <div className={scss["stats-header-title"]}>
          <Typography variant="title" align="left" gutterBottom>
            {supervisor.name}
          </Typography>
          <Typography variant="subheading" align="left" gutterBottom>
            Supervisor
          </Typography>
        </div>
      </div>
    </div>

    <Divider/>
    <Divider
      style={{
        margin: isWidthUp('md', width)
          ? '0 0 50px 20px'
          : '0 0 20px 20px'
      }}
    />

    <Transition timeout={1000} in={true} appear>
      {(status) => (
        <div className={classNames(classes.statsWrapper, scss[`stats-${status}`])}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={8}>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container justify="center" spacing={8}>
                  <Grid key={4} item xs={12} md={4} className={classes.widget}>
                    <div>
                      <div className={scss["worker-stats"]}>
                        <Avatar alt="Hours" src={calendarIcon} className={scss["stats-header-avatar"]}
                        />
                        <div className={scss["stats-header-title"]}>
                          <Typography variant="subtitle1">Total Hours Worked</Typography>
                          <Typography variant="h5" gutterBottom>
                            <b>{worker.hoursWorked.total}</b>
                          </Typography>
                        </div>
                      </div>
                      <div className={scss["worker-stats"]}>
                        <Avatar alt="Location" src={locationIcon} className={scss["stats-header-avatar"]}
                        />
                        <div className={scss["stats-header-title"]}>
                          <Typography variant="subtitle1">Last Active Zone</Typography>
                          <Typography variant="h5" gutterBottom>
                            <b>{worker.area}</b>
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid key={5} item xs={12} md={8} className={classes.widget}>
                    <Paper className={classes.widgetContent}>
                      <BarChart
                        labels={Object.keys(worker.hoursWorked.lastWeek).map(label => label.toUpperCase())}
                        primaryData={{
                          label: 'Hours Worked',
                          data: Object.values(worker.hoursWorked.lastWeek)
                        }}
                        displayAxes={isWidthUp('md', width)}
                        width={width}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </Transition>

    <Divider
      style={{
        margin: isWidthUp('md', width)
          ? '0 0 50px 20px'
          : '0 0 20px 20px'
      }}
    />

    <div className={scss["stats-helmets-container"]}>
      <Typography variant="title" className={scss["stats-helmet-title"]} gutterBottom>
        <b>Assigned Helmets</b>
      </Typography>
      <div className={scss["stats-helmet-body"]}>
        {worker.helmets.map(helmet => (
          <div className={scss["stats-helmet-card"]} key={uuid()}>
            <div>
              <Avatar alt="Helmet" src={helmetIcon} className={scss["stats-helmet-avatar"]}
              />
              <span> #{helmet.id} </span>
            </div>
            <div>
              <Avatar alt="ID" src={idIcon} className={scss["stats-helmet-avatar"]}
              />
              <span> {helmet.class} </span>
            </div>
            <div>
              <Avatar alt="Time" src={timeIcon} className={scss["stats-helmet-avatar"]}
              />
              <span> 1 day ago</span>
            </div>
          </div>
        ))}
        <div>
          <Button variant="fab" mini aria-label="Add" className={scss["stats-add-helmet-btn"]}>
            <AddIcon/>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

Stats.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  worker: PropTypes.shape({
    data: PropTypes.array
  }).isRequired,
  supervisor: PropTypes.shape({
    data: PropTypes.array
  }).isRequired,
  width: PropTypes.string.isRequired
};

const styledStats = compose(
  withWidth(),
  withStyles(styles, {withTheme: true})
)(Stats);
export {styledStats as Stats};
