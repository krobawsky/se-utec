package org.springframework.samples.utec;


import org.spring.framework.samples.utec.api.DataService;
import org.spring.framework.samples.utec.api.ResultadosService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class UtecTestApplication {

    public static void main(String[] args) throws Exception {
    	Object[] ob = {UtecTestApplication.class, DataService.class, ResultadosService.class};
        SpringApplication.run(ob, args);
	}
}

