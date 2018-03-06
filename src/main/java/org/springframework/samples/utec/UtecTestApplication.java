package org.springframework.samples.utec;


import org.spring.framework.samples.utec.api.DataService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UtecTestApplication {

    public static void main(String[] args) throws Exception {
    	Object[] ob = {UtecTestApplication.class, DataService.class};
        SpringApplication.run(ob, args);
	}
}

