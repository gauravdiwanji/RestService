package com.solomon.rest.service;

import java.util.List;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Service;

import com.solomon.rest.model.TestTable;

@Service
public class JPAPersistenceManagerService {
	
	private static final Logger logger = Logger.getLogger(JPAPersistenceManagerService.class.getName());
	private static final String PERSISTENCE_UNIT_NAME = "JPATEST";

	EntityManagerFactory emf ;
	
	JPAPersistenceManagerService(){
		try{
			emf = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
		}
		catch(Exception e){
			logger.severe("Error creating entityManagerFactory" + e.getMessage());
			e.printStackTrace();
		}
	}
	
	public void createTable(){
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		TestTable test = new TestTable();
		test.setValue_field("Test");
		em.persist(test);
		em.getTransaction().commit();
		em.close();
	}
	

	
	public void updateValue(String valOld, String valNew)
	{
		EntityManager em = emf.createEntityManager();
		
		Query query = em.createQuery("SELECT e FROM TestTable e WHERE e.value_field = :first");
		query.setParameter("first", valOld);
//		List<TestTable> list = (List<TestTable>) query.getSingleResult();
//				.getResultList();
		
		TestTable test = (TestTable) query.getSingleResult();
		
		//for(TestTable test : list)
		//{
			em.getTransaction().begin();
			test.setValue_field(valNew);
			em.persist(test);
			em.getTransaction().commit();
			em.close();
		//}
		
		
	}
	
}
