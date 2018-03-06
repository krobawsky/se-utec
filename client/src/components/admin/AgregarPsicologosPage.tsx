import * as React from 'react';
import { IRouter, Link } from 'react-router';
import { IUser, IRouterContext, IUserRequest } from '../../types';
import { url, submitForm } from '../../util';

interface IAgregarPsicologosPageProps {
  location: HistoryModule.Location;
  params?: { numero?: string };
}

interface IAgregarPsicologosPageState {
  users?: IUser[];
  filter?: string;
  mensaje?: string;
}

const getFilterFromLocation = (location) => {
  return location.query ? (location.query as any).lastName : null;
};

export default class AgregarPsicologosPage extends React.Component<IAgregarPsicologosPageProps, IAgregarPsicologosPageState> {
  context: IRouterContext;

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.submitSearchForm = this.submitSearchForm.bind(this);

    this.state = {
      users: [],
      filter: getFilterFromLocation(props.location),
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

      // const { params } = this.props;
      // para la s
      // this.setState({
      //  params.numero: params.numero
      //   });
  }

  componentWillReceiveProps(nextProps: IAgregarPsicologosPageProps) {
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

  /**
   * Invoked when the submit button was pressed.
   * 
   * This method updates the URL with the entered lastName. The change of the URL
   * leads to new properties and thus results in rerending
   */
  submitSearchForm() {
    const { params } = this.props;
    const { filter } = this.state;

if ( filter === '' || filter === undefined) {
      this.alerta();
    } else {
    this.dalerta();
    this.context.router.push({
      pathname: '/welcomeadmin/' + params.numero + '/users/list',
      query: { 'lastName': filter || '' }
    });
    }
  }

  /** 
   * Actually loads data from the server
   */
  fetchData(filter: string) {
   const { params } = this.props;
    const query = filter ? encodeURIComponent(filter) : '';
    const requestUrl = url('api/welcomeadmin/' + params.numero + '/user/list?lastName=' + query);

    fetch(requestUrl)
      .then(response => response.json())
      .then(users => { this.setState({ users }); });
  }
  add(id) {
  const { params } = this.props;
    const pwd = Math.floor(Math.random() * 100000000);
    console.log(pwd);

    const userRequest: IUserRequest = {
        rol: 'PSICOLOGO'
      };
      const url = 'api/welcomeadmin/' + params.numero + '/users/' + id ;
        submitForm('PUT', url, userRequest, (status, response) => {
          if (status === 204) {
            console.log('OK!');
          this.context.router.push({
          pathname: '/welcomeadmin/' + params.numero + '/users/' + id
        });
          } else {
            console.log('ERROR?!...', response);
          }
      });
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
    const { filter, users } = this.state;

    return (
      <span>
        <section>
        <div className='row'>
         <div className='fixed-action-btn toolbar'>
    <a className='btn-floating btn-large red'>
      <i className='large material-icons'>exit_to_app</i>
    </a>
    <ul>
      <li className='waves-effect waves-light'><a href='/'>Cerrar sesión</a></li>
    </ul>
  </div>
         <div className='col s11 container'>
          <h2 className='center'>Agregar Psicólogos</h2>
          <form className='form-horizontal' action='javascript:void(0)'>
            <div className='form-group'>
              <div className='control-group' id='lastName'>
                <label className='col-sm-2 control-label'>Buscar por Apellido </label>
                <div className='input-field inline'>
                  <input  name='filter' value={filter || ''} onChange={this.onFilterChange} size={30} maxLength={80} />
                   <b className={this.state.mensaje} >Ingrese un apellido</b>
                  { /* <span className='help-inline'><form:errors path='*'/></span> TODO */}
                </div>
                 <a onClick={this.submitSearchForm} className='btn-floating btn-small waves-effect waves-light blue'><i className='material-icons'>search</i></a>
              </div>
            </div>
          </form>
        </div>
        </div>
        </section>
        <br/>
        <section>
          <table className='highlight'>
            <thead>
              <tr>
                <td>Nombres</td>
                <td>Añadir</td>
              </tr>
            </thead>
            <tbody>
              {users.map( user => (
              <tr key={user.id}>
                <td>
                    {user.firstName} {user.lastName}
                </td>
                <td><button onClick={() => this.add(user.id)} className='btn-floating btn-small waves-effect waves-light blue'><i className='material-icons'>add</i></button></td>
              </tr>
             ))}
            </tbody>
          </table>
         <p className='center'>{users.length} personas encontradas</p>
      </section>
     </span>
    );
  }
};

