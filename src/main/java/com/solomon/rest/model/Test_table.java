package com.solomon.rest.model;

import java.io.Serializable;
import javax.persistence.*;

@Entity  
@Table(name= "TEST_TABLE")  
public class Test_table implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id  
	private int id;  
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getValue_field() {
		return value_field;
	}
	public void setValue_field(String value_field) {
		this.value_field = value_field;
	}
	private String value_field;
	
}
