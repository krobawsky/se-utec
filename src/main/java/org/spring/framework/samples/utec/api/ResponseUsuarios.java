package org.spring.framework.samples.utec.api;

import java.util.List;

public class ResponseUsuarios extends Response{
	
	private List<Usuario> content;

	public List<Usuario> getContent() {
		return content;
	}

	public void setContent(List<Usuario> content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "ResponseUsuarios [content=" + content + "]";
	}
	
	

}
