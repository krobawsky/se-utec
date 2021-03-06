package org.springframework.samples.utec.web.api;

public class ResFormularioRequest {
	
	private Integer	 id;
	
	private String lugar_nacimiento;

	private String nombre_contacto;

	private String parentesco_contacto;

	private int telefono_contacto;

	private String conviviente;

	private String vivienda;

	private String enfermedad;

	private String grado_enfermedad;

	private String alergias;

	private String medicamentos;

	private String tratamiento;

	private String deporte;

	private String federacion_deportiva;

	private String tiempos_libres;

	private String instrumento_musical;

	private String asociacion;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLugar_nacimiento() {
		return lugar_nacimiento;
	}

	public void setLugar_nacimiento(String lugar_nacimiento) {
		this.lugar_nacimiento = lugar_nacimiento;
	}

	public String getNombre_contacto() {
		return nombre_contacto;
	}

	public void setNombre_contacto(String nombre_contacto) {
		this.nombre_contacto = nombre_contacto;
	}

	public String getParentesco_contacto() {
		return parentesco_contacto;
	}

	public void setParentesco_contacto(String parentesco_contacto) {
		this.parentesco_contacto = parentesco_contacto;
	}

	public int getTelefono_contacto() {
		return telefono_contacto;
	}

	public void setTelefono_contacto(int telefono_contacto) {
		this.telefono_contacto = telefono_contacto;
	}

	public String getConviviente() {
		return conviviente;
	}

	public void setConviviente(String conviviente) {
		this.conviviente = conviviente;
	}

	public String getVivienda() {
		return vivienda;
	}

	public void setVivienda(String vivienda) {
		this.vivienda = vivienda;
	}

	public String getEnfermedad() {
		return enfermedad;
	}

	public void setEnfermedad(String enfermedad) {
		this.enfermedad = enfermedad;
	}

	public String getGrado_enfermedad() {
		return grado_enfermedad;
	}

	public void setGrado_enfermedad(String grado_enfermedad) {
		this.grado_enfermedad = grado_enfermedad;
	}

	public String getAlergias() {
		return alergias;
	}

	public void setAlergias(String alergias) {
		this.alergias = alergias;
	}

	public String getMedicamentos() {
		return medicamentos;
	}

	public void setMedicamentos(String medicamentos) {
		this.medicamentos = medicamentos;
	}

	public String getTratamiento() {
		return tratamiento;
	}

	public void setTratamiento(String tratamiento) {
		this.tratamiento = tratamiento;
	}

	public String getDeporte() {
		return deporte;
	}

	public void setDeporte(String deporte) {
		this.deporte = deporte;
	}

	public String getFederacion_deportiva() {
		return federacion_deportiva;
	}

	public void setFederacion_deportiva(String federacion_deportiva) {
		this.federacion_deportiva = federacion_deportiva;
	}

	public String getTiempos_libres() {
		return tiempos_libres;
	}

	public void setTiempos_libres(String tiempos_libres) {
		this.tiempos_libres = tiempos_libres;
	}

	public String getInstrumento_musical() {
		return instrumento_musical;
	}

	public void setInstrumento_musical(String instrumento_musical) {
		this.instrumento_musical = instrumento_musical;
	}

	public String getAsociacion() {
		return asociacion;
	}

	public void setAsociacion(String asociacion) {
		this.asociacion = asociacion;
	}
	
}
