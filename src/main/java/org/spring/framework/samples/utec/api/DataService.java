package org.spring.framework.samples.utec.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.utec.model.Alumno;
import org.springframework.samples.utec.model.User;
import org.springframework.samples.utec.service.UtecService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

import org.joda.time.LocalDate;
import org.joda.time.Years;
import org.spring.framework.samples.utec.api.ApiService;
import org.spring.framework.samples.utec.api.ApiServiceGenerator;
import org.spring.framework.samples.utec.api.DataService;
import org.spring.framework.samples.utec.api.Parametros;
import org.spring.framework.samples.utec.api.Passport;
import org.spring.framework.samples.utec.api.ResponseMessage;
import org.spring.framework.samples.utec.api.ResponseUsuarios;
import org.spring.framework.samples.utec.api.Usuario;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

@Service
public class DataService {
	
	private final UtecService utecService;
	
	
	@Autowired
	public DataService(UtecService utecService) {
		
		this.utecService = utecService;
	}

	 @Scheduled(cron = "0 0 0 01 * ?")
	    public void actualizarDatos()
	    {
				 Passport passport = new Passport();
			     System.out.println(passport.toString());
			      ApiService service = ApiServiceGenerator.createServiceAuth(ApiService.class);
			      Call<ResponseMessage> call = service.getAuth("application/json", passport);
			      
			      call.enqueue(new Callback<ResponseMessage>() {
			      	
			          public void onResponse(Call<ResponseMessage> call, Response<ResponseMessage> response) {
			              if (response.isSuccessful()) {
			              	ResponseMessage result = response.body();
			              	System.out.println(result.getContent());
			              	getTrabajadores(result.getContent());
			              	getAlumnos(result.getContent());
			              } else {
			              }
		
			          }
		
			          @Override
			          public void onFailure(Call<ResponseMessage> call, Throwable t) {
			          }
		
			      });
				
			
		 
	    }
		
	    public void getTrabajadores(String key) {
			
			Parametros parametros = new Parametros();
			parametros.setFecha("02/02/11");
			parametros.setTipoPersona(2);
			ApiService service = ApiServiceGenerator.createServiceData(ApiService.class);
	      Call<ResponseUsuarios> call = service.getPersonas("application/json", key, parametros);
	      System.out.println(parametros.toString());
	      call.enqueue(new Callback<ResponseUsuarios>() {
	      	
	          public void onResponse(Call<ResponseUsuarios> call, Response<ResponseUsuarios> response) {
	              if (response.isSuccessful()) {
	              	ResponseUsuarios result = response.body();
	
	           	for(int i=0; i<result.getContent().size(); i++) {
	             	Usuario nUsuario = result.getContent().get(i);
	             		String apMaterno = nUsuario.getApellidoMaterno();
	             		String segNombre= nUsuario.getSegundoNombre();
	             		String firstname;
	             		String lastname;
	             		
	             		String correo = nUsuario.getCorreo().trim();
		        		int indexC = correo.indexOf("@");
		        		
		             String username = correo.substring(0,indexC).toLowerCase();
	             
	              	int password = (int) Math.floor(Math.random() * 100000000);
	              	
	              	String estado = nUsuario.getEstado();
	              	
	              	if( segNombre == null) {
	              		firstname = nUsuario.getPrimerNombre().substring(0, 1).toUpperCase()+nUsuario.getPrimerNombre().toLowerCase().substring(1);
	             	}else {
	             		firstname = nUsuario.getPrimerNombre().substring(0, 1).toUpperCase()+nUsuario.getPrimerNombre().toLowerCase().substring(1)+" "+segNombre.substring(0, 1).toUpperCase()+segNombre.toLowerCase().substring(1);
	             	}
	              	
	              	if ( apMaterno == null) {
	              		lastname = nUsuario.getApellidoPaterno().trim().substring(0, 1).toUpperCase()+nUsuario.getApellidoPaterno().toLowerCase().substring(1);
	             	}else {
	             		lastname = nUsuario.getApellidoPaterno().trim().substring(0, 1).toUpperCase()+nUsuario.getApellidoPaterno().trim().toLowerCase().substring(1)+" "+apMaterno.substring(0, 1).toUpperCase().trim()+apMaterno.toLowerCase().substring(1);
	             	}
	              	
	              	
			          	if (utecService.findByUsername(username) == null) {
			              	User user = new User();
							user.setUsername(username);
							user.setPassword(password+"");
							user.setFirstName(firstname);
							user.setLastName(lastname);
							user.setRol(null);
							user.setCorreo(correo);
							
							utecService.saveUser(user);
			              	}else {
			              		if(estado.equals("1")) {
				              		User usuarioExistente = utecService.findByUsername(username);
				              		usuarioExistente.setFirstName(firstname);
				              		usuarioExistente.setLastName(lastname);
				              		usuarioExistente.setCorreo(correo);
				              		usuarioExistente.setUsername(correo);
				              		utecService.saveUser(usuarioExistente);
			              		} else {
			              			User usuarioExistente = utecService.findByUsername(username);
			              			utecService.deleteUser(usuarioExistente.getId());
			              		}
			              	}
	             	}
	              	
	              } else {
	              	ResponseUsuarios result = response.body();
	              	System.out.println("error: "+result.getMessage());
	              }
	
	          }
	
	          @Override
	          public void onFailure(Call<ResponseUsuarios> call, Throwable t) {
	          }
	
	      });
	}
	
