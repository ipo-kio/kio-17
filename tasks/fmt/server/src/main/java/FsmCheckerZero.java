import org.json.simple.parser.ParseException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Vasily Akimushkin <vakimushkin@systematic.ru>
 * @since 10/04/2017
 */
public class FsmCheckerZero extends BasicFmtChecker {

  static List<String> testg = new ArrayList<>();
  static List<String> testr = new ArrayList<>();
  static List<String> testy = new ArrayList<>();

  static String[][] testgt = new  String[][]{
      {"чщжш", "аи","чщжш","аи"},
  {"м","аиыя","чщжш","аи"},
    {"чщжш","аи","м","аиыя"},
      {"м","аиыя","м","аиыя"},
        {"аиыя","чщжш","аи","чщжшм"},
          {"аиыя","м","аиыя","чщжшм"}
};

  static String[][] testrt = new  String[][]{
      {"чщжш", "ыя","чщжш","аи"},
      {"чщжш","ыяая","чщжш","ыя"},
      {"м","аиыя","чщжш","ыя"},
      {"чщжш","ыя","м","аиыя"},
      {"аиыя","чщжш","ыя","чщжшм"}
};

 static String[][] testyt = new  String[][]{
      {"чщжшм","чщжшм","чщжшмаияы","чщжшмаияы"},
      {"аияы","аияы","чщжшмаияы","чщжшмаияы"},
      {"чщжшм","аияы","чщжшм","чщжшм"},
      {"аияы","чщжшм","чщжшм","чщжшм"},
      {"чщжшм","аияы","аияы","аияы"},
      {"аияы","чщжшм","аияы","аияы"},
      {"аияы","чщжшм","чщжшм","аияы"},
      {"чщжшм","аияы","аияы","чщжшм"}
      };

  static{
    loadExamples(testgt, testg);
    loadExamples(testrt, testr);
    loadExamples(testyt, testy);
  }

  static void loadExamples(String [][] templates, List<String> dest){
    for (int i = 0; i < templates.length; i++) {
      String[] temp = templates[i];
      for (int j = 0; j < temp[0].length(); j++) {
        char temp0 = temp[0].charAt(j);
        for (int k = 0; k < temp[1].length(); k++) {
          char temp1 = temp[1].charAt(k);
          for (int l = 0; l < temp[2].length(); l++) {
            char temp2 = temp[2].charAt(l);
            for (int m = 0; m < temp[3].length(); m++) {
              dest.add(""+temp0+temp1+temp2+temp[3].charAt(m));
            }
          }
        }
      }
    }
  };

  @Override
  public Result check(BasicFmtChecker.FSM fsm) {

    double greens = 0;
    double reds = 0;
    double yellows = 0;

    for (int i = 0; i < testg.size(); i++) {
      String test = testg.get(i);
      if("G".equals(fsm.calc(test))){
        greens++;
      }
    }


    for (int i = 0; i < testr.size(); i++) {
      String test = testr.get(i);
      if("R".equals(fsm.calc(test))){
        reds++;
      }
    }


    for (int i = 0; i < testy.size(); i++) {
      String test = testy.get(i);
      if("Y".equals(fsm.calc(test))){
        yellows++;
      }
    }


    return new Result(fsm.states.size(), 1.0f*Math.round((greens/testg.size())*(reds/testr.size())*(yellows/testy.size())*100*10000000)/10000000);

  }

  public static void main(String[] args) throws ParseException {
    Result result = new FsmCheckerZero().check("{\"states\":[{\"id\":\"v0\",\"x\":0.35868858473843873,\"y\":0.12547624864144774,\"col\":\"G\",\"label\":\"S0\",\"first\":false},{\"id\":\"v1\",\"x\":0.4530524158341486,\"y\":0.11312090958212036,\"col\":\"G\",\"label\":\"S1\",\"first\":false},{\"id\":\"v2\",\"x\":0.6470539280892788,\"y\":0.154765570522793,\"col\":\"G\",\"label\":\"S2\",\"first\":false},{\"id\":\"v3\",\"x\":0.5564742179443513,\"y\":0.37876557052279297,\"col\":\"G\",\"label\":\"S3\",\"first\":false},{\"id\":\"v4\",\"x\":0.68978732440238,\"y\":0.4464102314634656,\"col\":\"G\",\"label\":\"S4\",\"first\":false},{\"id\":\"v5\",\"x\":0.3718525417936843,\"y\":0.3884102314634656,\"col\":\"Y\",\"label\":\"S5\",\"first\":false},{\"id\":\"v6\",\"x\":0.5611641359965829,\"y\":0.7024102314634656,\"col\":\"R\",\"label\":\"S6\",\"first\":false},{\"id\":\"v7\",\"x\":0.8374322519386119,\"y\":0.10841023146346561,\"col\":\"R\",\"label\":\"S7\",\"first\":false}],\"transitions\":[{\"from\":\"v0\",\"to\":\"v0\",\"label\":\"ч\"},{\"from\":\"v0\",\"to\":\"v1\",\"label\":\"а\"},{\"from\":\"v1\",\"to\":\"v2\",\"label\":\"щ\"},{\"from\":\"v2\",\"to\":\"v3\",\"label\":\"а\"},{\"from\":\"v0\",\"to\":\"v0\",\"label\":\"щ\"},{\"from\":\"v0\",\"to\":\"v0\",\"label\":\"м\"},{\"from\":\"v1\",\"to\":\"v2\",\"label\":\"ч\"},{\"from\":\"v1\",\"to\":\"v2\",\"label\":\"м\"},{\"from\":\"v1\",\"to\":\"v3\",\"label\":\"ж\"},{\"from\":\"v3\",\"to\":\"v4\",\"label\":\"и\"},{\"from\":\"v1\",\"to\":\"v3\",\"label\":\"ш\"},{\"from\":\"v3\",\"to\":\"v5\",\"label\":\"м\"},{\"from\":\"v3\",\"to\":\"v6\",\"label\":\"ы\"},{\"from\":\"v2\",\"to\":\"v7\",\"label\":\"я\"}],\"input\":\"мама\"}");
    System.out.println(result.getAmountOfElements()+":"+result.getPercentOfCorrect());
  }
}
