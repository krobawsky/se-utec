package org.spring.framework.samples.utec.api;

public class Parametros {
	
	private int tipoPersona;
	private String fecha;
	
	public int getTipoPersona() {
		return tipoPersona;
	}
	public void setTipoPersona(int tipoPersona) {
		this.tipoPersona = tipoPersona;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	@Override
	public String toString() {
		return "Parametros [tipoPersona=" + tipoPersona + ", fecha=" + fecha + "]";
	}
	
	

}
