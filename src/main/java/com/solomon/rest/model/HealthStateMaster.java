package com.solomon.rest.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the health_state_master database table.
 * 
 */
@Entity
@Table(name="health_state_master")
@NamedQuery(name="HealthStateMaster.findAll", query="SELECT h FROM HealthStateMaster h")
public class HealthStateMaster implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column(name="cancel_flag")
	private int cancelFlag;

	private String category;

	private String description;

	private int version;

	//bi-directional many-to-one association to PatientHealthState
//	@OneToMany(mappedBy="healthStateMaster")
//	private List<PatientHealthState> patientHealthStates;

	//bi-directional many-to-one association to PatientModelScore
//	@OneToMany(mappedBy="healthStateMaster")
//	private List<PatientModelScore> patientModelScores;

	public HealthStateMaster() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getCancelFlag() {
		return this.cancelFlag;
	}

	public void setCancelFlag(int cancelFlag) {
		this.cancelFlag = cancelFlag;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getVersion() {
		return this.version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

//	public List<PatientHealthState> getPatientHealthStates() {
//		return this.patientHealthStates;
//	}

//	public void setPatientHealthStates(List<PatientHealthState> patientHealthStates) {
//		this.patientHealthStates = patientHealthStates;
//	}

//	public PatientHealthState addPatientHealthState(PatientHealthState patientHealthState) {
//		getPatientHealthStates().add(patientHealthState);
//		patientHealthState.setHealthStateMaster(this);
//
//		return patientHealthState;
//	}

//	public PatientHealthState removePatientHealthState(PatientHealthState patientHealthState) {
//		getPatientHealthStates().remove(patientHealthState);
//		patientHealthState.setHealthStateMaster(null);
//
//		return patientHealthState;
//	}

//	public List<PatientModelScore> getPatientModelScores() {
//		return this.patientModelScores;
//	}
//
//	public void setPatientModelScores(List<PatientModelScore> patientModelScores) {
//		this.patientModelScores = patientModelScores;
//	}
//
//	public PatientModelScore addPatientModelScore(PatientModelScore patientModelScore) {
//		getPatientModelScores().add(patientModelScore);
//		patientModelScore.setHealthStateMaster(this);
//
//		return patientModelScore;
//	}
//
//	public PatientModelScore removePatientModelScore(PatientModelScore patientModelScore) {
//		getPatientModelScores().remove(patientModelScore);
//		patientModelScore.setHealthStateMaster(null);
//
//		return patientModelScore;
//	}

}