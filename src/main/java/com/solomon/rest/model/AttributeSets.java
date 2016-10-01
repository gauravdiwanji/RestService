package com.solomon.rest.model;

public class AttributeSets
{
    private String position;

    private String title;

    private String $$hashKey;

    private int setId;

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
        return "ClassPojo [position = "+position+", title = "+title+", $$hashKey = "+$$hashKey+", setId = "+setId+"]";
    }
}
