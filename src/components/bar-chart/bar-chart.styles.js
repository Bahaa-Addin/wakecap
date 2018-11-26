export const styles = theme => ({
  'bar-chart-widget': {
    padding: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    placeContent: 'stretch space-between',
    height: '100%',
    position: 'relative',
    '& :last-child': {
      paddingBottom: 0
    }
  },
  'bar-chart-widget__text': {
    alignSelf: 'center',
    padding: 8,
    width: '30%',
    textAlign: 'center'
  },

  'bar-chart-widget__chart': {
    width: '100%',
    position: 'relative',
    padding: 0
  }
});
