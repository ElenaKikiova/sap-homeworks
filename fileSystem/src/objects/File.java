package objects;

public class File extends FSObject{

    protected String mode;
    protected boolean open;
    protected String text;

    public File(String name, String path){
        this.name = name;

        String[] parsePath = path.split("/");
        this.parent = parsePath[parsePath.length - 1];

        this.path = path + "/" + name;
        this.mode = null;
        this.open = false;
    }

    public void setMode(String mode){
        this.mode = mode;
        this.open = true;
    }

    public void write(String text){
        this.text = text;
    }

    public void read(){
        System.out.println(this == null);
        if(this != null){
            System.out.println("*** Read file " + this.name + ": " + this.text);
        }
    }

    public void close(){
        if(this != null) {
            this.open = false;
        }
    }

}
