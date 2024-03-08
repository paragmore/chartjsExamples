const getIntersectionStop = intersection => {
  if (intersection < 0) {
    return 0
  }
  if (intersection > 1) {
    return 1
  }
  if (Number.isNaN(intersection)) {
    return 0
  }
  return intersection
}

new Chart('myChart', {
  type: 'line',
  plugins: [
    {
      afterLayout: chart => {
        let ctx = chart.chart.ctx
        ctx.save()
        // Assuming both datasets have the same number of points
        //checking all the datapoints and changing the gradient if dataset1 y value is greater than dataset 2 y value
        let xAxis = chart.scales['x-axis-0']
        const gradient = ctx.createLinearGradient(0, 0, xAxis.maxWidth, 0)
        for (let i = 0; i < chart.data.labels.length; i++) {
          let valueDataset1 = chart.data.datasets[0].data[i]
          let valueDataset2 = chart.data.datasets[1].data[i]
          const col = valueDataset1 > valueDataset2 ? 'red' : 'green'
          console.log('i', (i + 1) / chart.data.labels.length, col)
          const stop = (i + 1) / chart.data.labels.length
          const stopLeft = stop - stop * 0.055
          const stopRight = stop + stop * 0.055
          // gradient.addColorStop(stopLeft >= 0 ? stopLeft : 0, col)
          gradient.addColorStop((i + 1) / chart.data.labels.length, col)
          // gradient.addColorStop(stopRight <= 1 ? stopRight : 1, col)

          // Check if the lines cross each other and change the color at the crossing point
          // Check if the lines cross each other and change the color at the crossing point
          // if (
          //   i > 0 &&
          //   ((valueDataset1 > valueDataset2 &&
          //     chart.data.datasets[0].data[i - 1] <
          //       chart.data.datasets[1].data[i - 1]) ||
          //     (valueDataset1 < valueDataset2 &&
          //       chart.data.datasets[0].data[i - 1] >
          //         chart.data.datasets[1].data[i - 1]))
          // ) {
          //   const crossingX = xAxis.getPixelForDecimal(
          //     (i + valueDataset2 - chart.data.datasets[1].data[i]) /
          //       (chart.data.datasets[0].data[i] -
          //         chart.data.datasets[1].data[i])
          //   )
          //   const crossingStop = crossingX / xAxis.width
          //   if (crossingStop > 0 && crossingStop < 1) {
          //     gradient.addColorStop(crossingStop, col) // Change the color at the crossing point
          //   }
          // }

          const y1 = chart.data.datasets[0].data[i]
          const y2 = chart.data.datasets[0].data[i + 1]
          const x1 = (i * xAxis.maxWidth) / chart.data.labels.length
          const x2 = ((i + 1) * xAxis.maxWidth) / chart.data.labels.length

          const h1 = x1
          const h2 = x2
          const i1 = chart.data.datasets[1].data[i]
          const i2 = chart.data.datasets[1].data[i + 1]

          const m1 = (y2 - y1) / (x2 - x1)
          const m2 = (i2 - i1) / (h2 - h1)

          const c1 = y1 - m1 * x1
          const c2 = i1 - m2 * x1

          const intersectionX = (c2 - c1) / (m1 - m2)
          const intersectionY = m1 * intersectionX + c1
          const intersctionStop = getIntersectionStop(
            intersectionX / xAxis.width
          )
          console.log('inter', intersctionStop, col)

          if (intersectionX > x1 && intersectionX < x2) {
            gradient.addColorStop(intersctionStop, col) // Change the color at the crossing point
          }

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
    labels: [
      32, 50, 29, 32, 50, 29, 12, 40, 76, 42, 33, 44, 15, 12, 40, 76, 42, 33,
      44, 15
    ],
    datasets: [
      {
        label: 'My Dataset',
        data: [
          32, 32, 32, 32, 32, 76, 32, 32, 32, 32, 32, 76, 42, 33, 44, 15, 42,
          33, 44, 15
        ],
        fill: false
      },
      {
        label: 'My Dataset',
        data: [
          42, 42, 42, 42, 42, 44, 44, 42, 50, 42, 42, 40, 44, 44, 44, 32, 50,
          29, 12, 40
        ],
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
