import * as React from 'react';
import { IRouter, Link, browserHistory } from 'react-router';
import { IAlumno, ITest, IRouterContext } from '../../types';
import InputH from '../form/InputH';
import { url, submitForm } from '../../util';


interface IFormularioPageProps {
  params?: { area?: string , dato?: string};
}

interface IFormularioPageState {
  resultado?: any;
}


export default class FormularioPage extends React.Component<IFormularioPageProps, IFormularioPageState> {
  context: IRouterContext;

  constructor(props) {
    super(props);

    this.state = { };
  }

  componentDidMount() {
    const { params } = this.props;

    if (params && params.area) {
      const fetchUrl = url(`api/formulario/${params.area}/${params.dato}`);
      fetch(fetchUrl)
        .then(response => response.json())
        .then(resultado => { console.log('resultado', resultado); this.setState({ resultado }); });
    }
  }

  render() {

    const { resultado } = this.state;
    const { params } = this.props;

    if (!resultado) {
       return  <div className='center-align'>
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
        <section>
        <div className='row'>
          <div><a onClick={browserHistory.goBack} className='btn-floating btn-small waves-effect waves-light blue'><i className='material-icons'>arrow_back</i></a></div>
          <br/>
          <div className='col s11 container'>
          { params.area === 'lugar_nacimiento' ? (
            <h2 className='center'>Alumnos que nacieron en {params.dato}</h2>
            ) : ( params.area === 'enfermedad' ? (
            <h2 className='center'>Alumnos que tienen {params.dato}</h2>
            ) : (
            <h2 className='center'>Alumnos que practican {params.dato}</h2>
          ))}
          <br/>
          <br/>
          <table className='highlight'>
            <thead>
              <tr>
                <th>Nombres</th>
                <th className='hidden-sm hidden-xs'>Codigo</th>
                <th>Correo</th>
                <th>Carrera</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map(renderRow)}
            </tbody>
          </table>
          <br/>
          <br/>
          <p className='center'>{resultado.length} alumnos encontrados</p>
          </div>
        </div>
        </section>
        <br/>
      </span>
    );
  }
};


const renderRow = (alumno: IAlumno) => (
  <tr key={alumno.id}>
    <td>
      <a href={`/alumnos/${alumno.id}`}>
        {alumno.lastName} {alumno.firstName}
      </a>
    </td>
    <td className='hidden-sm hidden-xs'>{alumno.codigo}</td>
    <td>{alumno.correo}</td>
    <td>{alumno.carrera}</td>
  </tr>
);