package objects;
import java.util.ArrayList;
import java.util.List;

public class Directory extends FSObject{

    public Directory(String name, String path){
        this.name = name;

        String[] parsePath = path.split("/");
        this.parent = parsePath[parsePath.length - 1];

        this.path = path + "/" + name;
    }

}