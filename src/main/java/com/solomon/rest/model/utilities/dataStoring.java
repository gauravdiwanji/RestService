package com.solomon.rest.model.utilities;

import com.solomon.rest.model.Patient;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 * Created by zhangsikai on 9/16/16.
 */
public class dataStoring {

    public static void main(String [] args)
    {

        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory( "solomonJPA" );
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();
        Patient patient = new Patient();
        patient.setId("17");
        patient.setName("testPatient");
        entityManager.persist(patient);
        entityManager.getTransaction().commit();
        entityManager.close();
        entityManagerFactory.close();

    }

}
