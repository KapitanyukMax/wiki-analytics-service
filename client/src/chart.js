import { Chart } from 'chart.js/auto';
import { responseData } from './data';

const articleInfo = document.getElementById('article-info');

articleInfo.textContent = `${responseData.project}/wiki/${responseData.article}`;
articleInfo.setAttribute('href', responseData.url);

const ctx = document.getElementById('my-chart').getContext('2d');

let dateLabels = new Array(responseData.current.length);
for (let i = 1; i < dateLabels.length - 1; i++) {
  const currentRange = responseData.current[i];
  const prevRange = responseData.prev[i];

  dateLabels[i] = `${currentRange.timestamp} / ${prevRange.timestamp}`;
}

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: dateLabels,
    datasets: [
      {
        label: `${responseData.startDate} - ${responseData.endDate}`,
        data: responseData.current.map((range) => range.views),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
      {
        label: `${responseData.prevStartDate} - ${responseData.startDate}`,
        data: responseData.prev.map((range) => range.views),
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Article Views',
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        beginAtZero: true,
      },
    },
  },
});
