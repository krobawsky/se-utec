import * as React from 'react';

import { Link } from 'react-router';
import { url, submitForm } from '../../util';
import Input from '../form/Input';
import RadioInput from '../form/RadioInput4';

import SweetAlert from '../../../node_modules/sweetalert-react';
import '../../../node_modules/sweetalert/dist/sweetalert.css';

import { IError, IRouterContext, ITest, IPregunta, IAlternativa } from '../../types';


interface ISalud {
  enfermedad?: string;
  enfermedades?: any;
  grado?: string;
  alergia?: string;
  medicamento?: string;
  sangre?: string;
  conTratamiento?: string;
  tratamiento?: string;
  tratamientoOtro?: string;
}

const alternativas = [{id: 1, value: 1, alternativa: 'Si'}, {id: 2, value: 2, alternativa: 'No'}];
const grados = [{id: 1, value: 1, alternativa: 'Crónico'}, {id: 2, value: 2, alternativa: 'Permanente'}, {id: 3, value: 3, alternativa: 'En proceso de superación'}, {id: 4, value: 4, alternativa: 'Superada'}];
const tratamientos = [{id: 1, value: 1, alternativa: 'MÉDICO PARTICULAR'}, {id: 2, value: 2, alternativa: 'CLÍNICA'}, {id: 3, value: 3, alternativa: 'HOSPITAL'}, {id: 4, value: 4, alternativa: 'ESSALUD'}, {id: 5, value: 5, alternativa: 'Otro'}];

interface IPregProps {
  initialSalud?: ISalud;
}

interface IResultState {
  salud?: ISalud;
  error?: IError;
  defvalue?: string;
  mensaje?: string;
}

interface IResultadoRequest {
  id?: number;
  test?: string;
  descripcion?: string;
  date?: string;
}

interface IValoresRequest {
  tipo?: string;
  value?: number;
  posicion?: number;
  descripcion?: string;
}

export default class Pregunta extends React.Component<IPregProps, IResultState> {

  context: IRouterContext;

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      salud: Object.assign({}, props.initialSalud),
      defvalue: '',
      mensaje: 'transparent-text'
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(name: string, value: string) {
    const { salud, error } = this.state;
    const modifiedSalud = Object.assign({}, salud, { [name]: value });
    this.setState({
      salud: modifiedSalud
    });

    console.log(salud);
  }

  onSubmit(event) {
    event.preventDefault();

  }

  render() {
    const { salud, error, defvalue } = this.state;
    return (
       <div>
        <div className='col-sm-12'>
          <form onSubmit={this.onSubmit}>
            <div className='row'>
                <br/>
                <div className='col s12 m8 l8'>
                  <strong className='title grey-text text-darken-3'>¿PADECES DE ALGUNA ENFERMEDAD?</strong>
                </div>
                <div className='col s12 m4 l4' >
                  <RadioInput object={salud} error={error} name='enfermedad' options={alternativas} onChange={this.onInputChange}/>
                </div>
                <br/>
            </div>
            { salud.enfermedad === 'Si' ? (
              <div className='row'>
                <div className='col s12'>
                  <strong className='title grey-text text-darken-3'>INDICA QUÉ ENFERMEDAD PADECES:</strong>
                  <select multiple id='selectmultid' defaultValue={['1', '2', '3']}>>
                    <option value='1'>DIABETES</option>
                    <option value='2'>HIPERTENSIÓN ARTERIAL</option>
                    <option value='3'>ASMA</option>
                    <option value='4'>EPILEPSIA</option>
                    <option value='4'>OTRAS</option>
                  </select>
                  <br/>
                </div>
                <div className='col s12'>
                  <strong className='title grey-text text-darken-3'>INDICA EL GRADO DE LA ENFERMEDAD:</strong>
                </div>
                <div className='col s12' >
                  <RadioInput object={salud} error={error} name='grado' options={grados} onChange={this.onInputChange}/>
                </div>
                <br/>
              </div>
              ) : null
            }
            <div className='row'>
              <strong className='title grey-text text-darken-3'>SI PADECES DE ALGUNA ALERGIA, INDICA:</strong>
              <select multiple id='selectmultid'>
                  <option value='' disabled selected>Selecciona</option>
                  <option value='1'>BETALACTÁMICOS (Penicilina, Cefalosporinicos)</option>
                  <option value='2'>ANALGÉSICOS-ANTI-INFLAMATORIOS</option>
                  <option value='3'>OTRAS</option>
              </select>
              <br/>
            </div>
            <div className='form-group has-feedback'>
              <Input object={salud} error={error} label='SI TOMAS MEDICAMENTOS, INDICA CUÁL (ES):' name='medicamento' onChange={this.onInputChange} />
            </div>
            <div className='form-group has-feedback'>
              <Input object={salud} error={error} label='Grupo sanguíneo?' name='sangre' onChange={this.onInputChange} />
            </div>
            <div className='row'>
                <br/>
                <div className='col s12 m8 l8'>
                  <strong className='title grey-text text-darken-3'>¿TE ENCUENTRAS SIGUIENDO ALGÚN TRATAMIENTO MÉDICO PERMANENTE?</strong>
                </div>
                <div className='col s12 m4 l4' >
                  <RadioInput object={salud} error={error} name='conTratamiento' options={alternativas} onChange={this.onInputChange}/>
                </div>
                <br/>
            </div>
            { salud.conTratamiento === 'Si' ? (
              <div class='input-field col s12'>
                <br/>
                <div className='col s12'>
                  <strong className='title grey-text text-darken-3'>SI MARCASTE SÍ, ESPECIFICA:</strong>
                </div>
                <div className='col s12' >
                  <RadioInput object={salud} error={error} name='tratamiento' options={tratamientos} onChange={this.onInputChange}/>
                  { salud.tratamiento === 'Otro' ? (
                    <Input object={salud} error={error} label='Otro:' name='tratamientoOtro' onChange={this.onInputChange} />
                    ) : null
                  }
                </div>
                <br/>
              </div>
              ) : null
            }
          </form>
          <br/><br/><br/>
        </div>
      </div>
    );
  }
}

const Results = React.createClass({
    render: function() {
        return (
            <h1>XD</h1>
        );
    }
});