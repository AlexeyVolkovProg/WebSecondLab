package lab2.model;

public class Entry {
    private double x;
    private double y;
    private double r;
    private String currentTime;
    private String executionTime;
    Boolean result;


    public Entry(){
        this(0, 0, 0, " ", " ", false);
    }

    public Entry(double x, double y, double r, String currentTime, String executionTime, Boolean result) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = currentTime;
        this.executionTime = executionTime;
        this.result = result;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public Boolean getResult() {
        return result;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public void setExecutionTime(String executionTime) {
        this.executionTime = executionTime;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }
}
