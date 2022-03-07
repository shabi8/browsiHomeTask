import { Component, OnInit } from '@angular/core';
import { WeatherForcastService } from '../weather-forcast.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  hourlyChartOptions: any;

  dailyChartOptions: any;

  constructor(private weatherService: WeatherForcastService) { }

  ngOnInit(): void {
  }

  getData(coordForm: any) {
    console.log(coordForm);
    this.weatherService.getWeather(coordForm.latitude, coordForm.longitude).subscribe((data: any) => {
      console.log(data);
      const hourlyData = data.hourly;
      const timeCategory = hourlyData.time.slice(0, 24).map( (timestring: string) => timestring.slice(-5));
      const temp = hourlyData.temperature_2m.slice(0, 24);

      const dailyData = data.daily;
      const datesCategory = dailyData.time;
      const dailyMaxTemp = dailyData.temperature_2m_max;
      console.log(timeCategory);
      console.log(temp);
      this.hourlyChartOptions = {
        title: {
          text : `${data.daily.time[0]} Hourly Temperature`,
          // textAlign: 'left'
        },
        // legend: {
        //   data: ['bar'],
        //   align: 'left',
        // },
        // tooltip: {},
        xAxis: {
          data: timeCategory,
          silent: false
        },
        yAxis: {
          name: 'Temperature',
          nameLocation: 'middle',
          nameTextStyle: {
            fontSize: 14,
            verticalAlign: 'bottom',
            padding: [0, 0, 15, 0]
          }
        },
        series: [
          {
            type: 'line',
            data: temp,
            animationDelay: (idx: number) => idx * 10,
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx: number) => idx * 5,
      };

      this.dailyChartOptions = {
        title: {
          text : `${data.daily.time[0]} Daily Max Temperature`,
          // textAlign: 'left'
        },
        // legend: {
        //   data: ['bar'],
        //   align: 'left',
        // },
        // tooltip: {},
        xAxis: {
          data: datesCategory,
          silent: false
        },
        yAxis: {
          name: 'Temperature',
          nameLocation: 'middle',
          nameTextStyle: {
            fontSize: 14,
            verticalAlign: 'bottom',
            padding: [0, 0, 15, 0]
          }
        },
        series: [
          {
            type: 'bar',
            data: dailyMaxTemp,
            animationDelay: (idx: number) => idx * 10,
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx: number) => idx * 5,
      };
    });
  }

}
