package com.solomon.rest.model;

import java.io.Serializable;
import javax.persistence.*;

import java.util.List;


/**
 * The persistent class for the scale database table.
 * 
 */
@Entity
@NamedQuery(name="Scale.findAll", query="SELECT s FROM Scale s")
public class Scale implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	private String $$hashkey;

	private String label;

	private int position;

	@Column(name="relative_weight")
	private double relativeWeight;

	private int version;

	//bi-directional many-to-one association to OaLevel
	@OneToMany(mappedBy="scaleBean")
	private List<OaLevel> oaLevels;

	//bi-directional many-to-one association to Model
	@ManyToOne
	@JoinColumn(name="model")
	private Model modelBean;

	public Scale() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String get$$hashkey() {
		return this.$$hashkey;
	}

	public void set$$hashkey(String $$hashkey) {
		this.$$hashkey = $$hashkey;
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

	public double getRelativeWeight() {
		return this.relativeWeight;
	}

	public void setRelativeWeight(double relativeWeight) {
		this.relativeWeight = relativeWeight;
	}

	public int getVersion() {
		return this.version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public List<OaLevel> getOaLevels() {
		return this.oaLevels;
	}

	public void setOaLevels(List<OaLevel> oaLevels) {
		this.oaLevels = oaLevels;
	}

	public OaLevel addOaLevel(OaLevel oaLevel) {
		getOaLevels().add(oaLevel);
		oaLevel.setScaleBean(this);

		return oaLevel;
	}

	public OaLevel removeOaLevel(OaLevel oaLevel) {
		getOaLevels().remove(oaLevel);
		oaLevel.setScaleBean(null);

		return oaLevel;
	}

	public Model getModelBean() {
		return this.modelBean;
	}

	public void setModelBean(Model modelBean) {
		this.modelBean = modelBean;
	}

}