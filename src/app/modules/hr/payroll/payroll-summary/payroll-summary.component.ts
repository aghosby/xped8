import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/shared/models/table-columns';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { PayrollSummary } from 'src/app/shared/models/payroll-data';

@Component({
  selector: 'app-payroll-summary',
  templateUrl: './payroll-summary.component.html',
  styleUrls: ['./payroll-summary.component.scss']
})
export class PayrollSummaryComponent implements OnInit {

  payrollSummary: any[] = [
    {
      id: 1,
      value: "132",
      percentChange: "5%",
      name: "Employees",
      colorDark: "rgb(54,171,104)",
      colorLight: "rgba(54,171,104,0.2)",
      icon: "bi bi-arrow-up-right",
      symbol: "bi bi-people-fill"
    },
    {
      id: 2,
      value: "$24,560.70",
      percentChange: "21%",
      name: "Gross Salary",
      colorDark: "rgb(235, 87, 87)",
      colorLight: "rgba(235, 87, 87, 0.2)",
      icon: "bi bi-arrow-down-right",
      symbol: "bi bi-pie-chart-fill"
    },
    {
      id: 3,
      value: "$20,360.10",
      percentChange: "14%",
      name: "Net Salary",
      colorDark: "rgb(235, 87, 87)",
      colorLight: "rgba(235, 87, 87, 0.2)",
      icon: "bi bi-arrow-down-right",
      symbol: "bi bi-layers-half"
    }
  ]

  displayedColumns: any[];
  dataSource: MatTableDataSource<PayrollSummary>;

  //Payroll Summary Table Column Names
  tableColumns: TableColumn[] = [
    {
      key: "paymentReference",
      label: "Reference",
      order: 1,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "payrollName",
      label: "Payroll Name",
      order: 2,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "payPeriod",
      label: "Pay Period",
      order: 3,
      columnWidth: "15%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "grossPay",
      label: "Gross Pay",
      order: 6,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "deductions",
      label: "Deductions",
      order: 9,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "netPay",
      label: "Net Pay",
      order: 10,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      order: 11,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 12,
      columnWidth: "8%",
      cellStyle: "width: 100%",
      sortable: true
    }

  ]

  tableData: PayrollSummary[] = [
    {
      id: 1,
      "Reference": "OCT-0345-211",
      "Payroll Name": "October 1st Period",
      "Pay Period": "Oct 1, 2022 - Oct 15, 2022",
      "Employee Count": 43,
      "Gross Pay": "£34,590.45",
      "Deductions": "£5,890.00",
      "Net Pay": "£29,344.50",
      "Status": "Completed"
    },
    {
      id: 2,
      "Reference": "OCT-0335-251",
      "Payroll Name": "October 2nd Period",
      "Pay Period": "Oct 16, 2022 - Oct 31, 2022",
      "Employee Count": 46,
      "Gross Pay": "£37,790.45",
      "Deductions": "£4,990.00",
      "Net Pay": "£33,484.50",
      "Status": "Completed"
    },
    {
      id: 3,
      "Reference": "NOV-0325-211",
      "Payroll Name": "November Period",
      "Pay Period": "Nov 1, 2022 - Nov 30, 2022",
      "Employee Count": 56,
      "Gross Pay": "£57,590.45",
      "Deductions": "£7,290.00",
      "Net Pay": "£50,344.00",
      "Status": "Processing"
    },
    {
      id: 4,
      "Reference": "DEC-0745-211",
      "Payroll Name": "December Period",
      "Pay Period": "Dec 1, 2022 - Dec 31, 2022",
      "Employee Count": 51,
      "Gross Pay": "£53,590.45",
      "Deductions": "£4,100.00",
      "Net Pay": "£49,344.35",
      "Status": "Completed"
    },
  ]

  AreaHighcharts: typeof Highcharts = Highcharts;
  areaChartOptions: Highcharts.Options = {
    title: {
      text: "Gross Pay"
    },
    credits: {
      enabled: false
    },
    xAxis:{
      categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      //labels: {enabled:false}
    },
    yAxis: {          
      title:{
        text:"Pounds"
      },
      labels: {
        formatter: function () {
          return '£' + this.axis.defaultLabelFormatter.call(this) + 'K';
        }            
      }
    },
    tooltip: {
      valuePrefix:"£",
      valueSuffix:"K",
    },
    //colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    colors: ['#4db1ff'],
    series: [
      {
        type: 'areaspline',
        name: 'Gross Pay',
        data: [7.9, 10.2, 13.7, 16.5, 17.9, 15.2, 17.0, 20.6, 22.2, 26.3, 29.6, 27.8],
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, '#4db1ff'],
            [1, Highcharts.color('#4db1ff').setOpacity(0).get('rgba') as string],
          ],
        },
      },
    ],
  };

  PieHighcharts: typeof Highcharts = Highcharts;
  pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      plotShadow: false
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 20,
        borderColor: null,
        slicedOffset: 5,
        dataLabels: {
          connectorWidth: 0,
          enabled: false
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px; letter-spacing: 0.03rem; font-family: Roboto">{series.name}</span><br>',
      pointFormat: '<span style="font-size:11px; letter-spacing: 0.03rem; font-family: Roboto; color:{point.color}">{point.name}</span>: <b>{point.value}days</b> <br/>'
    },
    title: {
      verticalAlign: 'middle',
      floating: false,
      text: ''
    },
    legend: {
      enabled: false
    },
    series: [
      {
        type: 'pie',
        name: 'Leave Days',
        data: [
          {name: 'Days Used', y: 60, value: 21, color: '#f08585'},
          {name: 'Days Left', y: 40, value: 14, color: '#4dc781'},
        ]
      }
    ]
  }
  constructor() { }

  ngOnInit(): void {
    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.tableData);
  }

}
