package org.springframework.samples.utec.web.api;

import java.util.Collection;

import javax.validation.Valid;

import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.samples.utec.model.Alumno;
import org.springframework.samples.utec.model.Res_formulario;
import org.springframework.samples.utec.model.Resultado;
import org.springframework.samples.utec.model.Valores;
import org.springframework.samples.utec.service.UtecService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ResultadoResource extends AbstractResourceController{
	

	private final UtecService	utecService;

	@Autowired
	public ResultadoResource(UtecService utecService) {
		this.utecService = utecService;
	}

	@GetMapping("/alumnos/*/resultados/{resultadoId}")
	public ResultadoRequest findResultado(@PathVariable("resultadoId") int resultadoId) {
		
		final Resultado resultado = this.utecService.findResultadoById(resultadoId);

		final ResultadoRequest resultadoRequest = new ResultadoRequest();
		resultadoRequest.setId(resultado.getId());
		resultadoRequest.setDate(resultado.getDate());
		resultadoRequest.setDescripcion(resultado.getDescripcion());
		resultadoRequest.setTest(resultado.getTest());

		return resultadoRequest;
		
	}
	
	@GetMapping("/alumnos/{alumnoId}/resultados/{resultadoId}")
	public Resultado findResultado2(@PathVariable("resultadoId") int resultadoId) {
		
		final Resultado resultado = this.utecService.findResultadoById(resultadoId);

		return resultado;
		
	}
	
	@RequestMapping(value = "/tests/results/{alumnoId}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Integer createResultado (final @PathVariable("alumnoId") int studentId, final @Valid @RequestBody ResultadoRequest resultadoRequest, 
            final BindingResult bindingResult) {
        
        if (bindingResult.hasErrors()) {
            throw new InvalidRequestException("Submitted res invalid", bindingResult);
        }
        
        Resultado res = new Resultado();
        Alumno student = this.utecService.findAlumnoById(studentId);
        if (student == null) {
            throw new BadRequestException("Student with Id '" + studentId + "' is unknown.");
        }
        
        student.addResultado(res);
        save(res, resultadoRequest);
        
        throw new BadRequestException(res.getId().toString());
        
    }
	
	@PutMapping("/tests/results/{resultadoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void processUpdateResult (final @PathVariable("resultadoId") int resultId, final @Valid @RequestBody ResultadoRequest resultRequest, 
            final BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new InvalidRequestException("Submitted Result invalid", bindingResult);
        }

        save(utecService.findResultadoById(resultId), resultRequest);
        
    }
	
	@RequestMapping(value = "/tests/results/{resultadoId}/values", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addValues(final @PathVariable("resultadoId") int resultId, final @Valid @RequestBody ValoresRequest valRequest, 
            final BindingResult bindingResult) {
       
        if (bindingResult.hasErrors()) {
            throw new InvalidRequestException("Submitted val invalid", bindingResult);
        }
        
        Valores value = new Valores();
        Resultado result = this.utecService.findResultadoById(resultId);
        if (result == null) {
            throw new BadRequestException(" Result with Id '" + resultId + "' is unknown.");
        }
        
        result.addValores(value);
        saveValor(value, valRequest);
        
    }
	
	@PutMapping("/alumnos/{alumnoId}/resultados/{resultadoId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void processUpdateForm(final @PathVariable("resultadoId") int resultadoId, final @Valid @RequestBody ResultadoRequest resultadoRequest, final BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			throw new InvalidRequestException("Submitted Pet invalid", bindingResult);
		}

		save(utecService.findResultadoById(resultadoId), resultadoRequest);
		
	}
	
	@RequestMapping(value = "/tests/resultsForm/{alumnoId}/values", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addValuesForm(final @PathVariable("alumnoId") int studentId, final @Valid @RequestBody ResFormularioRequest resFormRequest, 
            final BindingResult bindingResult) {
       
        if (bindingResult.hasErrors()) {
            throw new InvalidRequestException("Submitted val invalid", bindingResult);
        }
        
        Res_formulario resForm = new Res_formulario();
        Alumno student = this.utecService.findAlumnoById(studentId);
        if (student == null) {
            throw new BadRequestException("Student with Id '" + studentId + "' is unknown.");
        }
    
        student.addResFormulario(resForm);
        saveForm(resForm, resFormRequest);
        
    }
	
	private Resultado save(Resultado resultado, ResultadoRequest resultadoRequest) {

		resultado.setTest(resultadoRequest.getTest());
		resultado.setDescripcion(resultadoRequest.getDescripcion());
		resultado.setDate(resultadoRequest.getDate());
		LocalDate localDate = resultado.getExpdate();
		LocalDate expdate = localDate.plusDays(resultadoRequest.getExpdate());
		resultado.setExpdate(expdate);

		utecService.saveResultado(resultado);
		
		return resultado;
		
	}
	
	private void saveValor(Valores value, ValoresRequest valRequest) {
        
		value.setTipo(valRequest.getTipo());
        value.setValue(valRequest.getValue());
        value.setDescripcion(valRequest.getDescripcion());
        value.setPosicion(valRequest.getPosicion());

        utecService.saveValor(value);
    }
	
	private Res_formulario saveForm(Res_formulario resultado, ResFormularioRequest resultadoRequest) {

		resultado.setLugar_nacimiento(resultadoRequest.getLugar_nacimiento());
		resultado.setNombre_contacto(resultadoRequest.getNombre_contacto());
		resultado.setParentesco_contacto(resultadoRequest.getParentesco_contacto());
		resultado.setTelefono_contacto(resultadoRequest.getTelefono_contacto());
		resultado.setConviviente(resultadoRequest.getConviviente());
		resultado.setVivienda(resultadoRequest.getVivienda());
		resultado.setEnfermedad(resultadoRequest.getEnfermedad());
		resultado.setGrado_enfermedad(resultadoRequest.getGrado_enfermedad());
		resultado.setAlergias(resultadoRequest.getAlergias());
		resultado.setMedicamentos(resultadoRequest.getMedicamentos());
		resultado.setTratamiento(resultadoRequest.getTratamiento());
		resultado.setDeporte(resultadoRequest.getDeporte());
		resultado.setFederacion_deportiva(resultadoRequest.getFederacion_deportiva());
		resultado.setTiempos_libres(resultadoRequest.getTiempos_libres());
		resultado.setInstrumento_musical(resultadoRequest.getInstrumento_musical());
		resultado.setAsociacion(resultadoRequest.getAsociacion());

		utecService.saveResFormulario(resultado);
		
		return resultado;
		
	}
	
	@GetMapping("/formulario/{area}/{dato}")
	public Collection<Alumno> findResultadoFormularioCollection(@PathVariable("area") String area, @PathVariable("dato") String dato) {
		
		if(area.equalsIgnoreCase("lugar_nacimiento")) {
			return this.utecService.filterResultadoByNacimiento(dato);
		} else if(area.equalsIgnoreCase("enfermedad")) {
			return this.utecService.filterResultadoByEnfermedad(dato);
		} else if(area.equalsIgnoreCase("deporte")) {
			return this.utecService.filterResultadoByDeporte(dato);
		} else {
			return null;
		}
		
	}
	
}
