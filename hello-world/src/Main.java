
import java.util.*;

public class Main {

    final static int MAXN = 105;

    public static String S;
    public static List<String> P = new ArrayList<>();

    public static List<Integer>[] matches = new ArrayList[MAXN];

    public static Boolean check(int index, String P) {

        if (S.length() - index < P.length()) return false;

        for (int i = 0; i < P.length(); i++) {
            if (
                    S.charAt(index + i) != P.charAt(i) &&
                            P.charAt(i) != '?'
            ) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        for (int i = 0; i < MAXN; i++) {

            matches[i] = new ArrayList<>();

        }

        S = scanner.next();

        String PString;
        PString = scanner.next();

        String curr = "";
        for (int i = 0; i < PString.length(); i++) {
            if (PString.charAt(i) == '*') {
                if (curr != "") P.add(curr);
                curr = "";
            } else {
                curr += PString.charAt(i);
            }
        }
        if (curr != "") {
            P.add(curr);
        }

        for (int i = 0; i < P.size(); i++) {
            for (int j = 0; j < S.length(); j++) {
                if (check(j, P.get(i)) == true) matches[i].add(j);
            }
        }

        int index = 0;
        for (int i = 0; i < P.size(); i++) {
            if (matches[i].size() == 0) {
                System.out.println(false);
                return;
            }

            Boolean success = false;
            for (int j = 0; j < matches[i].size(); j++) {
                if (matches[i].get(j) >= index) {
                    index = matches[i].get(j) + P.size();
                    success = true;

                    break;
                }
            }

            if (success == false) {
                System.out.println(false);
                return;
            }
        }

        System.out.println(true);
    }

}