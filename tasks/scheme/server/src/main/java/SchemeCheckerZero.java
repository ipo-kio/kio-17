import org.json.simple.parser.ParseException;

/**
 * @author Vasily Akimushkin <vakimushkin@systematic.ru>
 * @since 10/04/2017
 */
public class SchemeCheckerZero extends BasicSchemeChecker {
  @Override
  public String getConfig() {
    return "{ \"type\": \"boolean\", \"inputNum\": 2, \"outputNum\": 2, \"bases\": [{ \"id\": \"76\", \"inputNum\": 2, \"outputNum\": 1,\"name\": \"NOR\", \"func\": \"output[0]=+!(input[0]|input[1])\"}]}";
  }

  @Override
  public boolean[][][] getTests() {
    return new boolean[][][]{
        {{false, false},{false, false}},
        {{false, true},{true, false}},
        {{true, false},{true, false}},
        {{true, true},{true, true}}
    };
  }

  public static void main(String[] args) throws ParseException {
    Result result = new SchemeCheckerZero().check("{\"elements\":[{\"id\":17,\"base\":\"76\",\"x\":0.1603415559772296,\"y\":52},{\"id\":18,\"base\":\"76\",\"x\":0.1603415559772296,\"y\":259},{\"id\":19,\"base\":\"76\",\"x\":0.29506641366223907,\"y\":127}],\"connections\":[{\"fromelement\":null,\"toelement\":17,\"from\":1,\"to\":1},{\"fromelement\":null,\"toelement\":17,\"from\":0,\"to\":0},{\"fromelement\":null,\"toelement\":18,\"from\":1,\"to\":1},{\"fromelement\":null,\"toelement\":18,\"from\":0,\"to\":0},{\"fromelement\":17,\"toelement\":19,\"from\":0,\"to\":0},{\"fromelement\":18,\"toelement\":19,\"from\":0,\"to\":1},{\"fromelement\":19,\"toelement\":null,\"from\":0,\"to\":0}],\"input\":[1,1],\"straightConnections\":true}");
    System.out.println(result.getAmountOfElements()+":"+result.getPercentOfCerrect());
  }
}
