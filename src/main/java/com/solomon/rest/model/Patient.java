package com.solomon.rest.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;
import java.util.Date;

/**
 * The persistent class for the patient database table.
 * 
 */
@Entity
@NamedQuery(name="Patient.findAll", query="SELECT p FROM Patient p")
public class Patient implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private String id;

	private String name;

	private String password;

	private String username;
	
	private String firstname;
	
	private String lastname;
	
	private Date dateofbirth;
	
	private String MRN;

	private int version;

	//bi-directional many-to-one association to Model
	@OneToMany(mappedBy="patientBean", cascade = CascadeType.PERSIST, orphanRemoval=true)
	private List<Model> models;

	public Patient() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public Date getDateofbirth() {
		return dateofbirth;
	}

	public void setDateofbirth(Date dateofbirth) {
		this.dateofbirth = dateofbirth;
	}

	public String getMRN() {
		return MRN;
	}

	public void setMRN(String mRN) {
		MRN = mRN;
	}

	public int getVersion() {
		return this.version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public List<Model> getModels() {
		return this.models;
	}

	public void setModels(List<Model> models) {
		this.models = models;
	}

	public Model addModel(Model model) {
		getModels().add(model);
		model.setPatientBean(this);

		return model;
	}

	public Model removeModel(Model model) {
		getModels().remove(model);
		model.setPatientBean(null);

		return model;
	}

}