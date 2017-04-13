import org.json.simple.parser.ParseException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Vasily Akimushkin <vakimushkin@systematic.ru>
 * @since 10/04/2017
 */
public class FsmCheckerFirst extends BasicFmtChecker {

  String[] testw= {
      "0-ий",
      "0-ый",
      "1-ой",
      "1-ий",
      "2-ый",
      "2-ий",
      "3-ый",
      "3-ой",
      "4-ий",
      "4-ой",
      "5-ий",
      "5-ой",
      "10-ий",
      "10-ой",
      "11-ий",
      "11-ой",
      "12-ий",
      "12-ой",
      "13-ий",
      "13-ой",
      "14-ий",
      "14-ой",
      "15-ий",
      "15-ой",
      "20-ий",
      "20-ой"
  };

  String[] testr= {
      "0-ой",
      "1-ый",
      "2-ой",
      "3-ий",
      "4-ый",
      "5-ый",
      "10-ый",
      "11-ый",
      "12-ый",
      "13-ый",
      "14-ый",
      "15-ый",
      "20-ый",
      "120-ый",
      "2301-ый",
      "34312-ой",
      "342353-ий",
      "2230104-ый",
      "32351225-ый",
      "100003533-ий",
      "2311-ый",
      "34312-ый",
      "542313-ый",
      "2330114-ый",
      "54351215-ый"
  };


  @Override
  public Result check(FSM fsm) {

    double rights = 0;
    double wrongs = 0;

    for (int i = 0; i < this.testr.length; i++) {
      String test = this.testr[i];
      if(fsm.test(test)){
        rights++;
      }
    }


    for (int i = 0; i < this.testw.length; i++) {
      String test = this.testw[i];
      if(!fsm.test(test)){
        wrongs++;
      }
    }


    return new Result(fsm.states.size(), 1.0f*Math.round((rights/testr.length)*(wrongs/testw.length)*100*10000000)/10000000);

  }

  public static void main(String[] args) throws ParseException {
    Result result = new FsmCheckerFirst().check("{\"states\":[{\"id\":\"v0\",\"x\":0.04166533667663272,\"y\":0.347,\"final\":false,\"label\":\"S0\",\"first\":true},{\"id\":\"v1\",\"x\":0.25941994996873047,\"y\":0.315,\"final\":false,\"label\":\"S1\",\"first\":false},{\"id\":\"v2\",\"x\":0.0641025641025641,\"y\":0.817,\"final\":false,\"label\":\"S2\",\"first\":false},{\"id\":\"v3\",\"x\":0.36776381977866596,\"y\":0.561,\"final\":false,\"label\":\"S3\",\"first\":false},{\"id\":\"v4\",\"x\":0.5846724855208418,\"y\":0.499,\"final\":false,\"label\":\"S4\",\"first\":false},{\"id\":\"v5\",\"x\":0.6812545884656172,\"y\":0.481,\"final\":true,\"label\":\"S5\",\"first\":false}],\"transitions\":[{\"from\":\"v0\",\"to\":\"v0\",\"label\":\"0\"},{\"from\":\"v0\",\"to\":\"v0\",\"label\":\"2\"},{\"from\":\"v0\",\"to\":\"v1\",\"label\":\"1\"},{\"from\":\"v0\",\"to\":\"v1\",\"label\":\"4\"},{\"from\":\"v0\",\"to\":\"v1\",\"label\":\"5\"},{\"from\":\"v0\",\"to\":\"v2\",\"label\":\"3\"},{\"from\":\"v1\",\"to\":\"v1\",\"label\":\"1\"},{\"from\":\"v1\",\"to\":\"v1\",\"label\":\"4\"},{\"from\":\"v1\",\"to\":\"v1\",\"label\":\"5\"},{\"from\":\"v2\",\"to\":\"v2\",\"label\":\"3\"},{\"from\":\"v0\",\"to\":\"v1\",\"label\":\"1\"},{\"from\":\"v0\",\"to\":\"v1\",\"label\":\"4\"},{\"from\":\"v0\",\"to\":\"v1\",\"label\":\"5\"},{\"from\":\"v0\",\"to\":\"v2\",\"label\":\"3\"},{\"from\":\"v1\",\"to\":\"v0\",\"label\":\"0\"},{\"from\":\"v1\",\"to\":\"v0\",\"label\":\"2\"},{\"from\":\"v1\",\"to\":\"v2\",\"label\":\"3\"},{\"from\":\"v2\",\"to\":\"v1\",\"label\":\"5\"},{\"from\":\"v2\",\"to\":\"v1\",\"label\":\"1\"},{\"from\":\"v2\",\"to\":\"v1\",\"label\":\"4\"},{\"from\":\"v2\",\"to\":\"v0\",\"label\":\"0\"},{\"from\":\"v2\",\"to\":\"v0\",\"label\":\"2\"},{\"from\":\"v1\",\"to\":\"v3\",\"label\":\"-\"},{\"from\":\"v2\",\"to\":\"v3\",\"label\":\"-\"},{\"from\":\"v3\",\"to\":\"v4\",\"label\":\"ы\"},{\"from\":\"v3\",\"to\":\"v4\",\"label\":\"о\"},{\"from\":\"v3\",\"to\":\"v4\",\"label\":\"и\"},{\"from\":\"v4\",\"to\":\"v5\",\"label\":\"й\"}],\"input\":\"1000153214-ый\"}");
    System.out.println(result.getAmountOfElements()+":"+result.getPercentOfCorrect());
  }
}
