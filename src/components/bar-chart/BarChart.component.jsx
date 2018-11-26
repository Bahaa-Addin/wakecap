import React, {Component} from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { Bar } from 'react-chartjs-2';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import {styles} from './bar-chart.styles';

const legendOptions = {
  display: false
};

class BarChart extends Component {
  constructor(props) {
    super(props);

    const {theme, labels, primaryData, secondaryData, displayAxes} = this.props;
    this.state = {
      userChartData: {
        labels,
        datasets: [{
          label: primaryData.label,
          data: primaryData.data,
          borderWidth: 0,
          backgroundColor: labels.map(data => theme.palette.primary.light),
          hoverBackgroundColor: theme.palette.secondary.main
        }, secondaryData
            ? {
          label: secondaryData.label,
          data: secondaryData.data,
          borderWidth: 0,
          backgroundColor: labels.map(data => theme.palette.primary.light),
          hoverBackgroundColor: this.props.theme.palette.primary.main
        }
        : {}
        ]
      },
      userChartOptions: {
        animation: false,
        scaleShowVerticalLines: false,
        responsive: true,
        tooltips: {
          enabled: true,
          backgroundColor: theme.palette.secondary.main,
          titleFontColor: theme.palette.common.white,
          bodyFontColor: theme.palette.common.white,
          xPadding: 20,
          yPadding: 20,
          displayColors: false
        },
        scales: {
          xAxes: [{
            stacked: true,
            display: displayAxes,
            categoryPercentage: 1.0,
            barPercentage: 0.4
          }],
          yAxes: [{
            stacked: true,
            display: displayAxes
          }]
        }
      }
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {userChartData, userChartOptions} = state;
    const {theme, primaryData, secondaryData} = props;
    const datasets = userChartData.datasets.map((dataset, idx) => ({
        ...dataset,
        data: idx ? primaryData.data : (secondaryData ? secondaryData.data : []),
      label: idx ? primaryData.label : (secondaryData ? secondaryData.label : 'secondaryLabel'),
        hoverBackgroundColor: idx ? theme.palette.secondary.main : theme.palette.secondary.main,
        backgroundColor: userChartData.labels.map(data => theme.palette.primary.light)
    }));

    const newChartData = {
      ...userChartData,
      datasets
    };

    const tooltips = {
      ...userChartOptions.tooltips,
      backgroundColor: theme.palette.secondary.main,
      titleFontColor: theme.palette.common.white,
      bodyFontColor: theme.palette.common.white
    };
    const newChartOptions = {
      ...userChartOptions,
      tooltips
    };

    return {
      userChartData: newChartData,
      userChartOptions: newChartOptions
    }

  }

  render() {
    const { classes } = this.props;
    const { userChartData, userChartOptions } = this.state;

    return (
      <Card className={classes['bar-chart-widget']}>
        <CardHeader
          title="Daily Working Hours"
          subheader="(Last Week)"
        />
        <CardContent className={classes['bar-chart-widget__chart']}>
          <Bar
            data={userChartData}
            options={userChartOptions}
            legend={legendOptions}
          />
        </CardContent>
      </Card>
    );
  }
}

BarChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  primaryData: PropTypes.shape({
    label: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  secondaryData: PropTypes.shape({
    label: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      primary: PropTypes.shape({
        dark: PropTypes.string,
        main: PropTypes.string,
        light: PropTypes.string,
        contrastText: PropTypes.string
      }),
      secondary: PropTypes.shape({
        main: PropTypes.string,
        light: PropTypes.string
      }),
      common: PropTypes.shape({
        white: PropTypes.string
      })
    })
  }).isRequired,
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
};

const styledBarChart = compose(
  withStyles(styles, {withTheme: true})
)(BarChart);
export {styledBarChart as BarChart};
