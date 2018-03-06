package org.spring.framework.samples.utec.api;

public class Passport {
	
	private String correlationId = "865bbb4d-86d7-4b94-859f-2a8efcb5e5e2";
	private String consumerId = "pasantias-api";
	private Parameter parameters  = new Parameter();
	
	public String getCorrelationId() {
		return correlationId;
	}
	public String getConsumerId() {
		return consumerId;
	}
	public Parameter getParameters() {
		return parameters;
	}
	@Override
	public String toString() {
		return "Passport [correlationId=" + correlationId + ", consumerId=" + consumerId + ", parameters=" + parameters
				+ "]";
	}
	
	
	

}
