package com.solomon.rest.model;

public class Relationships
{
    private String id;

    private String title;

    private String $$hashKey;

    public String getId ()
    {
        return id;
    }

    public void setId (String id)
    {
        this.id = id;
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

//    @Override
    public String toString()
    {
        return "ClassPojo [id = "+id+", title = "+title+", $$hashKey = "+$$hashKey+"]";
    }
}
