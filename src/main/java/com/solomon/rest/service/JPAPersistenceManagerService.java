package com.solomon.rest.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Service;

import com.solomon.rest.model.AttributeSetData;
import com.solomon.rest.model.HelloCategory;
import com.solomon.rest.model.HelloWorld;
import com.solomon.rest.model.Model;
import com.solomon.rest.model.OaLevel;
import com.solomon.rest.model.Patient;
import com.solomon.rest.model.Scale;
import com.solomon.rest.model.SolomonRecord;
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
	
	public void helloTest(){
		 EntityManager em = emf.createEntityManager();
		 
	        // A normal Hello World Construction
	        // The normal Hello World
	        HelloWorld aNormalHelloWorld = new HelloWorld();
//	        aNormalHelloWorld.setId(1);
	        aNormalHelloWorld.setDescription("Hello!");
	        // The normal Hello Category
	        HelloCategory aNormalHelloCategory = new HelloCategory(aNormalHelloWorld);
	        aNormalHelloCategory.setDesc("A normal Hello");
	        aNormalHelloWorld.add(aNormalHelloCategory);
	 
	 
	        // Persistence
	        em.getTransaction().begin();
	        em.merge(aNormalHelloWorld);
	        em.getTransaction().commit();
	 
	        // Retrieve
	        // Hello World whose primary key is 1
	        //HelloWorld helloWorld = em.find(HelloWorld.class, 1);
	        //System.out.println(helloWorld);
	        //for (HelloCategory helloCategory:helloWorld.getHelloCategories()){
	          //  System.out.println(helloCategory.getDesc());
	        //}
	 
	 
	        em.close();
	        //emf.close();
	}
	
	public void updateValue(String valOld, String valNew) {
		EntityManager em = emf.createEntityManager();
		
		Query query = em.createQuery("SELECT e FROM TestTable e WHERE e.value_field = :first");
		query.setParameter("first", valOld);
//		List<TestTable> list = (List<TestTable>) query.getSingleResult();
//				.getResultList();
		TestTable test;
		try{
		test = (TestTable) query.getSingleResult();
		}
		catch(Exception ex){
		test = new TestTable();	
		}
		
		//for(TestTable test : list)
		//{
			em.getTransaction().begin();
			test.setValue_field(valNew);
			em.persist(test);
			em.getTransaction().commit();
			em.close();
		//}
		
		
	}
	
	public void insertUpdateSolomonRecord(SolomonRecord solomonRecord)
	{
		EntityManager em = emf.createEntityManager();
		
		Query query = em.createQuery("SELECT m FROM Model m WHERE m.modelname = :first");
		query.setParameter("first", solomonRecord.getModelName());
		
		try{
			Model model = (Model) query.getSingleResult();
			System.out.println("Here1");
		}
		catch (Exception e)
		{
			System.out.println("Here2 Error:"+solomonRecord.getModelName()+" doesnt exist"+e.getMessage());
			
			Patient patient = new Patient();
			patient.setName(solomonRecord.getUserName());
			List<Model> models = new ArrayList<Model>();
			patient.setModels(models);
			
			
			Model model = new Model();
			model.setModelname(solomonRecord.getModelName());
			model.setLocation(solomonRecord.getInterviewLocation());
			model.setAge(solomonRecord.getAge());
			List<Scale> scales = new ArrayList<Scale>();
			model.setScales(scales);
			patient.addModel(model);
			
			
			HashMap<Integer,Scale> setIdMap = new HashMap<Integer,Scale>();
			
			for(AttributeSetData inputAttributeSetData : solomonRecord.getAttributeSetData())
			{
				Scale scale;
				if(!setIdMap.containsKey((inputAttributeSetData.getSetId())))
				{
					scale = new Scale();
					scale.setLabel(Integer.toString(inputAttributeSetData.getSetId()));
					List<OaLevel> oaLevels = new ArrayList<OaLevel>();
					scale.setOaLevels(oaLevels);
					setIdMap.put(inputAttributeSetData.getSetId(),scale);
				}
				else
				{
					scale = setIdMap.get(inputAttributeSetData.getSetId());
				};
				
				OaLevel oaLevel = new OaLevel();
				oaLevel.setLabel(inputAttributeSetData.getTitle());
				oaLevel.setPosition(inputAttributeSetData.getPosition());
				oaLevel.setWeight(inputAttributeSetData.getRelativeWeight());
				scale.addOaLevel(oaLevel);
				
				setIdMap.put(inputAttributeSetData.getSetId(),scale);
			}
			
			for (Scale scale : setIdMap.values()) {
			    model.addScale(scale);
			}
			
				
			em.getTransaction().begin();
			em.merge(patient);			
			em.getTransaction().commit();
			em.close();
			
			System.out.println("New Record Added!");
			
		}
		
	}
	
	
}
