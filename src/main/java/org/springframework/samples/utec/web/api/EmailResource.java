package org.springframework.samples.utec.web.api;

import java.util.ArrayList;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.spring.framework.samples.utec.api.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.samples.utec.model.Test;
import org.springframework.samples.utec.model.Alumno;
import org.springframework.samples.utec.model.Grupo;
import org.springframework.samples.utec.model.Resultado;
import org.springframework.samples.utec.model.User;
import org.springframework.samples.utec.others.SmtpMailSender;
import org.springframework.samples.utec.service.UtecService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class EmailResource extends AbstractResourceController {

private final Logger logger = Logger.getLogger(UserResource.class);
	
	private final DataService	dataService;
	
	private final UtecService	utecService;
	
	@Autowired
	public EmailResource(UtecService utecService, DataService	dataService) {
		this.dataService = dataService;
		this.utecService = utecService;
	}
	
	private String link = "http://www.google.com";
	
	@RequestMapping(value = "/send-mail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Alumno sendApiMail(@RequestBody @Valid Alumno alumno, BindingResult bindingResult) {
		
		Alumno student = new Alumno();
		student = null;
		
		 String groupOalumno = alumno.getLastName();
		
		 logger.info("Imprimiendo la data del form correo/grupo :"+groupOalumno);
		 logger.info("Imprimiendo la data del form Sub :"+alumno.getFirstName()); //ASUNTO
		 logger.info("Imprimiendo la data del form Body :"+alumno.getCorreo()); //TEXTO
		 logger.info("Imprimiendo la data del form TEST :"+alumno.getCarrera()); //TIPO DE TEST
		 
		 String asunto = alumno.getFirstName();
		 String texto = alumno.getCorreo();
		 String tipoTest = alumno.getCarrera();
		 
		 ///Busqueda del alumno con el apellido 
		 Alumno var_alumno;
		 
		 if( utecService.findAlumnoByLastNameC(alumno.getLastName()) == null) {
			 
			 logger.info("Nombre de apellido invalido..procesando con nombre de Grupo...");
			 
			 Grupo var_group = utecService.findByGroupName(groupOalumno);
			 
			 if (var_group.getName().equals(groupOalumno)){
				 logger.info("Nombre del grupo correcto...");
				 
				 ArrayList<String> correos = new ArrayList<String>(); 
				 ArrayList<Integer> ides = new ArrayList<Integer>();
				 
				 correos = utecService.findByGroupByLastNameCorreo(var_group.getName());
				 ides = utecService.findByGroupByIdCorreo(var_group.getName());
				 
				 int size=correos.size();
				 
				 logger.info("cantidadeeee..."+String.valueOf(correos.get(0)));
				 logger.info("cantidad..."+size);
				 
				 for( int i = 0 ; i < correos.size() ; i++ ){
					  System.out.println( correos.get( i ));
					  
					  Alumno alm = this.utecService.findAlumnoById(ides.get(i));
					  String nombres = alm.getFirstName()+" "+alm.getLastName();
					  String username, clave;
					  username = alm.getCodigo();
					  clave = alm.getPassword();
					  
					  logger.info("imprimiendo el nombre alumno del grupo..."+nombres);
					  logger.info("imprimiendo los correos del grupo..."+correos.get(i));
					  
			   this.dataService.sendEmail(correos.get(i), nombres, asunto, texto, username, clave, link, "1"); 
			  
					}
				 
				 for (int i = 0; i < ides.size(); i++){
					 logger.info("imprimiendo los ID de los alumnos..."+ides.get(i));
					 			 
					 Resultado result = new Resultado();
					 Resultado resulta = new Resultado();
					 resulta.setId(null);
					 resulta.setDate(null);
					 resulta.setDescripcion("Prueba asignada...");
					 resulta.setTest(alumno.getCarrera());
					 
					 Alumno alm = this.utecService.findAlumnoById(ides.get(i));
					 alm.addResultado(result);
				
				save(result,  resulta);
				}
				   student = this.utecService.findAlumnoById(ides.get(1));
		 }
	
		 }else {
		 var_alumno = utecService.findAlumnoByLastNameC(alumno.getLastName());
		 
		 if(var_alumno.getLastName().equals(alumno.getLastName())) {
						 logger.info("Apellido correcto...");
						 String nombres = var_alumno.getFirstName()+" "+var_alumno.getLastName();
						 String correo_alumno = var_alumno.getCorreo();
						 
						 logger.info("imprimiendo el nombre alumno del grupo..."+nombres);
						 			 		
			this.dataService.sendEmail(correo_alumno, nombres, asunto, texto, var_alumno.getCodigo(), var_alumno.getPassword(), link, "1"); 
			
						 Resultado result = new Resultado();
						 Resultado resulta = new Resultado();
						 resulta.setId(null);
						 resulta.setDate(null);
						 resulta.setDescripcion("Prueba asignada...");
						 resulta.setTest(alumno.getCarrera());
						 
						 Alumno alm = this.utecService.findAlumnoById(var_alumno.getId());
						 alm.addResultado(result);
						 
						 save(result,  resulta);
						 
						 student = this.utecService.findAlumnoByLastNameC(alumno.getLastName());
						
			 			}
		 }
		 logger.info("----------Menasaje enviado");
		return student;
		
	}

	private void save(Resultado result, Resultado resulta) {
		
		result.setTest(resulta.getTest());
		result.setDescripcion(resulta.getDescripcion());
		result.setDate(resulta.getDate());
		result.setId(resulta.getId());
		
		utecService.saveResultado(result);
	}
	
	@RequestMapping(value = "/emailadmin", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public User sendApiMailAdmin(@RequestBody @Valid User user, BindingResult bindingResult) {
		
		String correo, username, password;
		
		logger.info("-------email :"+user);
		
		User usuario = this.utecService.findUserById(user.getId());
		
		logger.info("-------email obejt:"+usuario);
		
		correo = usuario.getCorreo();
		username = usuario.getUsername();
		password = usuario.getPassword();
		String nombres = usuario.getFirstName()+" "+usuario.getLastName();
		String asunto = "Gestión de cuenta para el sistema de Utec Test";
		String texto = "Estimado usuario, se le envía este correo para informarle que se esta habilitando su cuenta de usuario de tipo psicólogo para el acceso al sistema de Utec Test.";
		
		this.dataService.sendEmail(correo, nombres, asunto, texto, username, password, link, "2"); 
			
		 logger.info("----------Menasaje para el psicologo enviado");
		return user;
	}
	
	///test de recordatorio
	
		@RequestMapping(value = "/emailtestpendiente/{typetest}", method = RequestMethod.POST)
		public Alumno sendTestPendiente(@PathVariable("typetest") String typetest) {
			
			 logger.info("imprimiendo el typetest del react..."+typetest);
			
			Alumno student = new Alumno();
			Test test = new Test();
			student = null;
			 
			if (typetest.equals("TestE")) {
			test.setName("Test del Estres");
			
			logger.info("imprimiendo el typetest del spring ..."+test.getName());
			
			ArrayList<Integer> ides = new ArrayList<Integer>();
		
			ides = this.utecService.findAlumnosIdByTest(test.getName());
			
			logger.info("imprimiendo la cantidad del array id ..."+ides.size());
			
			for( int i = 0 ; i < ides.size() ; i++ ){
				  System.out.println( ides.get( i ));
				  
				  logger.info("imprimiendo el id..."+ides.get(i));
				  
				  Alumno a = this.utecService.findAlumnoById(ides.get(i));
				  
				  String correo = a.getCorreo();
				  String nombres = a.getFirstName()+" "+a.getLastName();
				  String username = a.getCodigo();
				  String password = a.getPassword();
				  logger.info("imprimiendo el correo..."+correo);
				  logger.info("imprimiendo el nombres..."+nombres);
				
				  String asunto = "Recordatorio del "+test.getName();
				  String texto  = null;
				  
				  this.dataService.sendEmail(correo, nombres, asunto, texto, username, password, link, "1"); 
				  logger.info("----------Menasaje enviado");
				  student = this.utecService.findAlumnoById(ides.get(1));
				}
			
			
			} else if (typetest.equals("TestM")) {
				 test.setName("Test de Millon");
				
				logger.info("imprimiendo el typetest del spring ..."+test.getName());
				
				ArrayList<Integer> ides = new ArrayList<Integer>();
			
				ides = this.utecService.findAlumnosIdByTest(test.getName());
				
				logger.info("imprimiendo la cantidad del array id ..."+ides.size());
				
				for( int i = 0 ; i < ides.size() ; i++ ){
					  System.out.println( ides.get( i ));
					  
					  logger.info("imprimiendo el id..."+ides.get(i));
					  
					  Alumno a = this.utecService.findAlumnoById(ides.get(i));
					  
					  String correo = a.getCorreo();
					  String nombres = a.getFirstName()+" "+a.getLastName();
					  String username = a.getCodigo();
					  String password = a.getPassword();
					  logger.info("imprimiendo el correo..."+correo);
					  logger.info("imprimiendo el nombres..."+nombres);
					 
					  String asunto = "Recordatorio del "+test.getName();
					  String texto  = null;
					  
					  this.dataService.sendEmail(correo, nombres, asunto, texto, username, password, link, "1"); 
					  logger.info("----------Menasaje enviado");
					  student = this.utecService.findAlumnoById(ides.get(1));
					}
				
		   
			} else if (typetest.equals("TestB")) {
				test.setName("Test ICE Baron");
				
				logger.info("imprimiendo el typetest del spring ..."+test.getName());
				
				ArrayList<Integer> ides = new ArrayList<Integer>();
			
				ides = this.utecService.findAlumnosIdByTest(test.getName());
				
				logger.info("imprimiendo la cantidad del array id ..."+ides.size());
				
				for( int i = 0 ; i < ides.size() ; i++ ){
					  System.out.println( ides.get( i ));
					  
					  logger.info("imprimiendo el id..."+ides.get(i));
					  
					  Alumno a = this.utecService.findAlumnoById(ides.get(i));
					  
					  String correo = a.getCorreo();
					  String nombres = a.getFirstName()+" "+a.getLastName();
					  String username = a.getCodigo();
					  String password = a.getPassword();
					  logger.info("imprimiendo el correo..."+correo);
					  logger.info("imprimiendo el nombres..."+nombres);
					  
					  String asunto = "Recordatorio del "+test.getName();
					  String texto  = null;
					  
					  this.dataService.sendEmail(correo, nombres, asunto, texto, username, password, link, "1"); 
					  logger.info("----------Menasaje enviado");
					  student = this.utecService.findAlumnoById(ides.get(1));
					} 
			} else {
				  logger.info("No paso nada");
			}
			  
			return student; 
		}
	
}