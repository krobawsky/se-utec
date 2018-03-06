package org.spring.framework.samples.utec.api;

public class Response {

	private long timestamp;
    private String uuid;
    private int status;
    private String message;
    private String managed;
    
    public long getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getManaged() {
		return managed;
	}
	public void setManaged(String managed) {
		this.managed = managed;
	}
	@Override
	public String toString() {
		return "Response [timestamp=" + timestamp + ", uuid=" + uuid + ", status=" + status + ", message=" + message
				+ ", managed=" + managed + "]";
	}
	
}
