package com.solomon.rest.config;

import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;

public class SolomonApplication extends ResourceConfig {
	public SolomonApplication(){
		super();
		register(JacksonFeature.class); 
        //Lists which packages to scan for providers
        packages("com.solomon.rest.resources");
		
	}

}
