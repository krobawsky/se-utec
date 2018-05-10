import * as React from 'react';

import { IRouter, Link } from 'react-router';
import { url, submitForm } from '../../util';

import { Digits, NotEmpty } from '../form/Constraints';
import Input from '../form/Input';
import RadioB from '../form/RadioB';
import RadioInput from '../form/RadioInput4';

import SweetAlert from '../../../node_modules/sweetalert-react';
import '../../../node_modules/sweetalert/dist/sweetalert.css';
import '../../../public/css/form-color.css';

import * as $ from '../../../node_modules/jquery';

import { IError, IRouterContext, ITest, IPregunta, IAlternativa } from '../../types';
import { IInputChangeHandler, IFieldError, IAlumno, IFormularioRequest } from '../../types';


const alternativas = [{id: 1, value: 1, alternativa: 'Si'}, {id: 2, value: 2, alternativa: 'No'}];
const grados = [{id: 1, value: 1, alternativa: 'Crónico'}, {id: 2, value: 2, alternativa: 'Permanente'}, {id: 3, value: 3, alternativa: 'En proceso de superación'}, {id: 4, value: 4, alternativa: 'Superada'}];
const tratamientos = [{id: 1, value: 1, alternativa: 'MÉDICO PARTICULAR'}, {id: 2, value: 2, alternativa: 'CLÍNICA'}, {id: 3, value: 3, alternativa: 'HOSPITAL'}, {id: 4, value: 4, alternativa: 'ESSALUD'}, {id: 5, value: 5, alternativa: 'Otro'}];


const tip = [{ value: 'Test del Estres', name: 'Test del Estres'}, { value: 'Test de Millon', name: 'Test de Millon'}, { value: 'Test ICE Baron', name: 'Test ICE Baron'}];

const depArray = [];
  depArray['Amazonas'] = ['Chachapoyas', 'Bagua', 'Bongara', 'Condorcanqui', 'Luya', 'Rodriguez de Mendoza', 'Utcubamba'];
  depArray['Ancash'] = ['Huaraz', 'Aija', 'Antonio Raimondi', 'Asuncion', 'Bolognesi', 'Carhuaz', 'Carlos Fermin Fitzcarrald', 'Casma', 'Corongo', 'Huari', 'Huarmey', 'Huaylas', 'Mariscal Luzuriaga', 'Ocros', 'Pallasca', 'Pomabamba', 'Recuay', 'Santa', 'Sihuas', 'Yungay'];
  depArray['Apurimac'] = ['Abancay', 'Andahuaylas', 'Antabamba', 'Aymaraes', 'Cotabambas', 'Chincheros', 'Grau'];
  depArray['Arequipa'] = ['Arequipa', 'Camana', 'Caraveli', 'Castilla', 'Caylloma', 'Condesuyos', 'Islay', 'La Union'];
  depArray['Ayacucho'] = ['Huamanga', 'Cangallo', 'Huancasancos', 'Huanta', 'La Mar', 'Lucanas', 'Parinacochas', 'Paucar del Sara Sara', 'Sucre', 'Victor Fajardo', 'Vilcashuaman'];
  depArray['Cajamarca'] = ['Cajamarca', 'Cajabamba', 'Celendin', 'Chota', 'Contumaza', 'Cutervo', 'Hualgayoc', 'Jaen', 'San Ignacio', 'San Marcos', 'San Miguel', 'San Pablo', 'Santa Cruz'];
  depArray['Cusco'] = ['Cusco', 'Acomayo', 'Anta', 'Calca', 'Canas', 'Canchis', 'Chumbivilcas', 'Espinar', 'La Convencion', 'Paruro', 'Paucartambo', 'Quispicanchi', 'Urubamba'];
  depArray['Huancavelica'] = ['Huancavelica', 'Acobamba', 'Angaraes', 'Castrovirreyna', 'Churcampa', 'Huaytara', 'Tayacaja'];
  depArray['Huanuco'] = ['Huanuco', 'Ambo', 'Dos de Mayo', 'Huacaybamba', 'Huamalies', 'Leoncio Prado', 'Marañon', 'Pachitea', 'Puerto Inca', 'Lauricocha', 'Yarowilca'];
  depArray['Ica'] = ['Ica', 'Chincha', 'Nazca', 'Palpa', 'Pisco'];
  depArray['Junin'] = ['Huancayo', 'Concepcion', 'Chanchamayo', 'Chupaca', 'Jauja', 'Junin', 'Satipo', 'Tarma', 'Yauli'];
  depArray['La Libertad'] = ['Trujillo', 'Ascope', 'Bolivar', 'Chepen', 'Julcan', 'Otuzco', 'Pacasmayo', 'Pataz', 'Sanchez Carrion', 'Santiago de Chuco', 'Gran Chimu', 'Viru'];
  depArray['Lambayeque'] = ['Chiclayo', 'Ferreñafe', 'Lambayeque'];
  depArray['Lima'] = ['Lima', 'Barranca', 'Cajatambo', 'Canta', 'Cañete', 'Huaral', 'Huarochiri', 'Huaura', 'Oyon', 'Yauyos'];
  depArray['Loreto'] = ['Maynas', 'Alto Amazonas', 'Loreto', 'Mariscal Ramon Castilla', 'Requena', 'Ucayali', 'Datem del Marañon', 'Putumayo'];
  depArray['Madre de Dios'] = ['Tambopata', 'Manu', 'Tahuamanu'];
  depArray['Moquegua'] = ['Mariscal Nieto', 'General Sanchez Cerro', 'Ilo'];
  depArray['Pasco'] = ['Pasco', 'Daniel Alcides Carrion', 'Oxapampa'];
  depArray['Piura'] = ['Piura', 'Ayabaca', 'Huancabamba', 'Morropon', 'Paita', 'Sechura', 'Sullana', 'Talara'];
  depArray['Puno'] = ['Puno', 'Azangaro', 'Carabaya', 'Chucuito', 'El Collao', 'Huancane', 'Lampa', 'Melgar', 'Moho', 'San Antonio de Putina', 'San Roman', 'Sandia', 'Yunguyo'];
  depArray['San Martin'] = ['Moyobamba', 'Bellavista', 'El Dorado', 'Huallaga', 'Lamas', 'Mariscal Caceres', 'Picota', 'Rioja', 'San Martin', 'Tocache'];
  depArray['Tacna'] = ['Tacna', 'Candarave', 'Jorge Basadre', 'Tarata'];
  depArray['Tumbes'] = ['Tumbes', 'Contralmirante Villar', 'Zarumilla'];
  depArray['Ucayali'] = ['Coronel Portillo', 'Atalaya', 'Padre Abad', 'Purus'];

