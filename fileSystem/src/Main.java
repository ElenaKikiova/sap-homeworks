import objects.FileSystem;
import objects.Directory;
import objects.File;

public class Main {

    public static void main(String[] args) {

        String root = "someRootDir";

        FileSystem fs = new FileSystem("someRootDir");

        fs.create("directory", "dir1", root);
        fs.create("file", "textfile", root + "/dir1");
        fs.create("directory", "subDir1", root + "/dir1");
        fs.create("directory", "subDir2", root + "/dir1");
        fs.create("file", "textfile2", root + "/dir1/subDir1");
        fs.create("file", "textfile2", root + "/dir1/subDir2");
        fs.create("file", "textfile1", root + "/dir1");
        fs.create("directory", "sth", root);
        fs.create("file", "sth", root + "/sth");

//        fs.delete("textfilefffsagdghfs", root + "/dir1/subDir2");

        fs.rename("textfile1", "textFile", root + "/dir1");

        fs.showStructure();

        fs.open("textfile2", root + "/dir1/subDir1", "read-write");
        fs.write("sth");
        fs.close();

        // Try to open a directory for editing as a file
        fs.open("subDir2", root + "/dir1", "read-write");

        // Delete file which is not open
        fs.delete("textfile1", root + "/dir1");

        // Try to delete open file
        fs.delete("textfile2", root + "/dir1/subDir2");
        fs.close();

        fs.open("textfile2", root + "/dir1/subDir2", "read");
        fs.read();
        fs.write("sth");
        fs.close();

        fs.showStructure();

    }
}
