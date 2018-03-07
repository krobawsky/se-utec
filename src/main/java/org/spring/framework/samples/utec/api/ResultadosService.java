package org.spring.framework.samples.utec.api;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Date;

import org.joda.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.utec.model.Resultado;
import org.springframework.samples.utec.service.UtecService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ResultadosService {
	
	private static final Logger log = LoggerFactory.getLogger(ResultadosService.class);
	
	private final UtecService utecService;
	
	@Autowired
	public ResultadosService(UtecService utecService) {
		
		this.utecService = utecService;
		
	}
	
	@Scheduled(cron = "0 0 01 * * ?", zone="America/Lima")
	public void actualizarDatos(){
		
		Collection<Resultado> resultadoList = utecService.findResultados();
    	
    	for (Resultado res : resultadoList) {
			LocalDate date1 = LocalDate.now();
			LocalDate date2 = res.getExpdate();
			log.info("The time is now {}", date1);
			log.info("The time is now {}", date2);
		    if (date1.equals(date2)) {
		    	utecService.deleteResultado(res.getId());
		    }
		}
		
	}

}