interface IResFormularioRequest {
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

interface IResultadoRequest {

}

interface IFormularioProps {
  initialFormulario?: IFormularioRequest;
  resultadoId?: string;
  alumnoId?: string;
}

interface IFormularioState {
  editableFormulario?: IFormularioRequest;
  formulario?: IFormularioRequest;
  error?: IError;
  defvalue?: string;
  mensaje?: string;
  progress?: string;
  show?: boolean;
  show2?: boolean;
  value?: string;
};


export default class Pregunta extends React.Component<IFormularioProps, IFormularioState> {

  context: IRouterContext;

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      formulario: Object.assign({}, props.initialFormulario),
      defvalue: '',
      mensaje: 'transparent-text',
      progress: 'progress scale-transition scale-out',
      show: false,
      show2: false,
      value: '4'
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeDeporte = this.handleOnChangeDeporte.bind(this);
    this.handleOnChangeEnfermedad = this.handleOnChangeEnfermedad.bind(this);
    this.handleOnClickDeporte = this.handleOnClickDeporte.bind(this);
    this.handleOnClickEnfermedad = this.handleOnClickEnfermedad.bind(this);
    this.handleOnClickTratamiento = this.handleOnClickTratamiento.bind(this);
  }

  onInputChange(name: string, value: string) {
    const { formulario, error } = this.state;
    const modifiedForm = Object.assign({}, formulario, { [name]: value });
    this.setState({
      formulario: modifiedForm
    });

    console.log(formulario);
  }

