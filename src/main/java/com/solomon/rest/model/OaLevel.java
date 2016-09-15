package com.solomon.rest.model;

import java.io.Serializable;
import javax.persistence.*;



/**
 * The persistent class for the oa_level database table.
 * 
 */
@Entity
@Table(name="oa_level")
@NamedQuery(name="OaLevel.findAll", query="SELECT o FROM OaLevel o")
public class OaLevel implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	private String $$hashKey;

	private String label;

	private int position;

	private int version;

	private double weight;

	//bi-directional many-to-one association to Scale
	@ManyToOne
	@JoinColumn(name="scale")
	private Scale scaleBean;

	public OaLevel() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String get$$hashKey() {
		return this.$$hashKey;
	}

	public void set$$hashKey(String $$hashKey) {
		this.$$hashKey = $$hashKey;
	}

	public String getLabel() {
		return this.label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public int getPosition() {
		return this.position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public int getVersion() {
		return this.version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public double getWeight() {
		return this.weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public Scale getScaleBean() {
		return this.scaleBean;
	}

	public void setScaleBean(Scale scaleBean) {
		this.scaleBean = scaleBean;
	}

}