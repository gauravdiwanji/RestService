package com.solomon.rest.model;

public class AttributeSetData
{
    private String position;

    private String title;

    private String $$hashKey;

    private String relativeWeight;

    private String setId;

    public String getPosition ()
    {
        return position;
    }

    public void setPosition (String position)
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

    public String getRelativeWeight ()
    {
        return relativeWeight;
    }

    public void setRelativeWeight (String relativeWeight)
    {
        this.relativeWeight = relativeWeight;
    }

    public String getSetId ()
    {
        return setId;
    }

    public void setSetId (String setId)
    {
        this.setId = setId;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [position = "+position+", title = "+title+", $$hashKey = "+$$hashKey+", relativeWeight = "+relativeWeight+", setId = "+setId+"]";
    }
}