  onSubmit(event) {
    event.preventDefault();

    let resultadoId = this.props.resultadoId;
    let alumnoId = this.props.alumnoId;

    const e = document.getElementById('departamentos');
    const dep = e.options[e.selectedIndex].value;
    console.log('1. departamento:' + dep);

    const p = document.getElementById('provincias');
    const prov = p.options[p.selectedIndex].value;
    console.log('2. provinciaaa:' + prov);

    const lugarN = dep + ', ' + prov;
    const contacto = document.getElementById('ctoNombres').value;
    console.log('3. Nombre contacto: ' + contacto);

    const parent = document.getElementsByName('par');
    let parentesco;
    for (let i = 0; i < parent.length; i++) {
    if (parent[i].checked) {
      parentesco = parent[i].value;
        console.log('4. Parentesco: ' + parentesco);
      }
    }

    const tel = document.getElementById('telefono').value;
    if (tel.match('^[0-9]+$') && tel.length === 9) {
      console.log('5. Celular: ' + tel);
      this.test();
    } else {
      this.setState({ show: true });
    }

    const conviv = document.getElementsByName('conv');
    let conviviente;
    for (let i = 0; i < conviv.length; i++) {
      if (conviv[i].checked) {
        conviviente = conviv[i].value;
        if (conviviente === 'Otros') {
          const otros = document.getElementById('conviotros').value;
          conviviente = otros;
        }
        console.log('6.Convivencia: ' + conviviente);
      }
    }

    const vivi = document.getElementsByName('viv');
    let vivienda;
    for (let i = 0; i < vivi.length; i++) {
      if (vivi[i].checked) {
        vivienda = vivi[i].value;
      }
    }
    console.log('7.Vivienda: ' + vivienda);

    const enf = document.getElementsByName('enf');
    let gradoEnf;
    let enfermedad;
    if (enf[0].checked) {
      enfermedad = document.getElementById('enfermedad').value;
      console.log('8.Enfermedad: ' + enfermedad);
      const grado = document.getElementsByName('gradoenf');
      for (let i = 0; i < grado.length; i++) {
        if (grado[i].checked) {
          gradoEnf = grado[i].value;
          if ( gradoEnf === 'Otros') {
            const enfotr = document.getElementById('enfermotros').value;
            gradoEnf = enfotr;
          }
        }
      }
      console.log('9.Grado Enfermedad: ' + gradoEnf);
    } else {
      enfermedad = 'Ninguna';
      gradoEnf = 'Ninguno';
      console.log('8.No enfermedad');
      console.log('9.No Grado Enfermedad');
    }

    const alergia = document.getElementById('selectmultid');
    let alergias;
    let cont = 0;
    for (let i = 0; i < alergia.options.length; i++) {
      const opt = alergia.options[i];
      if (opt.selected) {
        if (cont === 0) {
          alergias = opt.value;
        }else {
          alergias = alergias + ',' + opt.value;
        }
        cont++;
        console.log('10. Alergias:' + alergias);
      } else if (opt.value === '0') {
        alergias = 'Ninguna';
        console.log('10. Alergias: Ninguna');
      }
    }

    let medic = document.getElementById('medicamentos').value;
      if (medic === '') {
        medic = 'Ninguno';
      }
    console.log('11. Medicamentos:' + medic);

    const t = document.getElementsByName('trat');
    let trat;
    if (t[0].checked) {
      trat = document.getElementById('tratamiento').value;
      if ( trat === 'Otros') {
        trat = document.getElementById('tratotros').value;
      }
        console.log('12.tratamiento: ' + trat);
    } else {
      trat = 'Ninguno';
      console.log('12. No tratamiento');
    }

    const ds = document.getElementById('deporteselect');
    let depor = ds.options[ds.selectedIndex].value;
    if ( depor === 'Otros') {
      const deportotr = document.getElementById('deporteotros').value;
      depor = deportotr;
    }
    console.log('13.Deporte:' + depor);

    const depfed = document.getElementsByName('federacion');
    let fede;
    if (depfed[0].checked) {
      fede = document.getElementById('depfederacion').value;
      console.log('14.Federacion: ' + fede);
    }else {
      fede = 'Ninguna';
      console.log('14.No federacion');
    }

    const tlib = document.getElementById('tlibres').value;
    console.log('15.tiempos libres: ' + tlib);

    const im = document.getElementsByName('musical');
    let inst;
    if (im[0].checked) {
      inst = document.getElementById('instmusical').value;
      if ( inst === 'Otros') {
        const instotr = document.getElementById('instotros').value;
        inst = instotr;
      }
      console.log('16.Instrumento Musical:' + inst);
    } else {
      inst = 'Ninguno';
      console.log('16. No Instrumento Musical');
    }

    const asoc = document.getElementsByName('asoc');
    let asociacion;
    if (asoc[0].checked) {
      asociacion = document.getElementById('asociacion').value;
      console.log('16.Asociacion: ' + asociacion);
    }else {
      asociacion = 'Ninguna';
      console.log('17.No Asociacion');
    }

    // Dia actual
        const fec = new Date();
        let dd = fec.getDate();
        let mm = fec.getMonth() + 1;

        const yyyy = fec.getFullYear();
        if ( dd < 10) {
            dd = '0' + dd;
        }
        if ( mm < 10) {
            mm = '0' + mm;
        }
        const today = yyyy + '/' + mm + '/' + dd;

        // Update
        const resultRequest: IResultadoRequest = {
          test: 'Formulario',
          descripcion: '',
          date: today
        };

        const urlRes = 'api/tests/results/' + resultadoId;
        submitForm('PUT', urlRes, resultRequest, (status, response) => {
              if (status === 204) {
                console.log('OK!');
                this.setState({ show2: true });
              } else {
                console.log('ERROR?!...', response);
                this.setState({ error: response });
              }
        });

    /*
    const resultRequest: IResultadoRequest = {
        lugarNacimiento: lugarN,
        nombreContacto: contacto,
        parentescoContacto: parentesco,
        telefonoContacto: tel,
        conviviente: conviviente,
        vivienda: vivienda,
        enfermedad: enfermedad,
        gradoEnfermedad: gradoEnf,
        alergias: alergias,
        medicamentos: medic,
        tratamiento: trat,
        deporte: depor,
        federacionDeportiva: fede,
        tiemposLibres: tlib,
        instrumentoMusical: inst,
        asociacion: asociacion
    };*/

    const resFormRequest: IResFormularioRequest = {
        lugar_nacimiento: lugarN,
        nombre_contacto: contacto,
        parentesco_contacto: parentesco,
        telefono_contacto: tel,
        conviviente: conviviente,
        vivienda: vivienda,
        enfermedad: enfermedad,
        grado_enfermedad: gradoEnf,
        alergias: alergias,
        medicamentos: medic,
        tratamiento: trat,
        deporte: depor,
        federacion_deportiva: fede,
        tiempos_libres: tlib,
        instrumento_musical: inst,
        asociacion: asociacion
    };
    console.log(resFormRequest);

    const url = 'api/tests/resultsForm/' + alumnoId + '/values';
      submitForm('POST', url, resFormRequest, (status, response) => {
      if (status === 204) {
        console.log('res: ', response);
      } else {
        console.log('Error?!...', response);
      }
    });


  }

