package org.springframework.samples.utec.repository;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.samples.utec.model.Resultado;


public interface ResultadoRepository extends Repository<Resultado, Integer>{
	
	Collection<Resultado> findAll() throws DataAccessException;
	
	@Query("SELECT resultado FROM Resultado resultado left join fetch resultado.valores WHERE resultado.id =:id")
	
	Resultado findById(@Param("id") int id);

	void save(Resultado resultado);
	
	@Transactional
	@Modifying
	@Query("DELETE Resultado res WHERE res.id =:id")
	void delete(@Param("id") int id);

}
