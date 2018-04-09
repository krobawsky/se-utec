import * as React from 'react';
import { IRouter, Link } from 'react-router';
import { IAlumno, ITest, IRouterContext } from '../../types';
import InputH from '../form/InputH';
import { url, submitForm } from '../../util';

interface IFiltrarFormularioPageProps {
}

interface IFiltrarFormularioPageState {
}


export default class FiltrarFormularioPage extends React.Component<IFiltrarFormularioPageProps, IFiltrarFormularioPageState> {
  context: IRouterContext;

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <span>
        <section>
        <div className='row'>
          <div className='col s1 left'>
        <a className='btn-floating btn-large blue button-collapse' data-activates='slide-out'>
        <i className='material-icons'>menu</i>
        </a>
        <ul id='slide-out' className='side-nav white'>
          <li><h5 className='center'>UTECTEST</h5></li>
          <li><a><img src='/images/admi.png' width='210' id='img' height='200' /></a></li>
          <li><a><i className='material-icons'>e</i></a></li>
          <li><a><i className='material-icons'>e</i></a></li>
          <li><a><i className='material-icons'>e</i></a></li>
          <li><a className='subheader'>Opciones</a></li>
          <li><a href='/welcome' title='Enviar'><i className='material-icons'>send</i>Enviar Test</a></li>
          <li><a href='/grupos' title='Grupos'><i className='material-icons'>group_add</i>Añadir grupos</a></li>
          <li><div className='divider'></div></li>
          <li><a className='subheader'>Resultados</a></li>
          <li><a href='/alumnos/list' title='Alumnos'><i className='material-icons'>person</i>Alumnos</a></li>
          <li><a href='/formulario/list' title='Formulario'><i className='material-icons'>book</i>Formulario</a></li>
          <li><a href='/grupo/list' title='Grupos'><i className='material-icons'>group</i>Grupos</a></li>
          <li><div className='divider'></div></li>
          <li><a href='/'><i className='material-icons'>exit_to_app</i>CERRAR SESIÓN</a></li>
        </ul>
        </div>
          <div className='col s11 container'>
            <h2 className='center'>Formulario</h2>
            <div className='row'>
              <div className='col s11 m6 offset-m3 left'>
                <div className='card'>
    <div className='card-content'>
      <p>Por favor seleccione el tipo de área por el cuál desea filtrar la información.</p>
    </div>
    <div className='card-tabs'>
      <ul className='tabs tabs-fixed-width'>
        <li className='tab'><a className='active' href='#test4'>Lugar de Nacimiento</a></li>
        <li className='tab'><a className='active' href='#test5'>Enfermedad</a></li>
        <li className='tab'><a className='active' href='#test6'>Deporte</a></li>
      </ul>
    </div>
    <div className='card-content grey lighten-4'>
      <div id='test4'>
        <div className='collection'>
        <a href={`/formulario/lugar_nacimiento/Lima`} className='collection-item'>Lima</a>
        <a href={`/formulario/lugar_nacimiento/Callao`} className='collection-item'>Callao</a>
        <a href={`/formulario/lugar_nacimiento/Chosica`} className='collection-item'>Chosica</a>
        <a href={`/formulario/lugar_nacimiento/Chorrillos`} className='collection-item'>Chorrillos</a>
        </div>
      </div>
      <div id='test5'>
        <div className='collection'>
        <a href={`/formulario/enfermedad/Asma`} className='collection-item'>Asma</a>
        <a href={`/formulario/enfermedad/Diabetes`} className='collection-item'>Diabetes</a>
        <a href={`/formulario/enfermedad/Epilepsia`} className='collection-item'>Epilepsia</a>
        <a href={`/formulario/enfermedad/Hipertensión`} className='collection-item'>Hipertensión Arterial</a>
        <a href={`/formulario/enfermedad/Otras`} className='collection-item'>Otras</a>
        </div>
      </div>
      <div id='test6'>
        <div className='collection'>
        <a href={`/formulario/deporte/Fútbol`} className='collection-item'>Fútbol</a>
        <a href={`/formulario/deporte/Voley`} className='collection-item'>Voley</a>
        <a href={`/formulario/deporte/Basquet`} className='collection-item'>Basquet</a>
        <a href={`/formulario/deporte/Natación`} className='collection-item'>Natación</a>
        <a href={`/formulario/deporte/Muaythai`} className='collection-item'>Muaythai</a>
        <a href={`/formulario/deporte/Otros`} className='collection-item'>Otros</a>
        </div>
      </div>
    </div>
  </div>
              </div>
            </div>
          </div>
        </div>
        </section>
        <br/>
      </span>
    );
  }
};