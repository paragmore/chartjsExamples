new Chart('myChart', {
  type: 'line',
  plugins: [
    {
      afterLayout: chart => {
        let ctx = chart.chart.ctx
        ctx.save()
        // Assuming both datasets have the same number of points
        console.log('l', chart.data.labels.length)
        //checking all the datapoints and changing the gradient if dataset1 y value is greater than dataset 2 y value
        let xAxis = chart.scales['x-axis-0']
        const gradient = ctx.createLinearGradient(0, 0, xAxis.maxWidth, 0)
        for (let i = 0; i < chart.data.labels.length; i++) {
          let valueDataset1 = chart.data.datasets[0].data[i]
          let valueDataset2 = chart.data.datasets[1].data[i]
          const col = valueDataset1 > valueDataset2 ? 'red' : 'green'
          console.log(
            'i / chart.data.labels.length,',
            (i + 1) / chart.data.labels.length,
            col
          )
          const stop = (i + 1) / chart.data.labels.length
          const stopLeft = stop - stop * 0.055
          const stopRight = stop + stop * 0.055
          gradient.addColorStop(stopLeft >= 0 ? stopLeft : 0, col)
          gradient.addColorStop((i + 1) / chart.data.labels.length, col)
          gradient.addColorStop(stopRight <= 1 ? stopRight : 1, col)

          // chart.data.datasets[0].borderColor = col
        }
        chart.data.datasets[0].borderColor = gradient

        ctx.restore()
        // chart.update(); // Update the chart to apply the color changes

        // // Check values at the first label (assuming both datasets have the same labels)
        // let valueDataset1 = chart.data.datasets[0].data[0];
        // let valueDataset2 = chart.data.datasets[1].data[0];

        // console.log(valueDataset1, valueDataset2)
        // chart.data.datasets[0].borderColor = (valueDataset1 > valueDataset2) ? 'red' : 'green';

        // ctx.restore();
      }
    }
  ],
  data: {
    labels: [32, 50, 29, 12, 40, 76, 42, 33, 44, 15],
    datasets: [
      {
        label: 'My Dataset',
        data: [32, 50, 29, 12, 40, 76, 42, 33, 44, 15],
        fill: false
      },
      {
        label: 'My Dataset',
        data: [76, 42, 44, 44, 44, 32, 50, 29, 12, 40],
        fill: false,
        borderColor: 'blue'
      }
    ]
  },
  options: {
    legend: {
      display: false
    }
  }
})
