import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChartModule, Chart } from 'angular-highcharts';



@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    Navbar,
    Sidebar,
    FormsModule,
    ReactiveFormsModule,
    ChartModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  //Atributo
  private http = inject(HttpClient);

  graficoDonut = signal<Chart>(new Chart());
  graficoColunas = signal<Chart>(new Chart());

  apiBaseUrl = 'http://localhost:8082/api/v1/dashboard';

  formulario = new FormGroup({
    dataMin: new FormControl('', [Validators.required]),
    dataMax: new FormControl('', [Validators.required]),
  });

  ngOnInit() {

    //Pegar a data atual
    const hoje = new Date();

    //Primeiro dia do mês
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    //Ultimo dia do mês
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    //Formatando as datas para yyyy-MM-dd
    const formatarData = (data: Date) => {
      return data.toISOString().split('T')[0];
    }

    //Preencher o formulário com as datas do primeiro e ultimo dia do mês
    this.formulario.patchValue({
      dataMin: formatarData(primeiroDia),
      dataMax: formatarData(ultimoDia)
    });

    //Realizar a consulta
    this.consultar();
  }

  consultar() {

    const dataMin = this.formulario.value.dataMin;
    const dataMax = this.formulario.value.dataMax;

    this.http.get(`${this.apiBaseUrl}/tarefas-categoria/${dataMin}/${dataMax}`)
      .subscribe((data) => {

        const consulta = data as any[];

        const dados = consulta.map(item => ({
          name: item.categoria,
          y: item.quantidade
        }));

        this.graficoDonut.set(new Chart({
          chart: {
            type: 'pie'
          },
          title: {
            text: 'Tarefas por Categoria'
          },
          plotOptions: {
            pie: {
              innerSize: '60%', // efeito DONUT
              dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y}'
              }
            }
          },
          series: [
            {
              type: 'pie',
              data: dados
            }
          ],
          credits: { enabled: false }
        }));

      });

    this.http.get(`${this.apiBaseUrl}/tarefas-prioridade/${dataMin}/${dataMax}`)
      .subscribe((data) => {

        const consulta = data as any[];

        const categorias = consulta.map(item => item.prioridade);
        const valores = consulta.map(item => item.quantidade);

        this.graficoColunas.set(new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Tarefas por Prioridade'
          },
          xAxis: {
            categories: categorias,
            title: {
              text: 'Prioridade'
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Quantidade'
            }
          },
          series: [
            {
              type: 'column',
              name: 'Tarefas',
              data: valores
            }
          ],
          credits: { enabled: false }
        }));

      });
  }
}
