package org.spring.framework.samples.utec.api;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiServiceGenerator {
	
	 private static OkHttpClient.Builder httpClient1 = new OkHttpClient.Builder();
	 private static OkHttpClient.Builder httpClient2 = new OkHttpClient.Builder();
	    private static Retrofit.Builder builderAuth = new Retrofit.Builder()
	            .baseUrl(ApiService.API_BASEAUTH_URL)
	            .addConverterFactory(GsonConverterFactory.create());
	    
	    private static Retrofit.Builder builderData = new Retrofit.Builder()
	            .baseUrl(ApiService.API_BASEDATA_URL)
	            .addConverterFactory(GsonConverterFactory.create());

	    private static Retrofit retrofit1;
	    private static Retrofit retrofit2;

	    private ApiServiceGenerator() {
	    }

	    public static <S> S createServiceAuth(Class<S> serviceClass) {
	        if(retrofit1 == null) {
	            retrofit1 = builderAuth.client(httpClient1.build()).build();
	        }
	        return retrofit1.create(serviceClass);
	    }
	    
	    public static <S> S createServiceData(Class<S> serviceClass) {
	        if(retrofit2 == null) {
	            retrofit2 = builderData.client(httpClient2.connectTimeout(100, TimeUnit.SECONDS).readTimeout(100,TimeUnit.SECONDS).build()).build();
	        }
	        return retrofit2.create(serviceClass);
	    }

}
