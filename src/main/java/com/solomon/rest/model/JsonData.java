package com.solomon.rest.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the json_data database table.
 * 
 */
@Entity
@Table(name="json_data")
@NamedQuery(name="JsonData.findAll", query="SELECT j FROM JsonData j")
public class JsonData implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Lob
	private String data;

	//bi-directional one-to-one association to Model
	@OneToOne
	@JoinColumn(name="id")
	private Model model;

	public JsonData() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getData() {
		return this.data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Model getModel() {
		return this.model;
	}

	public void setModel(Model model) {
		this.model = model;
	}

}