  handleOnChange(event) {
    console.log(event.target.value);
    const cList = depArray[event.target.value];
    const cSelect = document.getElementById('provincias');
    // remove the current options from the country select
    const len = cSelect.options.length;
    while (cSelect.options.length > 0) {
      cSelect.remove(0);
    }
    let newOption;
    // create new options
    for (let i = 0; i < cList.length; i++) {
      newOption = document.createElement('option');
      newOption.value = cList[i];  // assumes option string and value are the same
      newOption.text = cList[i];
      // add the new option
      try {
        cSelect.add(newOption);  // this will fail in DOM browsers but is needed for IE
      }
      catch (e) {
        cSelect.appendChild(newOption);

      }
    }

  }

  handleOnClickConvivencia(evt) {
    console.log(event.target.value);
    const val = evt.target.value;
    const inst = document.getElementById('conviotros');
    console.log('eliminando disabledd');
    inst.disabled = false;

  }

  handleOnClickEnfermedad(evt) {
    console.log(event.target.value);
    const val = evt.target.value;
    const enf = document.getElementById('enfermedad');
    const radios = document.getElementsByName('gradoenf');

    if (val === 'Si') {
      console.log('eliminando dissbledd');
      enf.disabled = false;
      for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = false;
      }
    }else {
    enf.disabled = true;
    for (let n = 0; n < radios.length; n++) {
        radios[n].disabled = true;
      }
    }

  }

  handleOnChangeEnfermedad(event) {
    console.log(event.target.value);
    const valor = event.target.value;
    const otr = document.getElementById('enfermotros');

    if ( valor === 'Otros') {
      console.log('eliminando disableddas');
      otr.disabled = false;
    }else {
      otr.disabled = true;
    }

  }

  handleOnClickTratamiento(evt) {
    console.log(event.target.value);
    const val = evt.target.value;
    const trat = document.getElementById('tratamiento');

    if (val === 'Si') {
      console.log('eliminando disabledd');
      trat.disabled = false;
    }else {
      trat.disabled = true;
    }

  }

  handleOnChangeTratamiento(event) {
    console.log(event.target.value);
    const valor = event.target.value;
    const otr = document.getElementById('tratotros');

    if ( valor === 'Otros') {
      console.log('eliminando disableddas');
      otr.disabled = false;
    }else {
      otr.disabled = true;
    }

  }

  handleOnChangeDeporte(event) {
    console.log(event.target.value);
    const valor = event.target.value;
    const inp = document.getElementById('deporteotros');

    if ( valor === 'Otros') {
      console.log('eliminando disabeld');
      inp.disabled = false;
     // inp.removeAttribute('disabled');
    }else {
      inp.disabled = true;
    }

  }

  handleOnClickDeporte(evt) {
    console.log(event.target.value);
    const val = evt.target.value;
    const fed = document.getElementById('depfederacion');

    if (val === 'Si') {
      console.log('eliminando disabeld');
      fed.disabled = false;
    }else {
      fed.disabled = true;
    }

  }

  handleOnClickInstrumento(evt) {
    console.log(event.target.value);
    const val = evt.target.value;
    const inst = document.getElementById('instmusical');

    if (val === 'Si') {
      console.log('eliminando disabledd');
      inst.disabled = false;
    }else {
      inst.disabled = true;
    }

  }

  handleOnChangeInstrumento(event) {
    console.log(event.target.value);
    const valor = event.target.value;
    const ot = document.getElementById('instotros');

    if ( valor === 'Otros') {
      console.log('instrumento otros');
      ot.disabled = false;
    }else {
      ot.disabled = true;
    }

  }

  handleOnClickAsociacion(evt) {
    console.log(event.target.value);
    const val = evt.target.value;
    const asoc = document.getElementById('asociacion');

    if (val === 'Si') {
      asoc.disabled = false;
    }else {
      asoc.disabled = true;
    }

  }

  test  = () => {
    this.setState ({
      progress: 'progress scale-transition scale-in'
    });
  }

  render() {
    const { formulario, error, defvalue } = this.state;
    return (
      <span>
        <div className='row'>
          <div className='col s12 m8 offset-m2 left'>
            <div className='intro deep-purple darken-2 z-depth-1'>
              <div className='row'>
                <div className='col s12 m10 offset-m1 left'>
                <h2 className='white-text'>Resolver Formulario</h2>
                <p className='white-text'>Obligatorios (*)</p>
                </div>
              </div>
            </div>
            <div className='card white'>
              <div className='card-content grey-text text-darken-3'>
                  <div className='row'>
                    <form className='col s12 m10 offset-m1 left' onSubmit={this.onSubmit}>
                      <div className='row'>
                        <br/>
                        <h4 className='deep-purple-text text-darken-2'>1. Datos Personales</h4>
                        <div className='input-field col s12'>
                          <strong>Departamento *</strong><br/><br/>
                        </div>
                        <select id='departamentos' className='browser-default' onChange={this.handleOnChange} required>
                          <option value='0' selected='selected' disabled>Seleccione un departamento</option>
                          <option value='Amazonas'>Amazonas</option>
                          <option value='Ancash'>Ancash</option>
                          <option value='Apurimac'>Apurimac</option>
                          <option value='Arequipa'>Arequipa</option>
                          <option value='Ayacucho'>Ayacucho</option>
                          <option value='Cajamarca'>Cajamarca</option>
                          <option value='Cusco'>Cuzco</option>
                          <option value='Huancavelica'>Huancavelica</option>
                          <option value='Huanuco'>Huanuco</option>
                          <option value='Ica'>Ica</option>
                          <option value='Junin'>Junin</option>
                          <option value='La Libertad'>La Libertad</option>
                          <option value='Lambayeque'>Lambayeque</option>
                          <option value='Lima'>Lima</option>
                          <option value='Loreto'>Loreto</option>
                          <option value='Madre de Dios'>Madre de Dios</option>
                          <option value='Moquegua'>Moquegua</option>
                          <option value='Pasco'>Pasco</option>
                          <option value='Piura'>Piura</option>
                          <option value='Puno'>Puno</option>
                          <option value='San Martin'>San Martin</option>
                          <option value='Tacna'>Tacna</option>
                          <option value='Tumbes'>Tumbes</option>
                          <option value='Ucayali'>Ucayali</option>
                        </select>
                        <br></br>
                        <div className='input-field col s12'>
                          <strong>Provincia *</strong><br/><br/>
                        </div>
                        <select id='provincias' className='browser-default' required>
                          <option value='' selected='selected' disabled>Selecciona una provincia</option>
                        </select>
                        <br/>
                      </div>
                      <div className='row'>
                        <br/>
                        <h4 className='deep-purple-text text-darken-2'>2. Contactos de emergencia</h4>
                        <div className='input-field col s12'>
                          <strong className='title'>Nombres y apellidos *</strong>
                          <input id='ctoNombres' type='text' required/>
                        </div>
                        <br></br><br></br>
                        <div className='input-field col s12'>
                          <strong className='title'>Parentescos *</strong><br/><br/>
                        </div>
                          <input className='with-gap' name='par' id='padre' value='Padre' type='radio' defaultChecked/>
                          <label htmlFor='padre'>Padre</label><br></br>
                          <input className='with-gap' name='par' id='madre' value='Madre' type='radio'/>
                          <label htmlFor='madre'>Madre</label><br></br>
                          <input className='with-gap' name='par' id='apoderado' value='Apoderado' type='radio'/>
                          <label htmlFor='apoderado'>Apoderado</label><br></br>
                        <br></br>
                        <div className='input-field col s6'>
                          <strong>Telefono *</strong>
                          <input id='telefono' type='number' data-length='9' required/>
                        </div>
                      </div>
                      <div className='row'>
                      <br/>
                      <h4 className='deep-purple-text text-darken-2'>3. Convivencia</h4>
                        <div className='input-field col s12'>
                          <strong className='title'>Indica con quien vives *</strong><br/><br/>
                        </div>
                        <input className='with-gap' name='conv' id='p1' value='Padres' type='radio' defaultChecked/>
                        <label htmlFor='p1'>Padres</label><br></br>
                        <input className='with-gap' name='conv' id='p2' value='Padre' type='radio'/>
                        <label htmlFor='p2'>Padre</label><br></br>
                        <input className='with-gap' name='conv' id='p3' value='Madre' type='radio'/>
                        <label htmlFor='p3'>Madre</label><br></br>
                        <input className='with-gap' name='conv' id='p4' value='Familiares' type='radio'/>
                        <label htmlFor='p4'>Familiares</label><br></br>
                        <input className='with-gap' name='conv' id='p5' value='Solo' type='radio'/>
                        <label htmlFor='p5'>Solo</label><br></br>
                        <input className='with-gap' name='conv' id='p6' value='Otros' type='radio' onClick={this.handleOnClickConvivencia}/>
                        <label htmlFor='p6'>Otros:</label>
                        <div className='input-field inline'>
                          <input id='conviotros' type='text' disabled/>
                        </div>
                        <div className='input-field col s12'>
                          <strong className='title'>Tipo de vivienda actual *</strong><br/><br/>
                        </div>
                        <br/><br/>
                        <input className='with-gap' name='viv' id='casa' value='Casa' type='radio' defaultChecked/>
                        <label htmlFor='casa'>Casa</label><br></br>
                        <input className='with-gap' name='viv' id='dep' value='Departamento' type='radio'/>
                        <label htmlFor='dep'>Departamento</label><br></br>
                        <input className='with-gap' name='viv' id='pension' value='Pension' type='radio'/>
                        <label htmlFor='pension'>Pension</label><br></br>
                        <input className='with-gap' name='viv' id='viv' value='Vivienda' type='radio'/>
                        <label htmlFor='viv'>Vivienda Familiar</label><br></br>
                        <br/>
                      </div>
                      <div className='row'>
                        <br/>
                        <h4 className='deep-purple-text text-darken-2'>4. Salud</h4>
                          <br/>
                          <div className='row col s12'>
                            <div className='col s12'>
                              <strong className='title grey-text text-darken-3'>¿PADECES DE ALGUNA ENFERMEDAD? *</strong><br/>
                            </div>
                            <div className='col s3'>
                              <input className='with-gap' name='enf' id='sienf' value='Si' type='radio' onClick={this.handleOnClickEnfermedad}/>
                              <label htmlFor='sienf'>Si</label><br></br>
                              <input className='with-gap' name='enf' id='noenf' value='No' type='radio' onClick={this.handleOnClickEnfermedad} defaultChecked/>
                              <label htmlFor='noenf'>No</label>
                            </div>
                          </div>
                          <br/><br/>
                          <div className='row col s12'>
                                <div className='col s12'>
                                  <strong className='title grey-text text-darken-3'>¿Cuál?</strong><br/><br/>
                                </div>
                                <div className='col s12'>
                                  <div className='col s12 m6'>
                                    <select id='enfermedad' className='browser-default' onChange={this.handleOnChangeEnfermedad} disabled required>
                                      <option value='' disabled selected>Seleccione la enfermedad</option>
                                      <option value='Diabetes'>Diabetes</option>
                                      <option value='Hipertensión'>Hipertensión Arterial</option>
                                      <option value='Asma'>Asma</option>
                                      <option value='Epilepsia'>Epilepsia</option>
                                      <option value='Otros'>Otros</option>
                                    </select>
                                  </div>
                                  <div className='input-field col s12 m6'>
                                    <input id='enfermotros' type='text' placeholder='' disabled required/>
                                    <label for='enfermotros'>Ingrese otra enfermedad</label>
                                  </div>
                                </div>
                          </div>
                            <br/><br/>
                            <div className='row col s12'>
                              <div className='col s12'>
                                <strong className='title grey-text text-darken-3'>Indica el grado de la enfermedad</strong><br/><br/>
                              </div>
                              <div className='col s8'>
                                <input className='with-gap' name='gradoenf' id='cronico' value='Cronico' type='radio' disabled/>
                                <label htmlFor='cronico'>Crónico</label><br></br>
                                <input className='with-gap' name='gradoenf' id='perm' value='Permanente' type='radio' disabled/>
                                <label htmlFor='perm'>Permanente</label><br></br>
                                <input className='with-gap' name='gradoenf' id='proceso' value='Proceso' type='radio' disabled/>
                                <label htmlFor='proceso'>En proceso de superación</label><br></br>
                                <input className='with-gap' name='gradoenf' id='superada' value='Superada' type='radio' disabled/>
                                <label htmlFor='superada'>Superada</label><br></br>
                              </div>
                            </div>
                            <br/><br/>
                            <div className='row col s12'>
                              <div className='col s12'>
                                <strong className='title grey-text text-darken-3'>SI PADECES DE ALGUNA ALERGIA, INDICA</strong>
                              </div>
                              <div className='col s12'>
                                <select multiple id='selectmultid'>
                                    <option value='0' disabled>Seleccionar alergias</option>
                                    <option value='Beta'>BETALACTÁMICOS (Penicilina, Cefalosporinicos)</option>
                                    <option value='Analgesicos'>ANALGÉSICOS-ANTI-INFLAMATORIOS</option>
                                    <option value='Otros'>OTRAS</option>
                                </select>
                              </div>
                            </div><br/><br/>
                            <div className='row col s12'>
                              <div className='input-field col s10'>
                                <strong className='title grey-text text-darken-3'>SI TOMAS MEDICAMENTOS, INDICA CUÁL (ES)</strong>
                                <input id='medicamentos' type='text'/>
                              </div>
                            </div><br/><br/>
                            <div className='row col s12'>
                              <div className='col s12'>
                                <strong className='title grey-text text-darken-3'>¿TE ENCUENTRAS SIGUIENDO ALGÚN TRATAMIENTO MÉDICO PERMANENTE? *</strong><br/><br/>
                              </div>
                              <div className='col s3'>
                                <input className='with-gap' name='trat' id='sitrat' value='Si' type='radio' onClick={this.handleOnClickTratamiento}/>
                                <label htmlFor='sitrat'>Si</label><br></br>
                                <input className='with-gap'   name='trat' id='notrat' value='No' type='radio' onClick={this.handleOnClickTratamiento} defaultChecked/>
                                <label htmlFor='notrat'>No</label>
                              </div>
                            </div><br/>
                            <div className='row col s12'>
                              <div className='input-field'>
                                <div className='col s12'>
                                  <strong className='title grey-text text-darken-3'>Especifica:</strong><br/><br/>
                                </div>
                                <div className='col s12'>
                                  <div className='col s12 m6'>
                                    <select id='tratamiento' className='browser-default' onChange={this.handleOnChangeTratamiento} disabled required>
                                      <option value='' disabled selected>Seleccione el tratamiento</option>
                                      <option value='Medico'>Médico Particular</option>
                                      <option value='Clínica'>Clínica</option>
                                      <option value='Hospital'>Hospital</option>
                                      <option value='Essalud'>Essalud</option>
                                      <option value='Otros'>Otro</option>
                                    </select>
                                  </div>
                                  <div className='input-field col s12 m6'>
                                    <input id='tratotros' type='text' placeholder='' disabled required/>
                                    <label for='tratotros'>Ingrese otro tratamiento</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          <br/>
                      </div>
                      <div className='row'>
                        <br/>
                        <h4 className='deep-purple-text text-darken-2'>5. Recreación</h4>
                          <br/><br/>
                          <div className='row col s12'>
                              <div className='col s12'>
                                <strong className='title grey-text text-darken-3'>SI PRACTICAS ALGUN DEPORTE, INDICAR CUAL ES *</strong><br/><br/>
                              </div>
                              <div className='col s12'>
                                <div className='col s12 m6'>
                                  <select id='deporteselect' className='browser-default' onChange={this.handleOnChangeDeporte} required>
                                    <option value='' disabled selected>Seleccione el deporte</option>
                                    <option value='Fútbol'>Fútbol</option>
                                    <option value='Voley'>Voley</option>
                                    <option value='Basquet'>Basquet</option>
                                    <option value='Natación'>Natación</option>
                                    <option value='Muaythai'>Muaythai</option>
                                    <option value='Ninguno'>Ninguno</option>
                                    <option value='Otros'>Otro</option>
                                  </select>
                                </div>
                                <div className='input-field col s12 m6'>
                                  <input id='deporteotros' type='text' placeholder='' disabled required/>
                                  <label for='deporteotros'>Ingrese otro deporte</label>
                                </div>
                              </div>
                          </div>
                          <br/><br/>
                          <div className='row col s12'>
                              <div className='col s12'>
                                <strong className='title grey-text text-darken-3'>¿Pertenece a alguna federacion deportiva? </strong><br/><br/>
                              </div>
                              <div className='col s3'>
                                <input className='with-gap' name='federacion' id='si' value='Si' type='radio' onClick={this.handleOnClickDeporte}/>
                                <label htmlFor='si'>Si</label><br></br>
                                <input className='with-gap' name='federacion' id='no' value='No' type='radio' onClick={this.handleOnClickDeporte} defaultChecked/>
                                <label htmlFor='no'>No</label><br></br>
                              </div>
                          </div>
                          <br/><br/>
                          <div className='row col s12'>
                            <div className='col s12'>
                              <strong className='title grey-text text-darken-3'>¿Cuál?</strong>
                            </div>
                            <div className='col s6'>
                              <select id='depfederacion' className='browser-default' disabled required>
                                 <option value='' disabled selected>Seleccione el deporte</option>
                                 <option value='Fútbol'>Fútbol</option>
                                 <option value='Voley'>Voley</option>
                                 <option value='Basquet'>Basquet</option>
                                 <option value='Natación'>Natación</option>
                                 <option value='Muaythai'>Muaythai</option>
                                 <option value='Ninguno'>Ninguno</option>
                                 <option value='Otros'>Otro</option>
                               </select>
                            </div>
                          </div>
                          <br/><br/>
                          <div className='row col s12'>
                            <div className='input-field col s10'>
                              <strong className='title grey-text text-darken-3'>¿QUE TE GUSTA HACER EN TUS TIEMPOS LIBRES? *</strong>
                              <input id='tlibres' type='text' required/>
                            </div>
                          </div>
                          <br/><br/>
                          <div className='row col s12'>
                            <div className='col s12'>
                              <strong className='title grey-text text-darken-3'>¿TOCAS ALGÚN INSTRUMENTO MUSICAL? *</strong><br></br>
                            </div>
                            <div className='col s3'>
                              <input className='with-gap' name='musical' id='msi' value='Si' type='radio' onClick={this.handleOnClickInstrumento}/>
                              <label htmlFor='msi'>Si</label><br></br>
                              <input className='with-gap' name='musical' id='mno' value='No' type='radio' onClick={this.handleOnClickInstrumento} defaultChecked/>
                              <label htmlFor='mno'>No</label><br></br>
                            </div>
                          </div>
                          <br/><br/>
                          <div className='row col s12'>
                            <div className='col s12'>
                              <strong className='title grey-text text-darken-3'>¿Cuál?</strong><br/><br/>
                            </div>
                            <div className='col s12 m6'>
                              <select id='instmusical' className='browser-default' onChange={this.handleOnChangeInstrumento} disabled required>
                                 <option value='' disabled selected>Seleccione el instrumento</option>
                                 <option value='Guitarra'>Guitarra</option>
                                 <option value='Violín'>Violín</option>
                                 <option value='Piano'>Piano</option>
                                 <option value='Saxofón'>Saxofón</option>
                                 <option value='Flauta'>Flauta</option>
                                 <option value='Otros'>Otro</option>
                              </select>
                            </div>
                            <div className='input-field col s12 m6'>
                                <input id='instotros' type='text' placeholder='' disabled required/>
                                <label for='instotros'>Ingrese otro intrumento</label>
                            </div>
                          </div>
                          <br/><br/>
                          <div className='row col s12'>
                            <div className='col s12'>
                              <strong className='title grey-text text-darken-3'>PERTENECES A ALGUNA ASOCIACIÓN, MOVIMIENTO, GRUPO O COMUNIDAD
                              (académica, artístico, cultural, deportivo, religioso, etc.)? *</strong><br/><br/>
                            </div>
                            <div className='col s3'>
                              <input className='with-gap' name='asoc' id='acsi' value='Si' type='radio' onClick={this.handleOnClickAsociacion}/>
                              <label htmlFor='acsi'>Si</label><br></br>
                              <input className='with-gap' name='asoc' id='acno' value='No' type='radio' onClick={this.handleOnClickAsociacion} defaultChecked/>
                              <label htmlFor='acno'>No</label><br></br>
                            </div>
                          </div>
                          <br/><br/>
                          <div className='row col s12'>
                            <div className='input-field col s12'>
                              <div className='col s12 m2'>
                                <strong className='title grey-text text-darken-3'>¿Cuál?</strong>
                              </div>
                              <div className='col s12 m8'>
                                <input id='asociacion' type='text' disabled required/>
                              </div>
                            </div>
                          </div>
                        </div>
                      <br/>
                      <div className='right'>
                        <button className='btn waves-effect waves-deep-purple btn-default deep-purple text-darken-2' type='submit'>Enviar<i className='material-icons right'>send</i></button>
                      </div>
                      <br/><br/>
                      <div className={this.state.progress}>
                        <div className='indeterminate deep-purple text-darken-2'></div>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
            <SweetAlert
              show={this.state.show}
              type='error'
              title='El teléfono debe ser igual o menor a 9 dígitos'
              onConfirm={ () => {
                this.setState({ show: false });
              }}
            />
            <SweetAlert
              show={this.state.show2}
              type='success'
              title='Se contesto el formulario correctamente'
              onConfirm={ () => {
                this.setState({ show2: false });
                this.context.router.push({
                  pathname: '/'
                });
              }}
            />
       </div>
      </span>
    );
  }
}