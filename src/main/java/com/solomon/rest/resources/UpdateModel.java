package com.solomon.rest.resources;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.text.SimpleDateFormat;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.QueryParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.solomon.rest.model.Model;
import com.solomon.rest.model.SolomonRecord;
import com.solomon.rest.service.JPAPersistenceManagerService;

import jersey.repackaged.com.google.common.collect.Lists;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

	@GET
	@Path("/patientlogin")
	// http://localhost:8080/RestService/solomon/models/patientlogin?firstName=abcd&lastName=xyz&dateOfBirth=2016-10-29T00:00:00.000Z
	public Response patientLogIn(
		@QueryParam("firstName") String firstName,
		@QueryParam("lastName") String lastName,
		@QueryParam("dateOfBirth") String dateOfBirth ) {
		
		String patientId = jpaService.getPatientID(firstName.toUpperCase(), lastName.toUpperCase(), dateOfBirth);
		
		return Response
				   .status(200)
				   .entity(
//					"FN : " + firstName + ", LN : " + lastName
//					+ ", DOB: " + dateOfBirth.toString()+", RETURN: "+
					patientId).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/patientModels")
	//http://localhost:8080/RestService/solomon/models/patientModels?patientId=44
	public Response patientModels(@QueryParam("patientId") String patientId)
	{
		List<Model> models = jpaService.getPatientModels(patientId);
	    
		class ModelJson{
			private String id;
			private int completed;
			private String location;
			private String modelname;
			private String creationdate;
			private String updatedate;
			private String completiondate;
			
			public String getId() {
				return id;
			}
			public void setId(String id) {
				this.id = id;
			}
			public int getCompleted() {
				return completed;
			}
			public void setCompleted(int completed) {
				this.completed = completed;
			}
			public String getLocation() {
				return location;
			}
			public void setLocation(String location) {
				this.location = location;
			}
			public String getModelname() {
				return modelname;
			}
			public void setModelname(String modelname) {
				this.modelname = modelname;
			}
			public String getCreationdate() {
				return creationdate;
			}
			public void setCreationdate(String creationdate) {
				this.creationdate = creationdate;
			}
			public String getUpdatedate() {
				return updatedate;
			}
			public void setUpdatedate(String updatedate) {
				this.updatedate = updatedate;
			}
			public String getCompletiondate() {
				return completiondate;
			}
			public void setCompletiondate(String completiondate) {
				this.completiondate = completiondate;
			}
		}
		
		List<ModelJson> modelsJ = new ArrayList<ModelJson> ();
		
		for(Model model : models)
		{
			System.out.println(model.getId());
			ModelJson modelJ = new ModelJson();
			modelJ.setId(model.getId());
			modelJ.setModelname(model.getModelname());
			modelJ.setCompleted(model.getCompleted());
			try{
			SimpleDateFormat dt = new SimpleDateFormat("EEE, MMM d, yyyy");
			modelJ.setCreationdate(dt.format(model.getCreationdate()));
			modelJ.setUpdatedate(dt.format(model.getUpdatedate()));
			modelJ.setCompletiondate(dt.format(model.getCompletiondate()));
			}
			catch(Exception ex)
			{
				System.out.println(ex.getMessage());
			}
			
			modelJ.setLocation(model.getLocation());
			modelsJ.add(modelJ);
		}
				
		ObjectMapper mapper = new ObjectMapper();
	    try {
	    	String jsonInString = mapper.writeValueAsString(modelsJ);
	    	System.out.println(jsonInString);
			return Response
					   .status(200)
					   .entity(jsonInString).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response
					   .status(200)
					   .entity("Error").build();	
		}
	       
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/modelJSON")
	//http://localhost:8080/RestService/solomon/models/modelJSON?modelId=44
	public Response modelJSON(@QueryParam("modelId") String modelId){
		String modelJSON = jpaService.getModelJson(modelId);
		return Response   
		.status(200)
		   .entity(
			modelJSON).build();
	}
}