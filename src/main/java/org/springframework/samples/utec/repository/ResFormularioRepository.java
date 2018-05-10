package org.springframework.samples.utec.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.samples.utec.model.Res_formulario;
import org.springframework.samples.utec.model.Resultado;


public interface ResFormularioRepository extends Repository<Res_formulario, Integer>{

	// Resultado de formularios
	
	@Query("SELECT resultado FROM Res_formulario resultado WHERE resultado.id =:id")
	Res_formulario findFormById(@Param("id") Integer id);
	
	void save(Res_formulario resultado);

}
