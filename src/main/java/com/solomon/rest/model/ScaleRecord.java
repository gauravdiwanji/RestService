package com.solomon.rest.model;

import java.util.List;

public class ScaleRecord {

	private String id;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	private String label;
	
	private double relativeWeight;
	
	private List<OaLevelRecord> oaLevels;

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public double getRelativeWeight() {
		return relativeWeight;
	}

	public void setRelativeWeight(double relativeWeight) {
		this.relativeWeight = relativeWeight;
	}

	public List<OaLevelRecord> getOaLevels() {
		return oaLevels;
	}

	public void setOaLevels(List<OaLevelRecord> oaLevels) {
		this.oaLevels = oaLevels;
	}
	
}
