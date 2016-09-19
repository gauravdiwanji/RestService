package com.solomon.rest.resources;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;


import com.solomon.rest.model.*;

public class PersistenceTest {
	
	private static final String PERSISTENCE_UNIT_NAME = "JPATEST";
    private static EntityManagerFactory factory;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        
		factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        EntityManager em = factory.createEntityManager();
        
        em.getTransaction().begin();
        TestTable test = new TestTable();
        test.setValue_field("Test");
        em.persist(test);
        em.getTransaction().commit();

        em.close();
        
        System.out.println("Successful");

	}

}
