package org.spring.framework.samples.utec.api;

public class ResponseMessage extends Response {
	
    private String content;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "ResponseMessage [content=" + content + "]";
	}
    
	

}
