import * as React from 'react';

import { Link } from 'react-router';
import { browserHistory} from 'react-router';
import { url } from '../../util';

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from '../../../node_modules/recharts';
import { LineChart, Line, Cell} from '../../../node_modules/recharts';
import { BarChart, Bar, Brush} from '../../../node_modules/recharts';
import { AreaChart, Area, Scatter, ScatterChart, ZAxis } from '../../../node_modules/recharts';
import { PieChart, Pie } from '../../../node_modules/recharts';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ReferenceLine } from '../../../node_modules/recharts';
 import * as html2canvas from '../../../node_modules/html2canvas';
 import * as jsPDF from '../../../node_modules/jspdf';

import ResultadoInformation from './ResultadoInformation';
import ResultadoGraficos from './ResultadoGraficos';

import { IResultado , IAlumno } from '../../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS2 = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const tipos = [{ tipo: 'Aceptación', ab: 'A'}, { tipo: 'Afrontamiento Directo', ab: 'AD'} , { tipo: 'Análisis de las Emociones', ab: 'AE'},
 { tipo: 'Búsqueda de Soporte Emocional', ab: 'BSE'}, { tipo: 'Búsqueda de Soporte Social', ab: 'BSE'} , { tipo: 'Conductas Inadecuadas', ab: 'CI'},
  { tipo: 'Distracción', ab: 'D'}, { tipo: 'Negación', ab: 'N'}, { tipo: 'Planificación de Actividades', ab: 'PA'}, { tipo: 'Retracción del Afrontamiento', ab: 'RA'},
   { tipo: 'Reinterpretación Positiva de la Experiencia', ab: 'RPE'} , { tipo: 'Retomo a la Religión' , ab: 'RR'}, { tipo: 'Superación de Actividades Competitivas' , ab: 'SAC'}];
const tipos2 = [{ tipo: 'Sinceridad', ab: 'X'}, { tipo: 'Deseabilidad Social', ab: 'Y'}, { tipo: 'Autodescalificación', ab: 'Z'}, { tipo: 'Esquizoide', ab: '1'},
   { tipo: 'Evitativo', ab: '2'}, { tipo: 'Dependiente', ab: '3'}, { tipo: 'Histriónico', ab: '4'} , { tipo: 'Narcisista', ab: '5'},
   { tipo: 'Antisocial', ab: '6A'}, { tipo: 'Agresivo-sádico', ab: '6B'}, { tipo: 'Compulsivo', ab: '7'}, { tipo: 'Pasivo-agresivo', ab: '8A'},
   { tipo: 'Autoderrotista', ab: '8B'}];
const tipos22 = [{ tipo: 'Esquizotípico' , ab: 'S'}, { tipo: 'Borderline' , ab: 'C'}, { tipo: 'Paranoide' , ab: 'P'},
   { tipo: 'Ansiedad' , ab: 'A'}, { tipo: 'Somatoformo' , ab: 'H'}, { tipo: 'Bipolar' , ab: 'N'}, { tipo: 'Distimia' , ab: 'D'},
   { tipo: 'Dependencia de alcohol' , ab: 'B'}, { tipo: 'Dependencia de drogas' , ab: 'T'}, { tipo: 'Desorden del pensamiento' , ab: 'SS'},
   { tipo: 'Depresión mayor' , ab: 'CC'}, { tipo: 'Desorden delusional' , ab: 'PP'}];
   const tipos3 = [{ tipo: 'Intrapersonal', ab: 'IA'}, { tipo: 'Conocimiento Emocional de si mismo', ab: 'CM'}, { tipo: 'Asertividad', ab: 'AS'}, { tipo: 'Autoconcepto', ab: 'AC'}, { tipo: 'Autorrealizacion', ab: 'AR'}, { tipo: 'Independencia', ab: 'IN'},
   { tipo: 'Interpersonal', ab: 'IE'}, { tipo: 'Empatia', ab: 'EM'}, { tipo: 'Relaciones Interpersonales', ab: 'RI'} , { tipo: 'Responsabilidad Social', ab: 'RS'}];
   const tipos33 = [{ tipo: 'Adaptibilidad', ab: 'AD'}, { tipo: 'Solución de Problemas', ab: 'SP'}, { tipo: 'Prueba de la realidad', ab: 'PR'}, { tipo: 'Flexibilidad', ab: 'FL'},
   { tipo: 'Manejo de Estrés' , ab: 'MT'}, { tipo: 'Tolerancia al Stress' , ab: 'ME'}, { tipo: 'Control de Impulsos' , ab: 'CI'},
   { tipo: 'Estado de Ánimo General' , ab: 'EA'}, { tipo: 'Felicidad' , ab: 'FE'}, { tipo: 'Optimismo' , ab: 'OP'}, { tipo: 'General' , ab: 'G'}];
