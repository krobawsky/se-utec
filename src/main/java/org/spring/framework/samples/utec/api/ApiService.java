package org.spring.framework.samples.utec.api;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface ApiService {
	
   String API_BASEAUTH_URL = "http://104.197.115.186:9000";
   String API_BASEDATA_URL = "http://104.197.190.191:9000";
   
    @POST("/aa-server/v1/coreuat1/s2a/auth")
    Call<ResponseMessage> getAuth(@Header("Content-Type") String content_type, @Body Passport passport);
    
    @POST("/pasantias-api/persona/listadopersonas")
    Call<ResponseUsuarios> getPersonas(@Header("Content-Type") String content_type, @Header("X-Auth-Token") String token, @Body Parametros parametros);

    @POST("/pasantias-api/persona/notificarpersonas")
    Call<ResponseEmail> sendEmail(@Header("Content-Type") String content_type, @Header("X-Auth-Token") String token, @Body ArrayList<ParametrosEmail> arrayList);
    
}
