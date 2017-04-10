import org.json.simple.parser.ParseException;

/**
 * @author Vasily Akimushkin <vakimushkin@systematic.ru>
 * @since 10/04/2017
 */
public class SchemeCheckerFirst extends BasicSchemeChecker {
  @Override
  public String getConfig() {
    return "{ \"type\": \"boolean\", \"inputNum\": 2, \"outputNum\": 2, \"bases\": [{ \"id\": \"75\", \"inputNum\": 4, \"outputNum\": 1,\"name\": \"0>1\", \"func\": \"output[0]=(!input[0]&!input[1]&!input[2]&!input[3])|(input[0]&!input[1]&!input[2]&!input[3])|(!input[0]&input[1]&!input[2]&!input[3])|(!input[0]&!input[1]&input[2]&!input[3])|(!input[0]&!input[1]&!input[2]&input[3])\"}]}";
  }


  @Override
  public boolean[][][] getTests() {
    return new boolean[][][]{
        {{false, false},{false, false}},
        {{false, true},{false, true}},
        {{true, false},{false, true}},
        {{true, true},{true, false}}
    };
  }

  public static void main(String[] args) throws ParseException {
    Result result = new SchemeCheckerFirst().check("{\"elements\":[{\"id\":2,\"base\":\"75\",\"x\":0.2427536231884058,\"y\":121}],\"connections\":[{\"fromelement\":null,\"toelement\":2,\"from\":1,\"to\":3},{\"fromelement\":null,\"toelement\":2,\"from\":1,\"to\":2},{\"fromelement\":null,\"toelement\":2,\"from\":0,\"to\":1},{\"fromelement\":null,\"toelement\":2,\"from\":0,\"to\":0},{\"fromelement\":2,\"toelement\":null,\"from\":0,\"to\":0}],\"input\":[1,1],\"straightConnections\":true}");
    System.out.println(result.getAmountOfElements()+":"+result.getPercentOfCerrect());
  }
}
