import * as React from 'react';

import { Link } from 'react-router';
import { IGrupo, IAlumno } from '../../types';
import { url } from '../../util';

import GrupoInformation from './GrupoInformation';
import GrupoResultado from './GrupoResultado';

interface IGruposPageProps {
  params?: { grupoId?: string };
}

interface IGrupoPageState {
  grupo?: IGrupo;
}

export default class GruposPage extends React.Component<IGruposPageProps, IGrupoPageState> {

  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { params } = this.props;

    if (params && params.grupoId) {
      const fetchUrl = url(`/api/grupo/${params.grupoId}`);
      fetch(fetchUrl)
        .then(response => response.json())
        .then(grupo => this.setState({ grupo }));
    }
  }

  descargarExcel() {
    // Creamos un Elemento Temporal en forma de enlace
        const tmpElemento = document.createElement('a');
        // obtenemos la información desde el div que lo contiene en el html
        // Obtenemos la información de la tabla
        const data_type = 'data:application/vnd.ms-excel';
        const tabla_div = document.getElementById('tblReporte');
        const tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
        tmpElemento.href = data_type + ', ' + tabla_html;
        // Asignamos el nombre a nuestro EXCEL
        tmpElemento.download = 'Nombre_De_Mi_Excel.xls';
        // Simulamos el click al elemento creado para descargarlo
        tmpElemento.click();
  }

  render() {
    const { grupo } = this.state;

    if (!grupo) {
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
    console.log(grupo.alumnos);
    return (
      <span>
        <table id='tblReporte' className='highlight'>
          <thead>
            <tr>
              <th>Nombres</th>
              <th className='hidden-sm hidden-xs'>Codigo</th>
              <th>Correo</th>
              <th>Carrera</th>
            </tr>
          </thead>
          <tbody>
            {grupo.alumnos.map(renderRow)}
          </tbody>
        </table>
        <div className='row'>
          <div className='col s12 m4 l3'>
            <GrupoInformation grupo={grupo} />
            <button className='btn waves-effect waves-teal btn-large' onClick={this.descargarExcel}>Exportar Excel!<i className='material-icons right'>send</i></button>
          </div>
          <div className='col s12 m8 l9'>
             <GrupoResultado grupo={grupo} />
          </div>
        </div>
      </span>
    );
  }
}

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
