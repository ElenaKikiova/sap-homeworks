package objects;
import java.util.Hashtable;

public class FileSystem {

    protected static String rootName;
    protected Hashtable<Integer, FSObject> files;
    protected File currentlyOpen;

    public FileSystem(String rootName){

        if(rootName.length() < 1) {
            this.showMessage("NoName", "rootName");
        }
        else {
            this.rootName = rootName;
            this.files = new Hashtable<Integer, FSObject>();
            this.currentlyOpen = null;
        }
    }

    public void create(String type, String name, String path){

        if(name.length() > 0){
            if(this.pathExists(path)) {

                FSObject newObj = null;
                if (type == "directory") newObj = new Directory(name, path);
                else if (type == "file") newObj = new File(name, path);
                else {
                    this.showMessage("WrongType", name);
                }

                if (newObj != null) {
                    this.files.put(newObj.path.hashCode(), newObj);
                }
                else{
                    this.showMessage("NotFound", name);
                }

            }
            else{
                this.showMessage("NotFound", path);
            }

        }
        else{
            this.showMessage("NoName", type);
        }
    }

    public void delete(String name, String path){

        if(this.pathExists(path) && path != rootName) {

            FSObject objForDeletion = this.get(path);

            if (objForDeletion != null) {
                if(
                    (this.currentlyOpen == null) ||
                    (objForDeletion.hashCode() != this.currentlyOpen.hashCode())
                ) {
                    boolean canBeDeleted = true;
                    if (objForDeletion instanceof Directory) {
                        Directory dir = (Directory) objForDeletion;
                        if (this.directoryHasContent(dir)) {
                            canBeDeleted = false;
                        }
                    }
                    if (canBeDeleted) {
                        this.files.remove(objForDeletion);
                    } else {
                        this.showMessage("DirectoryNotEmpty", objForDeletion.name);
                    }
                }
                else{
                    this.showMessage("FileToBeDeletedIsOpen", objForDeletion.name);
                }
            }
            else{
                this.showMessage("NotFound", name);
            }

        }
        else{
            this.showMessage("NotFound", name);
        }

    }

    public void showStructure(){
        System.out.println("*** Structure:");
        this.files.forEach((k, v) -> {
            v.showInfo();
        });
        System.out.println();
    }


    public FSObject get(String path){
        return this.files.get(path.hashCode());

    }

    public void open(String name, String path, String mode){
        File file = null;
        try {
            file = (File) this.get(path + "/" + name);

            if(file != null){
                if(
                    (this.currentlyOpen == null) ||
                    (file.hashCode() != this.currentlyOpen.hashCode())
                ){
                    if (mode == "read" || mode == "read-write") {
                        this.currentlyOpen = file;
                        file.setMode(mode);
                        file.open = true;
                    } else {
                        this.showMessage("WrongMode", name);
                    }
                }
            }
            else{
                this.showMessage("NotFound", name);
            }
        }
        catch(Exception e){
            this.showMessage("NotAFile", name);
        }
    }

    public void read(){
        if(this.currentlyOpen != null){
            this.currentlyOpen.read();
        }
        else{
            this.showMessage("NoFileIsOpen", "read");
        }
    }

    public void write(String text){
        if(currentlyOpen != null){
            if(currentlyOpen.mode == "read-write") {
                this.currentlyOpen.write(text);
            }
            else{
                this.showMessage("WrongMode", currentlyOpen.name);
            }
        }
        else{
            this.showMessage("NoFileIsOpen", "write " + text);
        }
    }

    public void close(){
        if(currentlyOpen != null){
            this.currentlyOpen.close();
            this.currentlyOpen = null;
        }
    }

    public void rename(String name, String newName, String path){
        FSObject obj = this.get(path);
        if(obj != null){
            obj.setNewName(name, newName);
        }
        else{
            this.showMessage("NotFound", name);
        }
    }

    public boolean pathExists(String path){

        if(!path.equals(this.rootName)) {
            return this.files.containsKey(path.hashCode());
        }
        else{
            return true;
        }

    }

    public boolean directoryHasContent(Directory dir){
        return this.files.containsKey(dir.path);
    }

    public void showMessage(String message, String info){

        String showToUser = "ERROR ";

        switch (message){
            case "NotFound":
                showToUser += info + " is not found";
                break;
            case "NoName":
                showToUser += info + " has to have a name";
                break;
            case "NotAFile":
                showToUser += "Can't open " + info + " for editing - not a file";
                break;
            case "WrongType":
                showToUser += "Can't create " + info + " of invalid type. Accepted types: file, directory";
                break;
            case "WrongMode":
                showToUser += "Can't open " + info + " in invalid mode. Accepted types: read, read-write";
                break;
            case "NoFileIsOpen":
                showToUser += "Can't " + info + " - no file is open";
                break;
            case "DirectoryNotEmpty":
                showToUser += "Can't delete directory " + info + "; because it is not empty";
                break;
            case "FileToBeDeletedIsOpen":
                showToUser += "Can't delete file " + info + "; because it is currently open";
                break;
            default:
                showToUser += "Something went wrong...";
        }

        System.out.println(showToUser);

    }

}
