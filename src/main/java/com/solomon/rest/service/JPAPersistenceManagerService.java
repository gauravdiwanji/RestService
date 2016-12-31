package com.solomon.rest.service;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.solomon.rest.model.*;

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
	
	public String getPatientID(String firstName, String lastName, String dateOfBirth) {
		EntityManager em = emf.createEntityManager();
		
		//DateFormat m_ISO8601Local = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'.000Z'");
		DateFormat m_ISO8601Local = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date dob;
		try {
			dob = m_ISO8601Local.parse(dateOfBirth);
		} catch (ParseException e) {	
			e.printStackTrace();
			return "-1";
		}
		
		Query query = em.createQuery("SELECT e FROM Patient e WHERE e.firstname = :firstname and e.lastname = :lastname and e.dateofbirth = :dateofbirth");
		query.setParameter("firstname", firstName);
		query.setParameter("lastname", lastName);
		query.setParameter("dateofbirth", dob);

		Patient patient;
		try{
		patient = (Patient) query.getSingleResult();
		}
		catch(Exception ex){
			patient = new Patient();
			patient.setName(firstName+" "+lastName);
			patient.setFirstname(firstName);
			patient.setLastname(lastName);
			patient.setDateofbirth(dob);
						
			em.getTransaction().begin();
			em.persist(patient);
			em.getTransaction().commit();
			em.close();
		
		}
		
		return patient.getId();		
	}
	
	public List<Model> getPatientModels(String patientId)
	{
		EntityManager em = emf.createEntityManager();
		Patient patient = em.find(Patient.class, patientId);

		List<Model> models = patient.getModels();
		em.close();
		return models;
		
	}
	
	public String getModelJson(String modelId)
	{
		EntityManager em = emf.createEntityManager();
		Model model = em.find(Model.class, modelId);
	
		em.close();
		return model.getJson_data();
		
	}
	
	public void insertUpdateSolomonRecord(SolomonRecord solomonRecord)
	{
		EntityManager em = emf.createEntityManager();
		
		Query query = em.createQuery("SELECT m FROM Model m WHERE m.modelname = :first");
		query.setParameter("first", solomonRecord.getModelName());
		
		try{
			Model model = (Model) query.getSingleResult();
			System.out.println("Solomon Record Already Exists");
			model.setUpdatedate(new Date());
			if(solomonRecord.getCurrentScreen().equals("/n4_timeTradeOff_result"))
			{
				model.setCompleted(1);
				model.setCompletiondate(new Date());
			};
			Patient patient = new Patient();
			patient = model.getPatientBean();
			patient.setName(solomonRecord.getUserName());
			
			List<Scale> scales = new ArrayList<Scale>();
			scales = model.getScales();
			
			HashMap<Integer,Scale> setIdMap = new HashMap<Integer,Scale>();
			for(Scale scale: scales)
			{
				setIdMap.put(Integer.valueOf(scale.getLabel()), scale);
			}
			
			HashMap<Integer,List<OaLevel>> oaLevelMap = new HashMap<Integer,List<OaLevel>>();
			
			HashMap<Integer,List<OaLevel>> new_oaLevelMap = new HashMap<Integer,List<OaLevel>>();
			
			
			List<Scale> new_scales = new ArrayList<Scale>();
			
			for(AttributeSetData inputAttributeSetData : solomonRecord.getAttributeSetData())
			{
				Scale scale;
				if(!setIdMap.containsKey((inputAttributeSetData.getSetId())))
				{
					scale = new Scale();
					scale.setLabel(Integer.toString(inputAttributeSetData.getSetId()));
					scale.setModelBean(model);
					List<OaLevel> oaLevels = new ArrayList<OaLevel>();
					scale.setOaLevels(oaLevels);
					oaLevelMap.put(inputAttributeSetData.getSetId(),oaLevels);
					setIdMap.put(inputAttributeSetData.getSetId(),scale);
				}
				else
				{
					scale = setIdMap.get(inputAttributeSetData.getSetId());
					if(!oaLevelMap.containsKey(inputAttributeSetData.getSetId()))
					{
						oaLevelMap.put(inputAttributeSetData.getSetId(),scale.getOaLevels());
					}
				}
				
				//Update weight
				scale.setRelativeWeight(inputAttributeSetData.getCoefficient());
				
				if(!new_scales.contains(scale))
				{
					new_scales.add(scale); //Add this directly to model
					new_oaLevelMap.put(inputAttributeSetData.getSetId(), new ArrayList<OaLevel>());
				}
				
				List<OaLevel> oaLevels = oaLevelMap.get(inputAttributeSetData.getSetId());
				
				if(oaLevels.size() != 0)
				{
					int exits_flag = 0;
					for(OaLevel oalevel : oaLevels)
					{
								if(	oalevel.getLabel().equals(inputAttributeSetData.getTitle())
									&&
									oalevel.getPosition() == inputAttributeSetData.getPosition()
									&&
									oalevel.getWeight() == inputAttributeSetData.getRelativeWeight())
								{
									System.out.println("---------------In here!");
									new_oaLevelMap.get(inputAttributeSetData.getSetId()).add(oalevel);
									exits_flag++;
									break;
								}
					} //end for
								if(exits_flag == 0)
								{
									System.out.println("<---------------In else!");
//									System.out.println(oalevel.getLabel()+"--"+inputAttributeSetData.getTitle()+"--"+oalevel.getLabel() == inputAttributeSetData.getTitle());
//									System.out.println(oalevel.getPosition()+"--"+inputAttributeSetData.getPosition()+"--"+String.valueOf(oalevel.getPosition() == inputAttributeSetData.getPosition()));
//									System.out.println(oalevel.getWeight()+"--"+inputAttributeSetData.getRelativeWeight()+"--"+ String.valueOf(oalevel.getWeight() == inputAttributeSetData.getRelativeWeight()));
									OaLevel oaLevel = new OaLevel();
									oaLevel.setLabel(inputAttributeSetData.getTitle());
									oaLevel.setPosition(inputAttributeSetData.getPosition());
									oaLevel.setWeight(inputAttributeSetData.getRelativeWeight());
									oaLevel.setScaleBean(scale);
									new_oaLevelMap.get(inputAttributeSetData.getSetId()).add(oaLevel);
								}			
					
				}
				else
				{
					OaLevel oaLevel = new OaLevel();
					oaLevel.setLabel(inputAttributeSetData.getTitle());
					oaLevel.setPosition(inputAttributeSetData.getPosition());
					oaLevel.setWeight(inputAttributeSetData.getRelativeWeight());
					oaLevel.setScaleBean(scale);
					
					new_oaLevelMap.get(inputAttributeSetData.getSetId()).add(oaLevel);
				}
				
			}
			
			for(Scale scale : new_scales)
			{
				scale.setOaLevels(new_oaLevelMap.get(Integer.valueOf(scale.getLabel())));
			}
			
			model.setJson_data(solomonRecord.getJsonText());
			model.setScales(new_scales);
			
			em.getTransaction().begin();
			em.merge(patient);			
			em.getTransaction().commit();
			em.close();
						
		}
		catch (Exception e)
		{
			System.out.println("Insert NEW Record -- Error:"+solomonRecord.getModelName()+" doesnt exist"+e.getMessage());
			
			
			Patient patient;
			try{
			patient = em.find(Patient.class, solomonRecord.getPatientId());
			System.out.println("Patient Identiied");
			}
			catch(Exception ex)
			{
			String patId = this.getPatientID(solomonRecord.getFirstName(),solomonRecord.getLastName(),solomonRecord.getDateOfBirth());
				try{
				patient = em.find(Patient.class, solomonRecord.getPatientId());
				}
				catch(Exception ex2)
				{
					
					return;
				}
			}
			//patient.setName(solomonRecord.getUserName());
			//List<Model> models = new ArrayList<Model>();
			//patient.setModels(models);
			
			List<Model> models = patient.getModels();
			if(models == null)		
			{
			models = new ArrayList<Model>();
			}
			
			patient.setModels(models);
					
			Model model = new Model();
			model.setModelname(solomonRecord.getModelName());
			model.setCreationdate(new Date());
			model.setUpdatedate(new Date());
			model.setLocation(solomonRecord.getInterviewLocation());
			model.setAge(solomonRecord.getAge());
			model.setJson_data(solomonRecord.getJsonText());
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

	public List<HealthStateMaster> getHealthStates()
	{
		EntityManager em = emf.createEntityManager();
		List<HealthStateMaster> list = (List<HealthStateMaster>) em.createNamedQuery("HealthStateMaster.findAll").getResultList();;
		
		return list;
				
	}
	
	public void insertHealthStateRecord(HealthStateRecord record)
	{
		HealthStateMaster master = new HealthStateMaster();
		master.setCategory(record.getCategory());
		master.setDescription(record.getDescription());
		
		EntityManager em = emf.createEntityManager();
		
		em.getTransaction().begin();
		em.merge(master);			
		em.getTransaction().commit();
		em.close();
						
	}
	
	public ModelRecord getModelData(String modelId)
	{	
		EntityManager em = emf.createEntityManager();
		try{
		Model model = em.find(Model.class, modelId);
		
		ModelRecord modelRecord = new ModelRecord();
		
		modelRecord.setId(model.getId());
		modelRecord.setModelname(model.getModelname());
		modelRecord.setLocation(model.getLocation());
		modelRecord.setCompleted(model.getCompleted());
		
		List<ScaleRecord> scales = new ArrayList<ScaleRecord>();
		
		for(Scale scale : model.getScales())
		{
			ScaleRecord scaleRecord = new ScaleRecord();
			scaleRecord.setId(scale.getId());
			scaleRecord.setLabel(scale.getLabel());
			scaleRecord.setRelativeWeight(scale.getRelativeWeight());
			
			List<OaLevelRecord> oaLevels = new ArrayList<OaLevelRecord>();
			for(OaLevel oaLevel : scale.getOaLevels())
			{
				OaLevelRecord oaLevelRecord = new OaLevelRecord();
				oaLevelRecord.setId(oaLevel.getId());
				oaLevelRecord.setLabel(oaLevel.getLabel());
				oaLevelRecord.setPosition(oaLevel.getPosition());
				oaLevelRecord.setWeight(oaLevel.getWeight());
				
				oaLevels.add(oaLevelRecord);
			}
			scaleRecord.setOaLevels(oaLevels);
			
			scales.add(scaleRecord);
		}
		
		modelRecord.setScales(scales);
		
		return modelRecord;
		}
		catch (Exception ex)
		{
		return null;
		}
		
		
	}

}
