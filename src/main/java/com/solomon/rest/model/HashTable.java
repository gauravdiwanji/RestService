package com.solomon.rest.model;

import java.util.Map;

public class HashTable
{
	private Map<String, String> items;

    private String length;

    public Map<String, String> getItems ()
    {
        return items;
    }

    public void setItems (Map<String, String> items)
    {
        this.items = items;
    }

    public String getLength ()
    {
        return length;
    }

    public void setLength (String length)
    {
        this.length = length;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [items = "+items+", length = "+length+"]";
    }
}
