package org.springframework.samples.utec.web.api;

import java.util.Collection;

import javax.validation.Valid;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.samples.utec.model.Alumno;
import org.springframework.samples.utec.model.User;
import org.springframework.samples.utec.service.UtecService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserResource extends AbstractResourceController {
	
	private final Logger logger = Logger.getLogger(UserResource.class);
	
	
	private final UtecService utecService;
	
	
	@Autowired
	public UserResource(UtecService utecService) {
		
		this.utecService = utecService;
	}
	
	private User retrieveUser(int userId) {
		return this.utecService.findUserById(userId);
	}
	
	@RequestMapping(value = "/loginA", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public User validacionCredencialAdmin(@RequestBody @Valid User user, BindingResult bindingResult) {
		
		logger.info("Corriendo en UserResource...");
		logger.info("Username del formulario :"+user.getUsername());
		logger.info("Password del formulario :"+user.getPassword());
		
		///si no coincide, entonces devuelve null. 
		User var_usuario = this.utecService.findByUsername(user.getUsername());
		logger.info("--- Username valido :"+var_usuario.getId());
		logger.info("--- Username valido :"+var_usuario.getUsername());
		logger.info("--- Username valido :"+var_usuario.getPassword());
		logger.info("--- Username valido :"+var_usuario.getRol());
		
		///logger.info("--- Username valido :"+Hash.sha1(var_usuario.getPassword()));
		User confirm_usuario = new User();
		
		confirm_usuario = null;
		
		 String username = var_usuario.getUsername();
		 String password = var_usuario.getPassword();
		 String rol = var_usuario.getRol();
		 
		 String var = "ADMIN";
		 
		if (username.equals(user.getUsername()) && password.equals(user.getPassword()) && rol.equals(var) || rol.equals("PSICOLOGO")) {
	
			confirm_usuario = this.utecService.findByUsername(user.getUsername());
		
		}
		 
		return confirm_usuario;
		}
	
	@RequestMapping(value = "/loginT", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public User validacionCredencialTutor(@RequestBody @Valid User user, BindingResult bindingResult) {
		
		logger.info("Corriendo en UserResource...");
		logger.info("Username del formulario :"+user.getUsername());
		logger.info("Password del formulario :"+user.getPassword());
		
		///si no coincide, entonces devuelve null. 
		User var_usuario = this.utecService.findByUsername(user.getUsername());
		logger.info("--- Username valido :"+var_usuario.getId());
		logger.info("--- Username valido :"+var_usuario.getUsername());
		logger.info("--- Username valido :"+var_usuario.getPassword());
		logger.info("--- Username valido :"+var_usuario.getRol());
		
		///logger.info("--- Username valido :"+Hash.sha1(var_usuario.getPassword()));
		User confirm_usuario = new User();
		
		confirm_usuario = null;
		
		 String username = var_usuario.getUsername();
		 String password = var_usuario.getPassword();
		 String rol = var_usuario.getRol();
		 
		 String var = "ADMIN";
		 
		if (username.equals(user.getUsername()) && password.equals(user.getPassword()) && rol.equals(var)) {
			logger.info("login");
			
			confirm_usuario = this.utecService.findByUsername(user.getUsername());
		
		}
		 
		
		return confirm_usuario;
		}
	
	@RequestMapping(value = "/loginE", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Alumno validacionCredencialEstudiante(@RequestBody @Valid Alumno alumno, BindingResult bindingResult) {
		
		logger.info("Corriendo en UserResource...");
		logger.info("Codigo ingresado desdel formulario :"+alumno.getCodigo());
		logger.info("Password ingresado desdel formulario :"+alumno.getPassword());
		
		///si no coincide, entonces devuelve null. 
		Alumno var_alumno = this.utecService.findAlumnoByCodigo(alumno.getCodigo());
		logger.info("--- Username valido :"+var_alumno.getId());
		logger.info("--- Username valido :"+var_alumno.getCodigo());
		logger.info("--- Username valido :"+var_alumno.getPassword());
		
		Alumno confirm_alumno = new Alumno();
		
		confirm_alumno = null;
		
		 String codigo = var_alumno.getCodigo();
		 String password = var_alumno.getPassword();
		 
		if (codigo.equals(alumno.getCodigo()) && password.equals(alumno.getPassword())){
			logger.info("Credenciales alumno valido");
			
			confirm_alumno = this.utecService.findAlumnoByCodigo(alumno.getCodigo());
		
		}
		 
		return confirm_alumno;
		}
			
	
	/**
	 * Read single Owner
	 */
	@RequestMapping(value = "/welcomeadmin/{numero}/users/{userId}", method = RequestMethod.GET)
	public User findUser(@PathVariable("userId") int userId) {
		return retrieveUser(userId);
	}
	
	@RequestMapping(value = "/welcomeadmin/{numero}/user/list", method = RequestMethod.GET)
	public Collection<User> findUsuarioCollection(@RequestParam("lastName") String userLastname) {

		if (userLastname == null) {
			userLastname = "";
		}
		return this.utecService.findUserByLastName(userLastname);
	}
	
	@PutMapping("/welcomeadmin/{numero}/users/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void processUpdateResult (final @PathVariable("userId") int userId, final @Valid @RequestBody UserRequest userRequest, 
            final BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new InvalidRequestException("Submitted Result invalid", bindingResult);
        }

        save(utecService.findUserById(userId), userRequest);
    }
	
	private User save(User user, UserRequest userRequest) {

		user.setRol(userRequest.getRol());
		utecService.saveUser(user);
		
		return user;
	}
	
}