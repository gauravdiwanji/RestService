package com.solomon.rest.model;

import javax.persistence.*;
import java.io.Serializable;
 
/**
 * Represents an hello Category
 */
@Entity
@Table(name="HELLO_CAT")
public class HelloCategory implements Serializable {
 
 
    @Id
    @Column(name = "CAT_DESC")
    private String desc;
 
    @Id
    @JoinColumn(name= "HELLO_ID")
    private HelloWorld helloWorld;
 
    public HelloCategory() {
    }
 
    public HelloCategory(HelloWorld helloWorld) {
        this.setHelloWorld(helloWorld);
    }
 
    public String getDesc() {
        return desc;
    }
 
    public void setDesc(String desc) {
        this.desc = desc;
    }
 
    public HelloWorld getHelloWorld() {
        return helloWorld;
    }
 
    public void setHelloWorld(HelloWorld helloWorld) {
        this.helloWorld = helloWorld;
    }
 
    @Override
    public String toString() {
        return "HelloCategory{" +
                "desc='" + desc + '\'' +
                "helloWorld="+helloWorld.getDescription()+
                '}';
    }
}
