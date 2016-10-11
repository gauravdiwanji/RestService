package com.solomon.rest.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
 
@Entity
@Table(name = "HELLO")
public class HelloWorld implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "HELLO_ID")
    private int id;
 
    @Basic()
    @Column(name = "HELLO_DESC")
    private String Description;
 
    @OneToMany(orphanRemoval=true)
    // The join column is in the many/target table (ie the HelloCategory)
    // and is mandatory in order to not create a Join table (many-to-many structure).
    @JoinColumn(name="HELLO_ID") 
    private List<HelloCategory> helloCategories = new ArrayList<HelloCategory>();
 
    public int getId() {
        return id;
    }
 
    public void setId(int id) {
        this.id = id;
    }
 
    public String getDescription() {
        return Description;
    }
 
    public void setDescription(String description) {
        Description = description;
    }
 
 
    public void add(HelloCategory helloCategory) {
        //To change body of created methods use File | Settings | File Templates.
        getHelloCategories().add(helloCategory);
 
    }
 
    public List<HelloCategory> getHelloCategories() {
        return helloCategories;
    }
 
    @Override
    public String toString() {
        return "HelloWorld{" +
                "id='" + id + '\'' +
                ", Description='" + Description + '\'' +
                ", helloCategories=" + helloCategories +
                '}';
    }
}
