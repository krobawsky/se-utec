import * as React from 'react';

import { Link } from 'react-router';
import { url, submitForm } from '../../util';
import { IAlumno, IDay, IError } from '../../types';
import InputNumber from '../form/InputNumber';

import SweetAlert from '../../../node_modules/sweetalert-react';
import '../../../node_modules/sweetalert/dist/sweetalert.css';

import { BarChart, Bar, AreaChart, Area} from '../../../node_modules/recharts';
import { XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from '../../../node_modules/recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS2 = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

interface IPregProps {
  params?: IAlumno[];
  initialDay?: IDay;
}

interface IResultState {
  editableDay?: IDay[];
  error?: IError;
  mensaje1?: string;
  mensaje2?: string;
  mensaje3?: string;
  resultadoId?: string;
  show?: boolean;
}

interface IResultadoRequest {
  id?: number;
  test?: string;
  descripcion?: string;
  date?: string;
  expdate?: string;
}

export default class Resultados extends React.Component<IPregProps, IResultState> {
  constructor(props) {
    super(props);

    this.state = {
      editableDay: Object.assign({}, props.initialDay),
      mensaje1: 'transparent-text',
      mensaje2: 'transparent-text',
      mensaje3: 'transparent-text',
      show: false
    };

    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);
    this.onSubmit3 = this.onSubmit3.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(name: string, value: string) {
    const { editableDay, error } = this.state;
    const modifiedGrupo = Object.assign({}, editableDay, { [name]: value });
    this.setState({
      editableDay: modifiedGrupo,
    });
  }

  onSubmit1(event) {
    event.preventDefault();
    const { editableDay, resultadoId } = this.state;

    if ( editableDay.diaEst === '' || editableDay.diaEst === undefined ) {
      this.alerta1();
    } else {

      const resultRequest: IResultadoRequest = {
        test: 'Test del Estres',
        descripcion: 'Resolver este tests urgente!',
        date: null,
        expdate: editableDay.diaEst
      };

      const url = 'api/tests/results/' + resultadoId;
        submitForm('PUT', url, resultRequest, (status, response) => {
          if (status === 204) {
            this.setState({ show: true });
          } else {
            console.log('ERROR?!...', response);
            this.setState({ error: response });
          }
      });
    }
  }

  onSubmit2(event) {
    event.preventDefault();
    const { editableDay, resultadoId } = this.state;

    if ( editableDay.diaMil === '' || editableDay.diaMil === undefined ) {
      this.alerta2();
    } else {

      const resultRequest: IResultadoRequest = {
        test: 'Test de Millon',
        descripcion: 'Resolver este tests urgente!',
        date: null,
        expdate: editableDay.diaMil
      };

      const url = 'api/tests/results/' + resultadoId;
        submitForm('PUT', url, resultRequest, (status, response) => {
          if (status === 204) {
            this.setState({ show: true });
          } else {
            console.log('ERROR?!...', response);
            this.setState({ error: response });
          }
      });
    }
  }

  onSubmit3(event) {
    event.preventDefault();
    const { editableDay, resultadoId } = this.state;

    if ( editableDay.diaIce === '' || editableDay.diaIce === undefined ) {
      this.alerta3();
    } else {

      const resultRequest: IResultadoRequest = {
        test: 'Test ICE Baron',
        descripcion: 'Resolver este tests urgente!',
        date: null,
        expdate: editableDay.diaIce
      };

      const url = 'api/tests/results/' + resultadoId;
        submitForm('PUT', url, resultRequest, (status, response) => {
          if (status === 204) {
            this.setState({ show: true});
          } else {
            console.log('ERROR?!...', response);
            this.setState({ error: response });
          }
      });
    }
  }

  alerta1  = () => {
    this.setState ({
      mensaje1: 'red-text'
    });
  }

  alerta2  = () => {
    this.setState ({
      mensaje2: 'red-text'
    });
  }

  alerta3  = () => {
    this.setState ({
      mensaje3: 'red-text'
    });
  }

  render() {
    let params = this.props.params;
    const { editableDay, error } = this.state;

    return (
      <section>
        {params.resultados.map(resultado => (
          resultado.test === 'Test del Estres' ? (
            resultado.date === null ? (
              <div className='card blue-grey darken-1' key={resultado.id}>
                <div className='card-content white-text'>
                <span className='card-title'>{resultado.test}</span>
                  <h6>Estado: Test aún no resuelto</h6>
                  <h6>Fec. Límite: {resultado.expdate}</h6>
                  <p><a href='#' className='activator'>Extender fecha límite</a></p>
                </div>
                <div className='card-reveal'>
                  <span className='card-title grey-text text-darken-4'>Extender días<i className='material-icons right'>close</i></span>
                  <div className='row'>
                    <form className='col s12' onSubmit={this.onSubmit1}>
                      <div className='row'>
                        <div className='input-field col s6'>
                          <InputNumber object={editableDay} error={error} label='' name='diaEst' onChange={this.onInputChange} />
                          <b className={this.state.mensaje1}>Campo incompleto</b>
                        </div>
                        <div className='input-field col s6'>
                          <button className='btn waves-effect waves-light' type='submit' name='action' onClick={() => this.setState({resultadoId: resultado.id})}>Actualizar
                            <i className='material-icons right'>send</i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='card-action'>
                  <Link to={`/alumnos/${params.id}/resultados/${resultado.id}`}>Recordar</Link>
                </div>
              </div>
            ) : (
              <div className='card blue-grey darken-1' key={resultado.id}>
                <div className='card-content white-text'>
                <span className='card-title'>{resultado.test}</span>
                  <h6>Fec. Resolución: {resultado.date}</h6>
                </div>
                <div className='card-tabs white'>
                  <br/>
                  <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={resultado.valores.sort((a, b) => Number(a.value) - Number(b.value))} margin={{top: 20, right: 30, left: 0, bottom: 20}}>
                    <Bar dataKey='value'>
                      {
                        resultado.valores.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                      }
                    </Bar>
                    <XAxis dataKey='tipo'/>
                    <YAxis/>
                    <Tooltip/>
                  </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className='card-action'>
                    <Link to={`/alumnos/${params.id}/resultados/${resultado.id}`}>Ver más detalles</Link>
                </div>
              </div>
            )
          ) : resultado.test === 'Test de Millon' ? (
            resultado.date === null ? (
              <div className='card blue-grey darken-1' key={resultado.id}>
                <div className='card-content white-text'>
                <span className='card-title'>{resultado.test}</span>
                  <h6>Estado: Test aún no resuelto</h6>
                  <h6>Fec. Límite: {resultado.expdate}</h6>
                  <p><a href='#' className='activator'>Extender fecha límite</a></p>
                </div>
                <div className='card-reveal'>
                  <span className='card-title grey-text text-darken-4'>Extender días<i className='material-icons right'>close</i></span>
                  <div className='row'>
                    <form className='col s12' onSubmit={this.onSubmit2}>
                      <div className='row'>
                        <div className='input-field col s6'>
                          <InputNumber object={editableDay} error={error} label='' name='diaMil' onChange={this.onInputChange} />
                          <b className={this.state.mensaje2}>Campo incompleto</b>
                        </div>
                        <div className='input-field col s6'>
                          <button className='btn waves-effect waves-light' type='submit' name='action' onClick={() => this.setState({resultadoId: resultado.id})}>Actualizar
                            <i className='material-icons right'>send</i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='card-action'>
                  <Link to={`/alumnos/${params.id}/resultados/${resultado.id}`}>Recordar</Link>
                </div>
              </div>
            ) : (
              <div className='card blue-grey darken-1' key={resultado.id}>
                <div className='card-content white-text'>
                  <span className='card-title'>{resultado.test}</span>
                  <h6>Fec. Resolución: {resultado.date}</h6>
                </div>
                <div className='card-tabs white'>
                  <br/>
                  <ResponsiveContainer width='100%' height={300}>
                    <AreaChart width={600} height={400} data={resultado.valores.sort((a, b) => Number(a.posicion) - Number(b.posicion))} margin={{top: 5, right: 30, left: 0, bottom: 5}}>
                    <XAxis dataKey='tipo'/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='value' stroke='#3E84D9' fill='#3E84D9' />
                  </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className='card-action'>
                    <Link to={`/alumnos/${params.id}/resultados/${resultado.id}`}>Ver más detalles</Link>
                </div>
              </div>
            )
          ) : (
            resultado.date === null ? (
              <div className='card blue-grey darken-1' key={resultado.id}>
                <div className='card-content white-text'>
                <span className='card-title'>{resultado.test}</span>
                  <h6>Estado: Test aún no resuelto</h6>
                  <h6>Fec. Límite: {resultado.expdate}</h6>
                  <p><a href='#' className='activator'>Extender fecha límite</a></p>
                </div>
                <div className='card-reveal'>
                  <span className='card-title grey-text text-darken-4'>Extender días<i className='material-icons right'>close</i></span>
                  <div className='row'>
                    <form className='col s12' onSubmit={this.onSubmit3}>
                      <div className='row'>
                        <div className='input-field col s6'>
                          <InputNumber object={editableDay} error={error} label='' name='diaIce' onChange={this.onInputChange} />
                          <b className={this.state.mensaje3}>Campo incompleto</b>
                        </div>
                        <div className='input-field col s6'>
                          <button className='btn waves-effect waves-light' type='submit' name='action' onClick={() => this.setState({resultadoId: resultado.id})}>Actualizar
                            <i className='material-icons right'>send</i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='card-action'>
                  <Link to={`/alumnos/${params.id}/resultados/${resultado.id}`}>Recordar</Link>
                </div>
              </div>
            ) : (
              <div className='card blue-grey darken-1' key={resultado.id}>
                <div className='card-content white-text'>
                  <span className='card-title'>{resultado.test}</span>
                  <h6>Fec. Resolución: {resultado.date}</h6>
                </div>
                <div className='card-tabs white'>
                  <br/>
                  <ResponsiveContainer width='100%' height={300}>
                    <BarChart data={resultado.valores.sort((a, b) => Number(a.posicion) - Number(b.posicion))} margin={{top: 5, right: 30, left: 0, bottom: 5}}>
                      <XAxis dataKey='tipo'/>
                      <YAxis/>
                      <Tooltip/>
                      <Bar dataKey='value'>
                        {
                          resultado.valores.map((entry, index) => <Cell fill={COLORS2[index % COLORS2.length]}/>)
                        }
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className='card-action'>
                    <Link to={`/alumnos/${params.id}/resultados/${resultado.id}`}>Ver más detalles</Link>
                </div>
              </div>
            )
          )
        ))}
        <SweetAlert
          show={this.state.show}
          type='success'
          title='Fecha límite actualizado'
          onConfirm={ () => {
            this.setState({
              show: false
            });
            window.location.reload();
          }}
        />
      </section>
    );
  }
}
