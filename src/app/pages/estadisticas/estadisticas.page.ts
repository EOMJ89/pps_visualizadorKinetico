import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, ChartElement } from 'chart.js';
import { FotoService, Foto } from 'src/app/services/foto/foto.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit, OnDestroy {
  @ViewChild('barCanvas', null) barCanvas: ElementRef;
  @ViewChild('doughnutCanvas', null) doughnutCanvas: ElementRef;

  // tslint:disable: variable-name
  private _sub: Subscription;
  private _barChart: Chart;
  private _doughnutChart: Chart;

  constructor(
    private _fotoServ: FotoService,
    private _auth: AuthService) { }

  ngOnInit() {
    this._fotoServ.inicializarFotos();
    this._sub = this._fotoServ.traerFotos().subscribe((d: Foto[]) => {
      const lindas = d.filter(f => f.tipo === 'lindas');
      const feas = d.filter(f => f.tipo === 'feas');

      this.createBar(feas);
      this.createDoughnut(lindas);
    });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  private getRandomInt(): number {
    return Math.floor(Math.random() * (255 - 0)) + 0;
  }

  private crearColor() {
    const auxReturn = new Array<number>(
      this.getRandomInt(),
      this.getRandomInt(),
      this.getRandomInt(),
    );

    return auxReturn;
  }

  private formatearDatos(fotos: Foto[]) {
    const auxReturn: {
      labels: Array<string>,
      labelSpecial: string,
      data: Array<number>,
      colours: Array<string>,
      borders: Array<string>
    } = {
      labels: new Array<string>(),
      labelSpecial: '# de Votos',
      data: new Array<number>(),
      colours: new Array<string>(),
      borders: new Array<string>(),
    };

    for (const f of fotos) {
      auxReturn.labels.push(f.id);
      // console.log('Votos', f.votos.length);
      auxReturn.data.push(f.votos.length);
      const auxColour: Array<number> = this.crearColor();
      // console.log('Color', auxColour);
      auxReturn.colours.push(`rgba(${auxColour[0]}, ${auxColour[1]}, ${auxColour[2]}, 0.5)`);
      auxReturn.colours.push(`rgba(${auxColour[0]}, ${auxColour[1]}, ${auxColour[2]}, 1)`);
    }

    return auxReturn;
  }

  public createBar(fotos: Foto[]) {
    const data = this.formatearDatos(fotos);
    this._barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: data.labels, /* ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'] */
        datasets: [
          {
            label: data.labels, /* '# of Votes' */
            data: data.data /* [12, 19, 3, 5, 2, 3] */,
            backgroundColor: data.colours, /* [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ] */
            borderColor: data.borders, /* [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ], */
            borderWidth: 1
          }
        ]
      },
      options: {
        events: ['click'],
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                display: false
              }
            }
          ]
        },
        onClick: (_points, _event: Array<ChartElement>) => {
          if (_event.length > 0) {
            // console.log('Points', _points);
            // console.log('Event', _event);
            console.log('Index', _event[0]._model.label);
            this.findPicture('feas', _event[0]._model.label);

          }
        },
      }
    });
  }

  public createDoughnut(fotos: Foto[]) {
    const data = this.formatearDatos(fotos);
    this._doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: data.labels, /* ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], */
        datasets: [
          {
            label: data.labels, /* '# of Votes', */
            data: data.data, /* [12, 19, 3, 5, 2, 3], */
            backgroundColor: data.colours, /* [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ], */
            // hoverBackgroundColor: data.borders, /* ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56'] */
          },
        ],
      },
      options: {
        events: ['click'],
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        onClick: (_points, _event: Array<ChartElement>) => {
          if (_event.length > 0) {
            // console.log('Points', _points);
            // console.log('Event', _event);
            console.log('Index', _event[0]._model.label);
            this.findPicture('lindas', _event[0]._model.label);
          }
        },
      }
    });
  }


  public findPicture(cat: string, id: string) {
    let auxF: Foto;

    if (cat === 'feas') {
      auxF = this._fotoServ.feas.filter((f) => {
        return f.id === id;
      })[0];
    } else {
      auxF = this._fotoServ.lindas.filter((f) => {
        return f.id === id;
      })[0];
    }

    this._fotoServ.ver(auxF, true);
  }

  /*onClick: (e, legendItem: any) => {
    // console.log(legendItem);
    if (legendItem[0] !== undefined) {
      const index = legendItem[0]._model.label;
      // console.log(index);
      this.ShowPicture(index, 'fea');
    }
  } */
}
