import org.json.simple.parser.ParseException;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Vasily Akimushkin <vakimushkin@systematic.ru>
 * @since 10/04/2017
 */
public class FsmCheckerSecond extends BasicFmtChecker {


  static List<String> test = new ArrayList<String>();

  static String[] testt= {
      "хх",
      "хо-хо",
      "хо-хох",
      "хохх",
      "ххох",
      "хо-кхох",
      "хо-ррох",
      "хор-кох",
      "хор-ко",
      "хо-рро",
      "хо-кхо",
      "о-о",
      "хо-хо-хо",
      "ох-хо",
      "о-хо-хо",
      "хох",
      "о-ххох",
      "о-ххохх",
      "хххо-хо",
      "хо-о-хо",
      "ххо-хо",
      "ххо-ххо",
      "ор-ко",
      "о-кхо",
      "о-рро",
      "о-ор-ко",
      "о-о-кхо",
      "о-о-рро",
      "о-кхо-хо",
      "ор-ко-хо",
      "о-рро-хо",
      "хо-хо-ххо",
      "хор-ко-хо",
      "хо-кхо-хо",
      "хо-рро-хо",
      "ххо-хох",
      "ххор-ко",
      "ххо-кхо",
      "ххо-рро",
      "ор-кох",
      "о-ррох",
      "о-кхох"
  };

  static{
    for (int i = 0; i <testt.length; i++) {
      pushAndReplace(testt[i]);
    }
  }

  static void pushAndReplace(String input){
    if(input.indexOf("х")>=0){
      int index = input.indexOf("х");
      pushAndReplace(input.substring(0,index)+"р"+input.substring(index+1));
      pushAndReplace(input.substring(0,index)+"к"+input.substring(index+1));
    }else{
      test.add(input);
    }
  };

  @Override
  public Result check(FSM fsm) {
    double rights = 0;

    for (int i = 0; i < test.size(); i++) {
      String testI = test.get(i);
      String input = testI.replaceAll("-", "");
      if(testI.equals(fsm.out(input))){
        rights++;
      }
    }

    return new Result(fsm.states.size(), 1.0f*Math.round((rights/test.size())*100*10000000)/10000000);

  }

  public static void main(String[] args) throws ParseException {
    Result result = new FsmCheckerSecond().check("{\"states\":[{\"id\":\"v0\",\"x\":0.1,\"y\":0.5,\"final\":false,\"label\":\"S0\",\"first\":true},{\"id\":\"v1\",\"x\":0.21894170211696556,\"y\":0.2505181916899227,\"final\":false,\"label\":\"S1\",\"first\":false},{\"id\":\"v2\",\"x\":0.33734658671115997,\"y\":0.23719349488475472,\"final\":false,\"label\":\"S2\",\"first\":false},{\"id\":\"v3\",\"x\":0.45303408000100653,\"y\":0.16457001085891496,\"final\":false,\"label\":\"S3\",\"first\":false},{\"id\":\"v4\",\"x\":0.6478801519676319,\"y\":0.14725179144987094,\"final\":false,\"label\":\"S4\",\"first\":false},{\"id\":\"v5\",\"x\":0.6087841995072849,\"y\":0.5036874309881137,\"final\":false,\"label\":\"S5\",\"first\":false},{\"id\":\"v6\",\"x\":0.7975617985301042,\"y\":0.08395948162532318,\"final\":false,\"label\":\"S6\",\"first\":false},{\"id\":\"v7\",\"x\":0.7975617985301042,\"y\":0.5036874309881139,\"final\":false,\"label\":\"S7\",\"first\":false},{\"id\":\"v8\",\"x\":0.7687372238287127,\"y\":0.3296041425659958,\"final\":false,\"label\":\"S8\",\"first\":false},{\"id\":\"v9\",\"x\":0.9228836636200747,\"y\":0.36324880350666844,\"final\":false,\"label\":\"S9\",\"first\":false}],\"transitions\":[{\"from\":\"v0\",\"to\":\"v1\",\"label\":\"к\",\"outlabel\":\"к\"},{\"from\":\"v1\",\"to\":\"v2\",\"label\":\"о\",\"outlabel\":\"о\"},{\"from\":\"v2\",\"to\":\"v3\",\"label\":\"#\",\"outlabel\":\"-\"},{\"from\":\"v3\",\"to\":\"v4\",\"label\":\"к\",\"outlabel\":\"к\"},{\"from\":\"v3\",\"to\":\"v5\",\"label\":\"о\",\"outlabel\":\"о\"},{\"from\":\"v4\",\"to\":\"v6\",\"label\":\"о\",\"outlabel\":\"о\"},{\"from\":\"v5\",\"to\":\"v7\",\"label\":\"к\",\"outlabel\":\"к\"},{\"from\":\"v6\",\"to\":\"v8\",\"label\":\".\",\"outlabel\":\"о\"},{\"from\":\"v8\",\"to\":\"v9\",\"label\":\"#\",\"outlabel\":\"р\"}],\"input\":\"коко.\"}");
    System.out.println(result.getAmountOfElements()+":"+result.getPercentOfCorrect());
  }
}
