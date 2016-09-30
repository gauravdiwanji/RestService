package com.solomon.rest.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.solomon.rest.model.SolomonRecord;
import com.solomon.rest.service.JPAPersistenceManagerService;

@Component
@Path("/models")
public class UpdateModel {
	
	@Autowired
	JPAPersistenceManagerService jpaService;
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateModelResponse(SolomonRecord solomonObj) {
		
		return Response.status(200).entity(solomonObj.toString()).build();
	}
	
	@GET
	@Path("/verify")
	@Produces(MediaType.TEXT_PLAIN)
	public String verifyRESTService() {
		
		//jpaService.createTable();
		
		jpaService.updateValue("Test", "New Value");
 
		// return HTTP response 200 in case of success
		return "All ok bhosadike" ;
	}
}