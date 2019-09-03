package objects;

public abstract class FSObject{

    protected String name;
    protected String path;
    protected String parent;


    public void setNewName(String name, String newName){
        this.name = newName;
        this.parent.replace(name, newName);
    }


    public void showInfo(){
        String info = this.path;
        if(this instanceof File) {
            File file = (File) this;
            info += " content " + file.text;
        }

        System.out.println(info);
    }



}
