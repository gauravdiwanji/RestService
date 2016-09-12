package com.solomon.rest.model;

public class TimeTradeOffList
{
    private String coefficient;

    private String pole2;

    private String position;

    private String $$hashKey;

    private String pole1;

    private String yearsTaken;

    private String yearsAvailable;

    private String setId;

    public String getCoefficient ()
    {
        return coefficient;
    }

    public void setCoefficient (String coefficient)
    {
        this.coefficient = coefficient;
    }

    public String getPole2 ()
    {
        return pole2;
    }

    public void setPole2 (String pole2)
    {
        this.pole2 = pole2;
    }

    public String getPosition ()
    {
        return position;
    }

    public void setPosition (String position)
    {
        this.position = position;
    }

    public String get$$hashKey ()
    {
        return $$hashKey;
    }

    public void set$$hashKey (String $$hashKey)
    {
        this.$$hashKey = $$hashKey;
    }

    public String getPole1 ()
    {
        return pole1;
    }

    public void setPole1 (String pole1)
    {
        this.pole1 = pole1;
    }

    public String getYearsTaken ()
    {
        return yearsTaken;
    }

    public void setYearsTaken (String yearsTaken)
    {
        this.yearsTaken = yearsTaken;
    }

    public String getYearsAvailable ()
    {
        return yearsAvailable;
    }

    public void setYearsAvailable (String yearsAvailable)
    {
        this.yearsAvailable = yearsAvailable;
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
        return "ClassPojo [coefficient = "+coefficient+", pole2 = "+pole2+", position = "+position+", $$hashKey = "+$$hashKey+", pole1 = "+pole1+", yearsTaken = "+yearsTaken+", yearsAvailable = "+yearsAvailable+", setId = "+setId+"]";
    }
}
