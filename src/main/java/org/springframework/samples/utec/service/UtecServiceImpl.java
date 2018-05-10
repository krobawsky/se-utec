package org.springframework.samples.utec.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.utec.model.Alumno;
import org.springframework.samples.utec.model.Grupo;
import org.springframework.samples.utec.model.Res_formulario;
import org.springframework.samples.utec.model.Resultado;
import org.springframework.samples.utec.model.Test;
import org.springframework.samples.utec.model.User;
import org.springframework.samples.utec.model.Valores;
import org.springframework.samples.utec.repository.AlumnoRepository;
import org.springframework.samples.utec.repository.GrupoRepository;
import org.springframework.samples.utec.repository.ResFormularioRepository;
import org.springframework.samples.utec.repository.ResultadoRepository;
import org.springframework.samples.utec.repository.TestRepository;
import org.springframework.samples.utec.repository.UserRepository;
import org.springframework.samples.utec.repository.ValorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UtecServiceImpl implements UtecService {

    private AlumnoRepository alumnoRepository;
    private ResultadoRepository resultadoRepository;
    private ResFormularioRepository resFormularioRepository;
    private GrupoRepository grupoRepository;
    private TestRepository testRepository;
    private ValorRepository valoresRepository;
    private UserRepository userRepository;
    
    @Autowired
    public UtecServiceImpl(UserRepository userRepository, AlumnoRepository alumnoRepository, ResultadoRepository resultadoRepository, ResFormularioRepository resFormularioRepository, ValorRepository valoresRepository, GrupoRepository grupoRepository, TestRepository testRepository) {
        this.valoresRepository = valoresRepository;
        this.alumnoRepository = alumnoRepository;
        this.resultadoRepository = resultadoRepository;
        this.resFormularioRepository = resFormularioRepository;
        this.grupoRepository = grupoRepository;
        this.testRepository = testRepository;
        this.userRepository = userRepository;
    }

	public UtecServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	
	@Override
	public Collection<Alumno> filterResultadoByNacimiento(String dato) throws DataAccessException {
		return alumnoRepository.filterDataNac(dato);
	}
	
	@Override
	public Collection<Alumno> filterResultadoByEnfermedad(String dato) throws DataAccessException {
		return alumnoRepository.filterDataEnf(dato);
	}
	
	@Override
	public Collection<Alumno> filterResultadoByDeporte(String dato) throws DataAccessException {
		return alumnoRepository.filterDataDep(dato);
	}
	
	/* Alumnos */
    @Override
	@Transactional(readOnly = true)
	public Collection<Alumno> findAlumnoByLastName(String lastName) throws DataAccessException {
		return alumnoRepository.findByLastName(lastName);
    }
	
    @Override
    @Transactional(readOnly = true)
    public Alumno findAlumnoById(int id) throws DataAccessException {
    	return alumnoRepository.findAlumnoById(id);
    }
	 
    @Override
    @Transactional(readOnly = true)
    public Collection<Alumno> findAlumnos() throws DataAccessException {
    	return alumnoRepository.findAll();
    }
    
	@Override
	@Transactional(readOnly = true)
	public Collection<Alumno> findAlumnosGroupByLastName(String alumnoLastname, String grupo)
			throws DataAccessException {
		return alumnoRepository.findByGroup(alumnoLastname, Integer.parseInt(grupo));
	}
	
	@Override
	public ArrayList<String> findByGroupByLastNameCorreo(String name) throws DataAccessException {
		return alumnoRepository.findByGroupByNameCorreo(name);
	}
	
	@Override
	public Alumno findAlumnoByCodigo(String codigo) throws DataAccessException {
		return alumnoRepository.findAlumnoByCodigo(codigo);
	}

	@Override
	public Alumno findAlumnoByLastNameC(String lastName) throws DataAccessException {
		return alumnoRepository.findAlumnoByLastnameC(lastName);
	}
	
	@Override
	public Collection<Alumno> findAlumnosByTestEstres(String testName) throws DataAccessException {
		return alumnoRepository.findByTestEstres(testName);
	}

	@Override
	public ArrayList<Integer> findByGroupByIdCorreo(String name) throws DataAccessException {
		return alumnoRepository.findByGroupByIdesCorreo(name);
	}

	
	/* Users */
	@Override
	@Transactional(readOnly = true)
	public User findUserById(int id) throws DataAccessException {
		return  userRepository.findUserById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public User findByUsername(String username) throws DataAccessException {
		return userRepository.findUserByUsername(username);
	}

	@Override
	public Collection<User> findUserByLastName(String userLastname) throws DataAccessException {
		return userRepository.findUserByLastName(userLastname);
	}

	@Override
	public void saveUser(User user) throws DataAccessException {
		userRepository.save(user);
	}
	
	 
    /* Grupos */
    @Override
    @Transactional(readOnly = true)
    public Collection<Grupo> findGrupos() throws DataAccessException {
    	return grupoRepository.findAll();
    }
	 
    @Override
    @Transactional(readOnly = true)
    public Grupo findGrupoById(int id) throws DataAccessException {
    	return grupoRepository.findGrupoById(id);
    }
	 
    @Override
    @Transactional
    public void saveGrupo(Grupo grupo) throws DataAccessException {
    	grupoRepository.save(grupo);
    }
	 
    @Override
    public void deleteGrupo(int grupoId) throws DataAccessException {
    	grupoRepository.delete(grupoId);
    }

	@Override
	public Collection<Grupo> findGrupoByName(String name) throws DataAccessException {
		return grupoRepository.findByName(name);
	}

	@Override
	public Grupo findByGroupName(String name) throws DataAccessException {
		return grupoRepository.findByGroupNameC(name);
	}

	
    /* Resultados */
	@Override
	public Collection<Resultado> findResultados() {
		 return resultadoRepository.findAll();
	}
	
    @Override
    @Transactional(readOnly = true)
    public Resultado findResultadoById(int id) throws DataAccessException {
    	return resultadoRepository.findById(id);
    }


	@Override
	public void saveResultado(Resultado resultado) throws DataAccessException {
		resultadoRepository.save(resultado);
	}
	
	@Override
    public void deleteResultado(int resultadoId) throws DataAccessException {
		resultadoRepository.delete(resultadoId);
    }
	
	@Override
    @Transactional(readOnly = true)
    public Res_formulario findResFormularioById(int id) throws DataAccessException {
    	return resFormularioRepository.findFormById(id);
    }


	@Override
	public void saveResFormulario(Res_formulario resultado) throws DataAccessException {
		resFormularioRepository.save(resultado);
	}
	
	
	/* Tests */
	@Override
	public Collection<Test> findTests() {
		 return testRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Test findTestById(int testId) throws DataAccessException {
		 return testRepository.findById(testId);
	}
	
	
	/* Valores */
	@Override
	public void saveValor(Valores value) {
		valoresRepository.save(value);
	}

	@Override
	public void saveAlumno(Alumno alumno) {
		alumnoRepository.save(alumno);
	}

	@Override
	public ArrayList<Integer> findAlumnosIdByTest(String testName) throws DataAccessException {
		return alumnoRepository.findByIdAlumnoTest(testName);
	}

	@Override
	public void deleteAlumno(int id) {
		alumnoRepository.delete(id);
		
	}

	@Override
	public void deleteUser(int id) {
		userRepository.delete(id);
		
	}

}
