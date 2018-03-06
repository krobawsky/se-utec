package org.spring.framework.samples.utec.api;

public class Parameter {

	 private String clientId = "88476100-1afc-11e8-accf-0ed5f89f718b.utecapps.edu.pe";
     private String clientSecret = "88476100-1afc-11e8-accf-0ed5f89f718b";
	public String getClientId() {
		return clientId;
	}
	public String getClientSecret() {
		return clientSecret;
	}
	@Override
	public String toString() {
		return "Parameter [clientId=" + clientId + ", clientSecret=" + clientSecret + "]";
	}

     
}
