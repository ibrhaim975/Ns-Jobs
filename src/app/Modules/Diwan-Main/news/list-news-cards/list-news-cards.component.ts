import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../news.service';
import chroma from "chroma-js";
import { Chart } from 'chart.js';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-list-news-cards',
  templateUrl: './list-news-cards.component.html',
  styleUrls: ['./list-news-cards.component.scss'],
  providers: [DecimalPipe]
})
export class ListNewsCardsComponent implements OnInit {

  constructor(private newsService: NewsService, private decimalPipe: DecimalPipe) { }
  news: any
  dashboard: any = {}
  textSecondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--surface-500')
  primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
  @ViewChild('newsCoveragePercentagePerAgency') newsCoveragePercentagePerAgency: any;

  ngOnInit(): void {

    this.getNewsDashboards()

  }

  getNewsDashboards() {
    this.newsService.getNewsDashboards().subscribe(news => {
      this.news = news?.data
      this.dashboardHeaderInit()
      this.chartNewsCoveragePercentagePerAgency()


    })
  }
  dashboardHeaderInit() {
    this.dashboard['dashboardHeader'] = [
      { color: this.news?.totalAgencies?.details?.details?.color, icon: this.news?.totalAgencies?.details?.details?.icon, count: this.news?.totalAgencies?.value, name: 'Agencies' },
      { color: this.news?.totalNews?.details?.details?.color, icon: this.news?.totalNews?.details?.details?.icon, count: this.news?.totalNews?.value, name: 'News' },
      { color: this.news?.positiveSentimentPercentage?.details?.details?.color, icon: this.news?.positiveSentimentPercentage?.details?.details?.icon, count: this.decimalPipe.transform(this.news?.positiveSentimentPercentage?.value, "1.1-1") + '%', name: 'Positive Sentiment' },
      { color: this.news?.negativeSentimentPercentage?.details?.details?.color, icon: this.news?.negativeSentimentPercentage?.details?.details?.icon, count: this.decimalPipe.transform(this.news?.negativeSentimentPercentage?.value, "1.1-1") + '%', name: 'Negative Sentiment' },
      { color: this.news?.neutralSentimentPercentage?.details?.details?.color, icon: this.news?.neutralSentimentPercentage?.details?.details?.icon, count: this.decimalPipe.transform(this.news?.neutralSentimentPercentage?.value, "1.1-1") + '%', name: 'Neutral Sentiment' }
    ]

  }
  chartNewsCoveragePercentagePerAgency() {
    const newsCoveragePercentagePerAgency = this.news?.newsCoveragePercentagePerAgency?.items
    newsCoveragePercentagePerAgency.map(x => x.coveragePercentage = this.decimalPipe.transform(x?.coveragePercentage, "1.1-1"))

      this.dashboard['newsCoveragePercentagePerAgency'] = {
        labels: newsCoveragePercentagePerAgency.map(x => x.title),
        datasets: [
          {
            barThickness: 30,
            data: [...newsCoveragePercentagePerAgency.map(x => x?.coveragePercentage)],
            backgroundColor: chroma.scale([this.primaryColor, '#fff']).colors(newsCoveragePercentagePerAgency?.length + 1)

          }
        ]
      }



    this.dashboard['chartOptions'] = {
      plugins: { legend: { display: false, labels: { boxWidth: 10, color: this.textSecondaryColor } } },
      scales: {
        x: {
          grid: { color: 'white' }, ticks: {
            callback: function (value, index, ticks) {
              return newsCoveragePercentagePerAgency[index]?.title;
            }
          }
        }, y: {
          display: false,
          grid: { color: 'white' }, ticks: {
            display: false,
            // callback: function (value, index, ticks) {
            //   return '%' + value;
            // }
          }
        },
      },
      tooltips: {
        enabled: false
      },
      hover: {
        animationDuration: 1
      },
      animation: {
        duration: 1000,
        onComplete: function (currentChart) {
          const chartInstance = currentChart?.chart,
            ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.fillStyle = "rgba(0, 0, 0, 1)";
          ctx.textBaseline = 'bottom';
          chartInstance?.getDatasetMeta(0)?.data.map((item, index) => {
            ctx.fillText(newsCoveragePercentagePerAgency[index]?.coveragePercentage + '%', item.x, item.y - 5);
          })

        }
      }

    }
  }
  hexToRGB(hex, alpha?) {
    var r = parseInt(hex?.slice(1, 3), 16),
      g = parseInt(hex?.slice(3, 5), 16),
      b = parseInt(hex?.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
}