	    public void getAlumnos(String key) {
			
			Parametros parametros = new Parametros();
			parametros.setFecha("02/02/11");
			parametros.setTipoPersona(1);
			
			ApiService service = ApiServiceGenerator.createServiceData(ApiService.class);
			Call<ResponseUsuarios> call = service.getPersonas("application/json", key, parametros);
			System.out.println(parametros.toString());
			call.enqueue(new Callback<ResponseUsuarios>() {
	     	
	         public void onResponse(Call<ResponseUsuarios> call, Response<ResponseUsuarios> response) {
	             if (response.isSuccessful()) {
	             	ResponseUsuarios result = response.body();
		             	for(int i=0; i<result.getContent().size(); i++) {
		            	Usuario nUsuario = result.getContent().get(i);
	           
		        		String apMaterno = nUsuario.getApellidoMaterno();
		        		String sNombre = nUsuario.getSegundoNombre();
		        		String lastname;
		            	String firstname;
		            	
		        		int year= Integer.parseInt(nUsuario.getFechaNacimiento().substring(0, 4));
		        		int mes= Integer.parseInt(nUsuario.getFechaNacimiento().substring(5, 7));
		        		int dia= Integer.parseInt(nUsuario.getFechaNacimiento().substring(8, 10));
		        		
		        		LocalDate birthdate = new LocalDate (year, mes, dia);
		        		LocalDate now = new LocalDate();
		        		int edad = Years.yearsBetween(birthdate, now).getYears();
		        		
		        		String correo = nUsuario.getCorreo().trim();
		        		
		             	int password = (int) Math.floor(Math.random() * 100000000);
		             	
		             	if ( sNombre == null) {
		             		firstname = nUsuario.getPrimerNombre().toUpperCase();
		            	} else {
		            		firstname = nUsuario.getPrimerNombre().toUpperCase()+" "+sNombre.toUpperCase().trim();
		            	}
		            
		             	if ( apMaterno == null) {
		             		lastname = nUsuario.getApellidoPaterno().trim().toUpperCase();
		            	}else {
		            		lastname = nUsuario.getApellidoPaterno().trim().toUpperCase()+" "+apMaterno.toUpperCase().trim();
		            	}
		             	
		             	
		             	String carrera = nUsuario.getCarrera();
		             	String ciclo = nUsuario.getCiclo();
		             	String ingreso = nUsuario.getPrimerPeriodo();
		             	String genero = nUsuario.getSexo();
		             	long codigo = nUsuario.getIdAlumno();
		             	String estado = nUsuario.getEstado().trim();
		             	
			             	if (utecService.findAlumnoByCodigo(codigo+"") == null) {
				             	Alumno alumno= new Alumno();
				             	alumno.setFirstName(firstname);
				             	alumno.setLastName(lastname);
				             	alumno.setCodigo(codigo+"");
				             	alumno.setPassword(password+"");
				             	alumno.setCorreo(correo);
				             	alumno.setCarrera(carrera);
				             	alumno.setIngreso(ingreso);
				             	alumno.setEdad(edad+"");
				             	alumno.setGenero(genero);
				             	alumno.setCiclo(ciclo);
				            	utecService.saveAlumno(alumno);
			             	} else {
			             		if(estado.equals("A")) {
				             		Alumno alumno = utecService.findAlumnoByCodigo(codigo+"");
				             		alumno.setFirstName(firstname);
					             	alumno.setLastName(lastname);
					             	alumno.setCarrera(carrera);
					             	alumno.setCorreo(correo);
					             	alumno.setIngreso(ingreso);
					             	alumno.setEdad(edad+"");
					             	alumno.setGenero(genero);
					             	alumno.setCiclo(ciclo);
					             	utecService.saveAlumno(alumno);
			             		}else {
			             		    Alumno alumno = utecService.findAlumnoByCodigo(codigo+"");
			             		    utecService.deleteAlumno(alumno.getId());
			             		}
			             	}
		             	}
	             
	             } else {
	             	ResponseUsuarios result = response.body();
	             	System.out.println("error: "+result.getMessage());
	             }

	         }

	         @Override
	         public void onFailure(Call<ResponseUsuarios> call, Throwable t) {
	        	 System.out.println("failure"+ t);
	         }

	     });
}
	    
public void sendEmail(final String correo, final String nombres, final String asunto, final String texto, final String usuario, final String clave, final String link, final String tipoPersona ) {
	    	
	    	Passport passport = new Passport();
		     System.out.println(passport.toString());
		      ApiService service = ApiServiceGenerator.createServiceAuth(ApiService.class);
		      Call<ResponseMessage> call = service.getAuth("application/json", passport);	
		      
		      
		      call.enqueue(new Callback<ResponseMessage>() {
			      	
		          public void onResponse(Call<ResponseMessage> call, Response<ResponseMessage> response) {
		              if (response.isSuccessful()) {
		              	ResponseMessage result = response.body();
		              	System.out.println(result.getContent());
		              	
					              ParametrosEmail parametrose = new ParametrosEmail(correo, nombres, asunto, texto, usuario, clave, link, tipoPersona);
					         	   ArrayList<ParametrosEmail> arrayList = new ArrayList<ParametrosEmail>();
					         	   arrayList.add(parametrose);
					         	  // ParametrosEmail[] Lista = new ParametrosEmail[1]; 
					         	 //  Lista[0] = parametrose;
					         	   
					         		  ApiService service = ApiServiceGenerator.createServiceData(ApiService.class);
					         	      Call<ResponseEmail> call2 = service.sendEmail("application/json", result.getContent(), arrayList );
					         	      System.out.println(parametrose.toString());
					         	      call2.enqueue(new Callback<ResponseEmail>() {
					         	      	
					         	          public void onResponse(Call<ResponseEmail> call, Response<ResponseEmail> response) {
					         	              if (response.isSuccessful()) {
					         	            	System.out.println("Email enviado satisfactoriamente");
					         	              } else {
					         	              	System.out.println("error: email no enviado ");
					         	              }
					         	
					         	          }
					         	
					         	          @Override
					         	          public void onFailure(Call<ResponseEmail> call, Throwable t) {
					         	        		System.out.println("error: email no enviado ");
					         	          }
					         	
					         	      });
		              } else {
		              }
		          }
		          @Override
		          public void onFailure(Call<ResponseMessage> call, Throwable t) {
		          }
		      });
	    	
	    	
	    }
	    
	
}
  