interface IResultadoPageProps {
  params?: { resultadoId?: string , alumnoId?: string};
}

interface IResultadoPageState {
  resultado?: IResultado;
  alumno?: IAlumno;
}

export default class ResultPage extends React.Component<IResultadoPageProps, IResultadoPageState> {

  constructor() {
    super();

    this.state = { };
  }

  componentDidMount() {
    const { params } = this.props;

    if (params && params.resultadoId) {
      const fetchUrl = url(`/api/alumnos/${params.alumnoId}/resultados/${params.resultadoId}`);
      fetch(fetchUrl)
        .then(response => response.json())
        .then(resultado => { console.log('resultado', resultado); this.setState({ resultado }); });
    }
    if (params && params.alumnoId) {
      const fetchUrl = url(`/api/alumno/${params.alumnoId}`);
      fetch(fetchUrl)
        .then(response => response.json())
        .then(alumno => this.setState({ alumno }));
    }
  }

  onChange(value) {
    console.log(value);
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save('resultado.pdf');
      });
  }

  render() {
    const { resultado, alumno } = this.state;

    if (!resultado) {
      return <div className='center-align'>
                <br></br><br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br><br></br>
                <div className='preloader-wrapper big active'>
                  <div className='spinner-layer spinner-blue-only'>
                    <div className='circle-clipper left'>
                      <div className='circle'></div>
                    </div><div className='gap-patch'>
                      <div className='circle'></div>
                    </div><div className='circle-clipper right'>
                      <div className='circle'></div>
                    </div>
                  </div>
                </div>
              </div>;
    }

    return (
      <span>
        <br></br>
        <div style= {{borderStyle: 'solid', width: '210mm', minHeight: '297mm', marginLeft: 'auto', marginRight: 'auto'}}>
        <div className='row' id='divToPrint' style={{width: '210mm', minHeight: '297mm', marginLeft: 'auto', marginRight: 'auto'}}>
          <div className='container'>
              <br/>
              <img src='/images/logo.png'/>
              <br/>
              <h5 className='center'>Resultados: {resultado.test}</h5>
              <br/>
              <h6 style={{fontWeight: 'bold'}}> Nombre : {alumno.firstName} {alumno.lastName}</h6>
              <h6 style={{fontWeight: 'bold'}}> Fecha : {resultado.date} </h6><br/>
              <div className='divider black'></div>
               <h5 className='center'>Gráficos</h5><br/>
          </div>
          {resultado.test === 'Test del Estres' ? (
          <div className='row'>
            <div className='col s8'>
              <ResponsiveContainer width='100%' height={300}>
              <BarChart data={resultado.valores} margin={{top: 5}}>
              <Bar dataKey='value'>
              {
              resultado.valores.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
              }
              </Bar>
              <XAxis dataKey='tipo'/>
              <CartesianGrid strokeDasharray='3 3'/>
              <YAxis/>
              <Tooltip/>
              </BarChart>
              </ResponsiveContainer>
            </div>
            <div className='col s4'>
            <div className='card-panel grey' style={{marginRight: '30px', padding: '8px'}}>
            {tipos.map(un => (<h6 className='white-text'>{un.ab} : {un.tipo}</h6>))}
              </div>
            </div>
          </div>
         ) : resultado.test === 'Test de Millon' ? (
         <div>
          <div className='row'>
            <div className='col s12'>
              <ResponsiveContainer width='100%' height={300}>
                  <AreaChart width={600} height={400} data={resultado.valores.sort((a, b) => Number(a.descripcion) - Number(b.descripcion))}
                margin={{top: 5, right: 30, left: 0, bottom: 5}}>
                <XAxis dataKey='tipo'/>
                <YAxis/>
                <CartesianGrid strokeDasharray='3 3'/>
                <ReferenceLine y={59} label={{ position: 'top',  value: 'Indicador bajo'}} stroke='red' strokeDasharray='3 3'/>
                <ReferenceLine y={74} label={{ position: 'top',  value: 'Indicador sugestivo'}} stroke='red' strokeDasharray='3 3'/>
                <ReferenceLine y={84} label={{ position: 'top',  value: 'Indicador moderado'}} stroke='red' strokeDasharray='3 3'/>
                <Tooltip/>
                <Area type='monotone' dataKey='value' stroke='#3E84D9' fill='#3E84D9' />
              </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
            <div className='row'>
            <div className='col s4'>
            <div className='card-panel grey' style={{marginLeft: '30px'}}>
            {tipos2.map(un => (<h6 className='white-text'>{un.ab} : {un.tipo} </h6>))}
              </div>
            </div>
            <div className='col s4'>
            <div className='card-panel grey'>
            {tipos22.map(un => (<h6 className='white-text'>{un.ab} : {un.tipo} </h6>))}
              </div>
            </div>
            <div className='col s4'>
            <div className='card-panel grey white-text' style={{marginRight: '30px'}}>
            <h6>Indicadores</h6>
              <div className='divider'></div>
              <blockquote><b>Indicador bajo:</b> 0 a 59</blockquote>
              <blockquote><b>Indicador sugestivo:</b> 60 a 74</blockquote>
              <blockquote><b>Indicador moderado:</b> 75 a 84</blockquote>
              <blockquote><b>Indicador alto:</b> 85 a más</blockquote>
            </div>
            </div>
          </div>
          </div>
           ) : (
           <div>
        <div className='row'>
            <div className='col s12'>
                 <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={resultado.valores.sort((a, b) => Number(a.posicion) - Number(b.posicion))} margin={{top: 5, right: 30, left: 0, bottom: 5}}>
                    <XAxis dataKey='tipo'/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray='3 3'/>
                    <ReferenceLine y={0} stroke='#000'/>
                    <ReferenceLine y={89} label={{ position: 'top',  value: 'Poco desarrollada'}} stroke='red' strokeDasharray='3 3'/>
                    <ReferenceLine y={109} label={{ position: 'top',  value: 'Adecuada'}} stroke='red' strokeDasharray='3 3'/>
                    <Bar dataKey='value'>
                      {
                        resultado.valores.map((entry, index) => <Cell fill={COLORS2[index % COLORS2.length]}/>)
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
          </div>
        </div>
        <div className='row'>
            <div className='col s4'>
            <div className='card-panel grey' style={{marginLeft: '30px',height: '320px'}}>
            {tipos3.map(un => (<h6 className='white-text'>{un.ab} : {un.tipo} </h6>))}
              </div>
            </div>
            <div className='col s4'>
            <div className='card-panel grey' style={{height: '320px'}}>
            {tipos33.map(un => (<h6 className='white-text'>{un.ab} : {un.tipo} </h6>))}
              </div>
            </div>
            <div className='col s4'>
            <div className='card-panel grey white-text' style={{marginRight: '30px', height: '320px'}}>
            <h6>Indicadores</h6>
              <div className='divider'></div><br></br>
              <h6>Capacidad emocional poco desarrollada: 0 a 89</h6>
              <h6>Capacidad emocional adecuada: 90 a 109</h6>
              <h6>Capacidad emocional altamente desarrollada: 110 a 119</h6>
              <h6>Capacidad emocional inusualmente desarrollada: 120 a más</h6>
            </div>
            </div>
          </div>
      </div>
      )
    }
          </div>
        <button className='btn btn-default grey left' style={{marginTop: '20px'}} onClick={browserHistory.goBack}>Cancelar</button>
         <button className='btn btn-default right' style={{marginTop: '20px'}} onClick={this.printDocument}>Descargar</button>
        </div>
         <br/>
      </span>
    );
  }
};