package org.springframework.samples.utec.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.dao.DataAccessException;
import org.springframework.samples.utec.model.Alumno;
import org.springframework.samples.utec.model.Grupo;
import org.springframework.samples.utec.model.Res_formulario;
import org.springframework.samples.utec.model.Resultado;
import org.springframework.samples.utec.model.Test;
import org.springframework.samples.utec.model.User;
import org.springframework.samples.utec.model.Valores;


public interface UtecService {

	
	Collection<Alumno> findAlumnoByLastName(String lastName) throws DataAccessException;

	Alumno findAlumnoById(int id) throws DataAccessException;

	Collection<Grupo> findGrupos() throws DataAccessException;

	Grupo findGrupoById(int grupoId) throws DataAccessException;

	void saveGrupo(Grupo grupo) throws DataAccessException;

	void deleteGrupo(int grupoId) throws DataAccessException;

	Collection<Alumno> findAlumnos() throws DataAccessException;

	Collection<Alumno> findAlumnosGroupByLastName(String alumnoLastname, String grupo)throws DataAccessException;

	Collection<Grupo> findGrupoByName(String name) throws DataAccessException;
	

	Collection<Resultado> findResultados();
	
	Resultado findResultadoById(int resultadoId) throws DataAccessException;
	
	void saveResultado(Resultado resultado)throws DataAccessException;

	void deleteResultado(int resultadoId) throws DataAccessException;
	
	
	Collection<Test> findTests();

	Test findTestById(int testId) throws DataAccessException;

	void saveValor(Valores value);
	
	Alumno findAlumnoByLastNameC(String lastName) throws DataAccessException;
	
	//busca el correo del alumno con el parametro name del grupo
	ArrayList<String> findByGroupByLastNameCorreo(String name)throws DataAccessException;
	
	//busca el nombre del grupo con el parametro name del grupo
	Grupo findByGroupName(String name) throws DataAccessException;
		
	//busca el correo del alumno con el parametro name del grupo
	ArrayList<Integer> findByGroupByIdCorreo(String name)throws DataAccessException;
		
	Alumno findAlumnoByCodigo(String codigo) throws DataAccessException;

	User findUserById(int id) throws DataAccessException;
    
    User findByUsername(String username) throws DataAccessException;

	Collection<User> findUserByLastName(String userLastname)throws DataAccessException;

	void saveUser(User user) throws DataAccessException;

	Collection<Alumno> findAlumnosByTestEstres(String testName)throws DataAccessException;

	void saveAlumno(Alumno alumno);
	
	ArrayList<Integer> findAlumnosIdByTest(String testName)throws DataAccessException;

	void deleteAlumno(int id);

	void deleteUser(int id);


	Collection<Alumno> filterResultadoByNacimiento(String dato) throws DataAccessException;


	Collection<Alumno> filterResultadoByEnfermedad(String dato) throws DataAccessException;


	Collection<Alumno> filterResultadoByDeporte(String dato) throws DataAccessException;	
	

}
