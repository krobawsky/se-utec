import * as React from 'react';
import { IRouter, Link } from 'react-router';
import { IAlumno, IGrupo, IRouterContext } from '../../types';
import { url } from '../../util';
import { browserHistory} from 'react-router';

interface IAgregarAlumnosPageProps {
  location: HistoryModule.Location;
  params: { grupoId: string };
}

interface IAgregarAlumnosPageState {
  alumnos?: IAlumno[];
  filter?: string;
  pid?: string;
  mensaje?: string;
  }

const getFilterFromLocation = (location) => {
  return location.query ? (location.query as any).lastName : null;
};

export default class AgregarAlumnosPage extends React.Component<IAgregarAlumnosPageProps, IAgregarAlumnosPageState> {
  context: IRouterContext;

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.submitSearchForm = this.submitSearchForm.bind(this);
    this.state = {
      filter: getFilterFromLocation(props.location),
      alumnos: [],
      pid: props.params.grupoId,
      mensaje: 'transparent-text'
      };
  }

  componentDidMount() {
    const { filter } = this.state;
    if (typeof filter === 'string') {
      // only load data on mount (initialy) if filter is specified
      // i.e. lastName query param in uri was set
      this.fetchData(filter);
    }
  }

  componentWillReceiveProps(nextProps: IAgregarAlumnosPageProps) {
    const { location } = nextProps;
    // read the filter from uri
    const filter = getFilterFromLocation(location);

    // set state
    this.setState({ filter });

    // load data according to filter
    this.fetchData(filter);
  }

  onFilterChange(event) {
    this.setState({
      filter: event.target.value as string
    });
  }

  submitSearchForm() {
    const { filter, pid } = this.state;
    const { params } = this.props;
     if ( filter === '' || filter === undefined) {
      this.alerta();
    } else {
      this.dalerta();
    this.context.router.push({
      pathname: '/grupo/pid/lista',
      query: { 'lastName': filter || '' , 'group': pid},
    });
  }
}
  /** 
   * Actually loads data from the server
   */
  fetchData(filter: string) {
  const { pid } = this.state;
    const query = filter ? encodeURIComponent(filter) : '';
    const requestUrl = url('api/alumno/group?lastName=' + query + '&group=' + pid);

    fetch(requestUrl)
      .then(response => response.json())
      .then(alumnos => { this.setState({ alumnos }); });
  }

  add(id, pid) {
    const { params } = this.props;
    const {  alumnos } = this.state;
    console.log(pid);
    console.log(id);
   const fetchUrl = url(`api/grupos/` + pid + `/alumnos/` + id);
      fetch(fetchUrl, {method: 'POST'})
        .then(response => response.json());
        this.submitSearchForm();
  }

  alerta  = () => {
    this.setState ({
      mensaje: 'red-text'
    });
  }
  dalerta  = () => {
    this.setState ({
      mensaje: 'transparent-text'
    });
  }

  render() {
    const { filter, alumnos, pid } = this.state;
 const { params } = this.props;


    return (
      <span>
        <section>
        <a href='/grupos' onClick={browserHistory.goBack} className='btn-floating btn-small waves-effect waves-light blue'><i className='material-icons'>arrow_back</i></a>
            <h4 className='center'>Añadir alumnos</h4>
            <form className='form-horizontal' action='javascript:void(0)'>
              <div className='form-group'>
                <div className='control-group' id='lastName'>
                  <label className='col-sm-2 control-label'>Buscar por Apellido </label>
                  <div className='input-field inline'>
                    <input  name='filter' value={filter || ''} onChange={this.onFilterChange} size={30} maxLength={80} />
                    <b className={this.state.mensaje}>Ingrese un campo válido</b>
                  </div>
                   <a onClick={this.submitSearchForm} className='btn-floating btn-small waves-effect waves-light blue'><i className='material-icons'>search</i></a>
                <div className='fixed-action-btn horizontal right' style={{position: 'relative', display: 'inline-block', right: '24px', marginTop: '30px'}}>
                <a className='btn-floating btn-small red btn tooltipped' data-position='top' data-delay='50' data-tooltip='No actualizar esta página'>
                  <i className='material-icons'>info</i>
                 </a></div>
                </div>
              </div>
            </form>
        </section>
        <br/>
            <section>
          <table className='highlight'>
            <thead>
              <tr>
                <td>Nombres</td>
                <td>Ciclo</td>
                <td>Añadir</td>
              </tr>
            </thead>
            <tbody>
              {alumnos.map( alumno => ( <tr key={alumno.id}>
             <td>
            <a href={`/alumnos/${alumno.id}`}>
              {alumno.firstName} {alumno.lastName}
            </a>
          </td>
            <td className='hidden-sm hidden-xs'>{alumno.ciclo}</td>
            <td><button onClick={() => this.add(alumno.id, pid)} className='btn-floating btn-small waves-effect waves-light blue'><i className='material-icons'>add</i></button></td>
             </tr>
             ))}
            </tbody>
          </table>
         <p className='center'>{alumnos.length} alumnos encontrados</p>
      </section>
 </span>
    );
  }
};

