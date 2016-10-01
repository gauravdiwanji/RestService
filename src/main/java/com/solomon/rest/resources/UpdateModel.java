package com.solomon.rest.resources;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
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
		
//		jpaService.createTable();
		
//		jpaService.updateValue("New Value", "New Value");
		jpaService.helloTest();
		// return HTTP response 200 in case of success
		return "All ok." ;
	}
	

	@GET
	@Path("/verify/{old}/{new}")
	@Produces(MediaType.TEXT_PLAIN)
	public String verifyRESTServiceInput(@PathParam("old") String inputOld,@PathParam("new") String inputNew) {
		
		//jpaService.createTable();
		
		jpaService.updateValue(inputOld, inputNew);
		
 
		// return HTTP response 200 in case of success
		return "All ok." ;
	}
	
	
	@POST
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateModelResponse(InputStream incomingData) {
		
		StringBuilder jsonTextString = new StringBuilder();
		ObjectMapper mapper=new ObjectMapper();
		SolomonRecord solomonObj = new SolomonRecord();
		
		try {
			
			BufferedReader in = new BufferedReader(new InputStreamReader(incomingData));
			
			//Write JSON data to jsonTextString
			String line = null;
			while ((line = in.readLine()) != null) {
				jsonTextString.append(line);
			}	
			StringReader jsonData = new StringReader(jsonTextString.toString());		
			solomonObj = mapper.readValue(jsonData, SolomonRecord.class);
			solomonObj.setJsonText(jsonTextString.toString());
			
			jpaService.insertUpdateSolomonRecord(solomonObj);
			
		}
		catch (Exception e) {
		e.printStackTrace();
		System.out.println("Error Parsing: - "+e.getMessage());
		}
		
		System.out.println("Data Received: " + jsonTextString.toString());
 
		// return HTTP response 200 in case of success
		return Response.status(200).entity(solomonObj.toString()).build();
	}
}