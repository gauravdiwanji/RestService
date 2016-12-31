package com.solomon.rest.model;

import java.util.List;

public class ModelRecord {

	private String id;
	
	private String modelname;
	
	private int completed;
	
	private String location;
	
	private List<ScaleRecord> scales;

	public String getModelname() {
		return modelname;
	}

	public void setModelname(String modelname) {
		this.modelname = modelname;
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

	public List<ScaleRecord> getScales() {
		return scales;
	}

	public void setScales(List<ScaleRecord> scales) {
		this.scales = scales;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
}
