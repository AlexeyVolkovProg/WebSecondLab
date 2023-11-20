package lab2.model;

import java.util.ArrayList;
import java.util.List;

public class EntriesBean {
    List<Entry> list;

    public EntriesBean(List<Entry> entryList){
        list = entryList;
    }

    public EntriesBean(){
        this(new ArrayList<Entry>());
    }
    public void setList(List<Entry> list) {
        this.list = list;
    }
    public List<Entry> getEntries() {
        return list;
    }
}
