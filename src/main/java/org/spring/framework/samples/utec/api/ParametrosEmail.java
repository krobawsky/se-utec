package org.spring.framework.samples.utec.api;

public class ParametrosEmail {
	
	private String correo, nombres, asunto, texto, usuario, clave, link, tipoPersona;
	
	public ParametrosEmail(String correo, String nombres, String asunto, String texto, String usuario, String clave,
			String link, String tipoPersona) {
		super();
		this.correo = correo;
		this.nombres = nombres;
		this.asunto = asunto;
		this.texto = texto;
		this.usuario = usuario;
		this.clave = clave;
		this.link = link;
		this.tipoPersona = tipoPersona;
	}

	public ParametrosEmail() {
		super();
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getAsunto() {
		return asunto;
	}

	public void setAsunto(String asunto) {
		this.asunto = asunto;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getClave() {
		return clave;
	}

	public void setClave(String clave) {
		this.clave = clave;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}
	
	public String getTipoPersona() {
		return tipoPersona;
	}

	public void setTipoPersona(String tipoPersona) {
		this.tipoPersona = tipoPersona;
	}

	@Override
	public String toString() {
		return "ParametrosEmail [correo=" + correo + ", nombres=" + nombres + ", asunto=" + asunto + ", texto=" + texto
				+ ", usuario=" + usuario + ", clave=" + clave + ", link=" + link + ", tipoPersona=" + tipoPersona + "]";
	}

	
	
}
