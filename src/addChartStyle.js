
export function addChartStyle(data, well) {
    data.styles = {
      unselected: {
        lineColor: well.metadata.color || 'red',
        lineWidth: 1,
        lineStyle: 1,
      },
      selected: {
        lineColor: well.metadata.color || 'red',
        lineWidth: 3,
        lineStyle: 1,
      },
    };
    data.label = well.id;
  }