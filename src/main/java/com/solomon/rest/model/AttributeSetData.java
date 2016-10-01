package com.solomon.rest.model;

public class AttributeSetData
{
    private int position;

    private String title;

    private String $$hashKey;

    private double relativeWeight;

    private int setId;

    public int getPosition ()
    {
        return position;
    }

    public void setPosition (int position)
    {
        this.position = position;
    }

    public String getTitle ()
    {
        return title;
    }

    public void setTitle (String title)
    {
        this.title = title;
    }

    public String get$$hashKey ()
    {
        return $$hashKey;
    }

    public void set$$hashKey (String $$hashKey)
    {
        this.$$hashKey = $$hashKey;
    }

    public double getRelativeWeight ()
    {
        return relativeWeight;
    }

    public void setRelativeWeight (double relativeWeight)
    {
        this.relativeWeight = relativeWeight;
    }

    public int getSetId ()
    {
        return setId;
    }

    public void setSetId (int setId)
    {
        this.setId = setId;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [position = "+position+", title = "+title+", $$hashKey = "+$$hashKey+", relativeWeight = "+relativeWeight+", setId = "+setId+"]";
    }
}
