package com.solomon.rest.model;

import java.io.Serializable;
import javax.persistence.*;


import java.util.List;


/**
 * The persistent class for the model database table.
 * 
 */
@Entity
@NamedQuery(name="Model.findAll", query="SELECT m FROM Model m")
public class Model implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	private int age;

	private int completed;

	private String location;

	private String modelname;

	private int version;

	//bi-directional one-to-one association to JsonData
	@OneToOne(mappedBy="model")
	private JsonData jsonData;

	//bi-directional many-to-one association to Patient
	@ManyToOne
	@JoinColumn(name="patient")
	private Patient patientBean;

	//bi-directional many-to-one association to Scale
	@OneToMany(mappedBy="modelBean", cascade = CascadeType.PERSIST)
	private List<Scale> scales;

	public Model() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getAge() {
		return this.age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getCompleted() {
		return this.completed;
	}

	public void setCompleted(int completed) {
		this.completed = completed;
	}

	public String getLocation() {
		return this.location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getModelname() {
		return this.modelname;
	}

	public void setModelname(String modelname) {
		this.modelname = modelname;
	}

	public int getVersion() {
		return this.version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public JsonData getJsonData() {
		return this.jsonData;
	}

	public void setJsonData(JsonData jsonData) {
		this.jsonData = jsonData;
	}

	public Patient getPatientBean() {
		return this.patientBean;
	}

	public void setPatientBean(Patient patientBean) {
		this.patientBean = patientBean;
	}

	public List<Scale> getScales() {
		return this.scales;
	}

	public void setScales(List<Scale> scales) {
		this.scales = scales;
	}

	public Scale addScale(Scale scale) {
		getScales().add(scale);
		scale.setModelBean(this);

		return scale;
	}

	public Scale removeScale(Scale scale) {
		getScales().remove(scale);
		scale.setModelBean(null);

		return scale;
	}

}